import { useEffect, useRef, useState } from "react";
import {
  BRUSH,
  ERASER,
  NodeMakerType,
  PEN,
  PHOTO,
  RECORD,
  STICKER,
  TEXT,
  TransformerType,
} from "../types";
import RecordMaker from "./record";
import TextMaker from "./text";
import StickerMaker from "./sticker";
import PhotoMaker from "./photo";
import DrawToolsMaker from "./drawTools";
import { useDispatch, useSelector } from "react-redux";
import nodeSlice, { nodeActions } from "../../../store/common/nodeSlice";
import { selectActions } from "../../../store/common/selectSlice";

export default function Node({ index, type, shapeProps }: NodeMakerType) {
  const shapeRef = useRef<any>(null);
  const trRef = useRef<TransformerType>(null);
  const dispatch = useDispatch();
  const nowSelect = useSelector((state: any) => state.selectReducer.select);
  const isSelected = nowSelect === index ? true : false;

  useEffect(() => {
    dispatch(selectActions.selectChange(null));
  }, []);

  useEffect(() => {
    if (isSelected && trRef) {
      trRef.current?.nodes([shapeRef.current]);
      trRef.current?.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  //공통으로 쓰는 함수들-----------------------------
  const onChange = (newAttr: any) => {
    dispatch(nodeActions.modifyNodes({ index: index, modifyProps: newAttr }));
  };

  const isDrawing = useSelector((state: any) => state.drawReducer.isDrawing);
  const onSelect = () => {
    if (!isDrawing) dispatch(selectActions.selectChange(index));
  };

  //1.클릭한 노드의 인덱스를 0으로 바꾼다.
  //2.노드의 인덱스가 바뀌면, 0번 인덱스를 셀렉한다.

  const props = {
    shapeProps: shapeProps,
    index: index,
    shapeRef: shapeRef,
    trRef: trRef,
    onChange: onChange,
    onSelect: onSelect,
    isSelected: isSelected,
  };

  switch (type) {
    case RECORD:
      return <RecordMaker shapeProps={shapeProps} />;
    case TEXT:
      return <TextMaker {...props} />;
    case STICKER:
      return <StickerMaker {...props} />;
    case PHOTO:
      return <PhotoMaker {...props} />;
    case PEN:
      return <DrawToolsMaker type={type} shapeProps={shapeProps} />;
    case BRUSH:
      return <DrawToolsMaker type={type} shapeProps={shapeProps} />;
    case ERASER:
      return <DrawToolsMaker type={type} shapeProps={shapeProps} />;
  }
  return <></>;
}
