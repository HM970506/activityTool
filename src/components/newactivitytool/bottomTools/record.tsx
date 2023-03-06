import { useState } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";

export default function RecordMenu() {
  navigator.mediaDevices.getUserMedia({ audio: true });
  const addAudioElement = (blob: any) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
  };

  const onRecAudio = () => {};
  const offRecAudio = () => {};
  return (
    <>
      <AudioRecorder onRecordingComplete={addAudioElement} />
      <button onClick={onRecAudio}>녹음시작</button>
      <button onClick={offRecAudio}>녹음중지</button>
    </>
  );
}
