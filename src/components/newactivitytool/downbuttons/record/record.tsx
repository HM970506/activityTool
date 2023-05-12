import { useEffect, useRef, useState } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { useDispatch, useSelector } from "react-redux";
import { nodeActions } from "../../../../store/common/nodeSlice";
import { ReducersType } from "../../types";
import Record from "./recorder";

export default function RecordMenu() {
  const dispatch = useDispatch();
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioSavedRef = useRef<HTMLAudioElement>(null);
  const newRecord = useSelector((state: ReducersType) => {
    return state.nodeReducer.record.new;
  });
  const oldRecord = useSelector((state: ReducersType) => {
    return state.nodeReducer.record.old;
  });
  navigator.mediaDevices.getUserMedia({ audio: true });

  useEffect(() => {
    console.log(newRecord);
  }, [newRecord]);

  const recorderControls = useAudioRecorder();
  const addAudioElement = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    dispatch(nodeActions.setNewRecord(url));
  };

  const audioComplete = async () => {
    if (newRecord !== undefined) dispatch(nodeActions.setOldRecord(newRecord));
    dispatch(nodeActions.setNewRecord(undefined));
  };

  //src가 undefined인데 왜 재생이 되는가.

  return (
    <>
      <AudioRecorder
        onRecordingComplete={(blob) => addAudioElement(blob)}
        recorderControls={recorderControls}
      />
      지금 녹음한 오디오
      <Record audioref={audioRef} src={newRecord} controls={true} />
      <button onClick={audioComplete}>확정</button>
      기존 녹음 오디오
      <Record audioref={audioSavedRef} src={oldRecord} controls={true} />
    </>
  );
}
