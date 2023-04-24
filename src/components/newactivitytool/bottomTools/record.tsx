import { useEffect, useRef, useState } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { useDispatch, useSelector } from "react-redux";
import { nodeActions } from "../../../store/common/nodeSlice";
import { ReducersType } from "../types";

export default function RecordMenu() {
  const dispatch = useDispatch();
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioSavedRef = useRef<HTMLAudioElement>(null);
  const [audioSrc, setAudioSrc] = useState<string | undefined>(undefined);
  const audioSavedSrc = useSelector((state: ReducersType) => {
    return state.nodeReducer.record;
  });
  navigator.mediaDevices.getUserMedia({ audio: true });

  useEffect(() => {
    console.log(audioSavedSrc);
  }, [audioSavedSrc]);

  const recorderControls = useAudioRecorder();
  const addAudioElement = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    setAudioSrc(url);
  };

  const audioComplete = async () => {
    if (audioSrc !== undefined) dispatch(nodeActions.setRecord(audioSrc));
    setAudioSrc(undefined);
  };

  return (
    <>
      <AudioRecorder
        onRecordingComplete={(blob) => addAudioElement(blob)}
        recorderControls={recorderControls}
      />
      지금 녹음한 오디오
      <audio ref={audioRef} src={audioSrc} controls={true} />
      <button onClick={audioComplete}>확정</button>
      기존 녹음 오디오
      <audio ref={audioSavedRef} src={audioSavedSrc} controls={true} />
    </>
  );
}
