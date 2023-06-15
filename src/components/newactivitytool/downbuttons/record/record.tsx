import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Recorder, RecorderButton, RecorderTime } from "./style";
import { RecordRTCPromisesHandler } from "recordrtc";
import { useDispatch, useSelector } from "react-redux";
import { nodeActions } from "../../../../store/common/nodeSlice";
import { ReducersType } from "../../types";
import { useStopwatch } from "react-timer-hook";
import { CategoryButton, Icon } from "../../styles/style";

export default function Record({
  state,
  setState,
}: {
  state: string;
  setState: Dispatch<SetStateAction<string>>;
}) {
  const dispatch = useDispatch();
  const [recorder, setRecorder] = useState<RecordRTCPromisesHandler | null>(
    null
  );

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [oldRecord, setOldRecord] = useState<string>("");
  const recorderRef = useRef<HTMLAudioElement | null>(null);
  const oldRecorder = useSelector(
    (state: ReducersType) => state.nodeReducer.record
  );

  const { seconds, minutes, start, pause, reset } = useStopwatch({
    autoStart: true,
  });

  const setting = async () => {
    const getstream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    setStream(stream);
    const recorder = new RecordRTCPromisesHandler(getstream, {
      type: "audio",
      mimeType: "audio/webm",
    });
    setRecorder(recorder);
    await recorder.startRecording();
  };

  useEffect(() => {
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
    if (state == "") {
      await setting();
      setState("start");
    } else {
      if (recorder) await recorder.startRecording();
      setState("goon");
    }

    start();
  };

  const endHandler = async () => {
    if (recorder) {
      await recorder.stopRecording();
      setState("end");
      const blob = (await recorder?.getBlob()) as Blob;
      const url = URL.createObjectURL(blob);
      setOldRecord(url);
      dispatch(nodeActions.setRecord(blob));

      if (stream) stream.getAudioTracks()[0].enabled = false;

      setRecorder(null);
      await navigator.mediaDevices.getUserMedia({ audio: false });
      reset();
    }
  };

  const playButton = () => {
    if (recorderRef.current) recorderRef.current.play();
  };

  const reRecord = () => {
    setOldRecord("");
    setState("");
    reset();
  };

  useEffect(() => {
    pause();
  }, [oldRecord]);

  return (
    <>
      <Recorder src={oldRecord} ref={recorderRef} />
      {oldRecord !== "" ? (
        <>
          <CategoryButton onClick={playButton}>
            <Icon src={"/recorder/record.png"} />
            <span>재생</span>
          </CategoryButton>
          <CategoryButton onClick={reRecord}>
            <Icon src={"/recorder/player.png"} />
            <span>다시녹음</span>
          </CategoryButton>
        </>
      ) : (
        state !== "end" && (
          <>
            <RecorderTime>
              <span>{minutes}</span>:
              <span>{seconds < 10 ? "0" + seconds : seconds}</span>
            </RecorderTime>

            {state === "start" || state == "goon" ? (
              <RecorderButton onClick={pauseHandler}>
                <Icon src={"/recorder/pause.png"} />
              </RecorderButton>
            ) : (
              <RecorderButton onClick={startHandler}>
                <Icon src={"/recorder/play.png"} />
              </RecorderButton>
            )}

            <RecorderButton onClick={endHandler}>
              <Icon src={"/recorder/stop.png"} />
            </RecorderButton>
          </>
        )
      )}
    </>
  );
}
