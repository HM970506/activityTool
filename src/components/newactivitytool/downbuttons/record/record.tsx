import { useEffect, useRef, useState } from "react";

import { Button, Recorder, RecorderButton, RecorderTime } from "./style";
import { RecordRTCPromisesHandler } from "recordrtc";
import { useDispatch } from "react-redux";
import { nodeActions } from "../../../../store/common/nodeSlice";

export default function Record() {
  const dispatch = useDispatch();
  const [recorder, setRecorder] = useState<RecordRTCPromisesHandler>();
  const [stream, setStream] = useState<MediaStream>();
  const [state, setState] = useState<string>("");
  const recorderRef = useRef<HTMLAudioElement | null>(null);

  const setting = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new RecordRTCPromisesHandler(stream, {
      type: "audio",
      mimeType: "audio/webm",
    });
    setStream(stream);
    setRecorder(recorder);
  };

  useEffect(() => {
    setting();
  }, []);

  return recorder ? (
    <>
      <Recorder ref={recorderRef} />
      <RecorderTime>{}</RecorderTime>
      {state == "start" ? (
        <RecorderButton
          onClick={async () => {
            await recorder.pauseRecording();
            setState("pause");
          }}
        >
          ⏸
        </RecorderButton>
      ) : (
        <RecorderButton
          onClick={async () => {
            await recorder.startRecording();
            if (state == "") setState("start");
            else setState("goon");
          }}
        >
          ▶
        </RecorderButton>
      )}

      <RecorderButton
        onClick={async () => {
          await recorder.stopRecording();
          setState("end");

          const blob = (await recorder?.getBlob()) as Blob;
          dispatch(nodeActions.setRecord(blob));
        }}
      >
        ⏹
      </RecorderButton>
    </>
  ) : (
    <></>
  );
}
