import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Recorder, RecorderButton, RecorderTime } from "./style";
import { RecordRTCPromisesHandler } from "recordrtc";
import { useDispatch, useSelector } from "react-redux";
import { nodeActions } from "../../../../store/common/nodeSlice";
import { ReducersType } from "../../types";
import { useStopwatch } from "react-timer-hook";
import { InnerCategoryButton, Icon } from "../../style";

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
    if (!getstream) console.log("녹음 권한 실패");

    setStream(stream);
    try {
      const recorder = new RecordRTCPromisesHandler(getstream, {
        type: "audio",
        mimeType: "audio/webm",
      });

      if (!recorder) console.log("레코더 형성 실패");

      setRecorder(recorder);
      await recorder.startRecording();
    } catch (err) {
      console.log("녹음 에러:", JSON.stringify(err));
    }
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
    if (state === "") {
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
      //  try {
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
      // } catch (err) {
      //   console.log("녹음 저장 에러:", err);
      // }
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
          <InnerCategoryButton onClick={playButton}>
            <Icon src={"/recorder/record.png"} />
            <span>재생</span>
          </InnerCategoryButton>
          <InnerCategoryButton onClick={reRecord}>
            <Icon src={"/recorder/player.png"} />
            <span>다시녹음</span>
          </InnerCategoryButton>
        </>
      ) : (
        state !== "end" && (
          <>
            <RecorderTime>
              <span>{minutes}</span>:
              <span>{seconds < 10 ? "0" + seconds : seconds}</span>
            </RecorderTime>

            {state === "start" || state === "goon" ? (
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
