import { useEffect, useRef, useState } from "react";
import { Recorder, RecorderButton, RecorderTime } from "./style";
import { RecordRTCPromisesHandler } from "recordrtc";
import { useDispatch, useSelector } from "react-redux";
import { nodeActions } from "../../../../store/common/nodeSlice";
import { ReducersType } from "../../types";
import { useStopwatch } from "react-timer-hook";

export default function Record() {
  const dispatch = useDispatch();
  const [recorder, setRecorder] = useState<RecordRTCPromisesHandler>();
  const [state, setState] = useState<string>("");
  const [oldRecord, setOldRecord] = useState<string>("");
  const recorderRef = useRef<HTMLAudioElement | null>(null);
  const oldRecorder = useSelector(
    (state: ReducersType) => state.nodeReducer.record
  );

  const { seconds, minutes, start, pause, reset } = useStopwatch({
    autoStart: true,
  });

  const setting = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new RecordRTCPromisesHandler(stream, {
      type: "audio",
      mimeType: "audio/webm",
    });
    setRecorder(recorder);
  };

  useEffect(() => {
    setting();
    setOldRecord(oldRecorder);
  }, []);

  const pauseHandler = async () => {
    if (recorder) {
      await recorder.pauseRecording();
      setState("pause");
      pause();
    }
  };

  const startHandler = async () => {
    if (recorder) {
      await recorder.startRecording();
      if (state == "") setState("start");
      else setState("goon");

      start();
    }
  };

  const endHandler = async () => {
    if (recorder) {
      await recorder.stopRecording();
      setState("end");
      const blob = (await recorder?.getBlob()) as Blob;
      const url = URL.createObjectURL(blob);
      setOldRecord(url);
      dispatch(nodeActions.setRecord(blob));

      reset();
    }
  };

  const playButton = () => {
    if (recorderRef.current) recorderRef.current.play();
  };

  const reRecord = () => {
    setOldRecord("");
    setState("");
  };

  useEffect(() => {
    console.log(oldRecord);
    pause();
  }, [oldRecord]);

  return (
    <>
      <Recorder src={oldRecord} ref={recorderRef} />
      {oldRecord !== "" ? (
        <>
          <RecorderButton onClick={playButton}>재생</RecorderButton>
          <RecorderButton onClick={reRecord}>다시녹음</RecorderButton>
        </>
      ) : (
        state !== "end" && (
          <>
            <RecorderTime>
              <span>{minutes}</span>:
              <span>{seconds < 10 ? "0" + seconds : seconds}</span>
            </RecorderTime>

            {state === "start" || state == "goon" ? (
              <RecorderButton onClick={pauseHandler}>⏸</RecorderButton>
            ) : (
              <RecorderButton onClick={startHandler}>▶</RecorderButton>
            )}

            <RecorderButton onClick={endHandler}>⏹</RecorderButton>
          </>
        )
      )}
    </>
  );
}
