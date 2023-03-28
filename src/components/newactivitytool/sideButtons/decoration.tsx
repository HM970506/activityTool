import { useDispatch, useSelector } from "react-redux";
import { categoryActions } from "../../../store/common/categorySlice";
import { Button } from "../style";
import { DECORATION } from "../types";

export default function DecorationButton() {
  const dispatch = useDispatch();
  const photoButtonClick = () => {
    dispatch(categoryActions.categoryChange(DECORATION));
  };

  return <Button onClick={photoButtonClick}>꾸미기</Button>;
}
