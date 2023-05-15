import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Recorder, RecorderButton, RecorderTime } from "./style";
import { RecordRTCPromisesHandler } from "recordrtc";

export default function Record() {
  const [recorder, setRecorder] = useState<any>();
  const [blob, setBlob] = useState(null);
  const [state, setState] = useState<string>("");
  const refVideo = useRef(null);
  const recorderRef = useRef<HTMLAudioElement | null>(null);

  const setting = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new RecordRTCPromisesHandler(stream, {
      type: "audio",
      mimeType: "audio/webm",
    });

    setRecorder(recorder);
  };

  return (
    <>
      <Recorder ref={recorderRef} />
      <RecorderTime>{}</RecorderTime>
      {state == "start" ? (
        <RecorderButton
          onClick={async () => {
            setState("pause");
            if (recorder) await recorder.pausetRecording();
          }}
        >
          ⏸
        </RecorderButton>
      ) : (
        <RecorderButton
          onClick={async () => {
            if (state == "") {
              setting();
              setState("start");
            } else setState("goon");
            if (recorder) await recorder.startRecording();
          }}
        >
          ▶
        </RecorderButton>
      )}

      <RecorderButton
        onClick={async () => {
          setState("end");
          if (recorder) await recorder.stopRecording();
        }}
      >
        ⏹
      </RecorderButton>
    </>
  );
}
