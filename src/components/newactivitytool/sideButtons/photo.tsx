import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryActions } from "../../../store/common/categorySlice";
import { nodeActions } from "../../../store/common/nodeSlice";
import { PHOTO } from "../types";
import { Button, Uploader } from "../style";

export default function PhotoButton() {
  const dispatch = useDispatch();
  const photoButtonClick = () => {
    dispatch(categoryActions.categoryChange(PHOTO));
  };

  return <Button onClick={photoButtonClick}>사진</Button>;
}
