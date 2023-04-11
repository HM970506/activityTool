import { useEffect, useRef, useState } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { useSelector } from "react-redux";
import { fabric } from "fabric-with-erasing";

export default function RecordMenu() {
  const [audioSrc, setAudioSrc] = useState<string | undefined>(undefined);
  navigator.mediaDevices.getUserMedia({ audio: true });
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);

  const addNodes = (audioSrc: string) => {
    //audioSrc를 파이어스토어에 저장
    //캔버스에 특정 노드를 추가하고 그 노드가 더블클릭될때마다 음성 재생
    const recoderButton = new fabric.Rect();

    recoderButton.on("dbclick", () => {});
  };
  const audioRef = useRef<HTMLAudioElement>(null);

  const recorderControls = useAudioRecorder();
  const addAudioElement = (blob: any) => {
    const url = URL.createObjectURL(blob);
    setAudioSrc(url);
  };

  const audioComplete = async () => {
    if (audioSrc !== undefined) addNodes(audioSrc);
    setAudioSrc(undefined);
  };

  return (
    <>
      <AudioRecorder
        onRecordingComplete={(blob) => addAudioElement(blob)}
        recorderControls={recorderControls}
      />
      <audio ref={audioRef} src={audioSrc} controls={true} />
      <button onClick={audioComplete}>완성</button>
    </>
  );
}
