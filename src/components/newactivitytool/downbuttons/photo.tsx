import { useDispatch } from "react-redux";
import { categoryActions } from "../../../store/common/categorySlice";
import { PHOTO } from "../types";
import { Button } from "../styles/commonStyle";

export default function PhotoButton() {
  const dispatch = useDispatch();
  const photoButtonClick = () => {
    dispatch(categoryActions.categoryChange(PHOTO));
  };

  return <Button onClick={photoButtonClick}>사진</Button>;
}
