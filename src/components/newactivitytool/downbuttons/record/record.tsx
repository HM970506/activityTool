import { useEffect, useRef, useState } from "react";

import { Button, Recorder, RecorderButton, RecorderTime } from "./style";
import { RecordRTCPromisesHandler } from "recordrtc";
import { useDispatch } from "react-redux";
import { nodeActions } from "../../../../store/common/nodeSlice";

export default function Record() {
  const dispatch = useDispatch();
  const [recorder, setRecorder] = useState<RecordRTCPromisesHandler>();
  const [state, setState] = useState<string>("");
  const [test, setTest] = useState<string>("");
  const recorderRef = useRef<HTMLAudioElement | null>(null);

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
  }, []);

  const pauseHandler = async () => {
    if (recorder) {
      await recorder.pauseRecording();
      setState("pause");
    }
  };

  const startHandler = async () => {
    if (recorder) {
      await recorder.startRecording();
      if (state == "") setState("start");
      else setState("goon");
    }
  };

  const endHandler = async () => {
    if (recorder) {
      await recorder.stopRecording();
      setState("end");
      const url = await recorder.getDataURL();
      setTest(url);
      const blob = (await recorder?.getBlob()) as Blob;
      console.log(blob);
      dispatch(nodeActions.setRecord(blob));
    }
  };

  return recorder ? (
    state == "end" ? (
      <audio src={test} />
    ) : (
      <>
        <Recorder ref={recorderRef} />
        <RecorderTime>{"0:00"}</RecorderTime>
        {state === "start" ? (
          <RecorderButton onClick={pauseHandler}>⏸</RecorderButton>
        ) : (
          <RecorderButton onClick={startHandler}>▶</RecorderButton>
        )}
        <RecorderButton onClick={endHandler}>⏹</RecorderButton>
      </>
    )
  ) : (
    <></>
  );
}
