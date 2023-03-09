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
} from "./types";
import RecordMaker from "./record";
import TextMaker from "./text";
import StickerMaker from "./sticker";
import PhotoMaker from "./photo";
import ToolsMaker from "./tools";
import { useDispatch, useSelector } from "react-redux";
import { nodeActions } from "../../../store/common/nodeSlice";
import { selectActions } from "../../../store/common/selectSlice";
import categorySlice from "../../../store/common/categorySlice";

export default function Node({ index, type, shapeProps }: NodeMakerType) {
  const shapeRef = useRef<any>(null);
  const trRef = useRef<TransformerType>(null);
  const dispatch = useDispatch();
  const nowSelect = useSelector((state: any) => state.selectReducer.select);
  const isSelected = nowSelect === index ? true : false;
  const category = useSelector((state: any) => state.categoryReducer.category);

  useEffect(() => {
    if (isSelected && trRef) {
      trRef.current?.nodes([shapeRef.current]);
      trRef.current?.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  const onChange = (newAttr: any) => {
    dispatch(nodeActions.modifyNodes({ index: index, modifyProps: newAttr }));
  };

  const onSelect = () => {
    dispatch(selectActions.selectChange(index));
  };

  const props = {
    shapeProps: shapeProps,
    index: index,
    shapeRef: shapeRef,
    trRef: trRef,
    onChange: onChange,
    onSelect: onSelect,
    isSelected: isSelected,
  };

  //브러쉬 선택 후 다른 노드를 넣으면 이후의 클릭이 모두 브러시가 되는 버그 있음.
  //카테고리도 같이 확인하게 하면 될 것 같은데..
  switch (type) {
    case RECORD:
      return <RecordMaker shapeProps={shapeProps} />;
    case TEXT:
      return <TextMaker {...props} />;
    case STICKER:
      return <StickerMaker {...props} />;
    case PHOTO:
      return <PhotoMaker {...props} />;
    case PEN || BRUSH || ERASER:
      return <ToolsMaker type={type} shapeProps={shapeProps} />;
  }
  return <></>;
}
