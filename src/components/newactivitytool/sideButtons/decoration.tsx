import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fabric } from "fabric-with-erasing";
import { categoryActions } from "../../../store/common/categorySlice";
import { Button } from "../style";
import { DECORATION } from "../types";

export default function DecorationButton() {
  const dispatch = useDispatch();
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const draws = useSelector((state: any) => state.drawReducer);
  const { tape } = useSelector(
    (state: any) => state.categoryReducer.subcategory
  );

  const photoButtonClick = () => {
    dispatch(categoryActions.categoryChange(DECORATION));
  };

  return <Button onClick={photoButtonClick}>꾸미기</Button>;
}
