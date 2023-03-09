import { useState } from "react";
import { useDispatch } from "react-redux";
import { categoryActions } from "../../../store/common/categorySlice";
import { Button } from "../style";

export default function DrawToolsButton() {
  const dispatch = useDispatch();

  return (
    <Button
      onClick={() => {
        dispatch(categoryActions.categoryChange("DRAWTOOLS"));
      }}
    >
      도구
    </Button>
  );
}
