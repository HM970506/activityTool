import { useDispatch } from "react-redux";
import { categoryActions } from "../../../store/common/categorySlice";
import { RECORD } from "../types";
import { Button } from "../styles/commonStyle";

export default function RecordButton() {
  const dispatch = useDispatch();

  const recordButtonClick = () => {
    dispatch(categoryActions.categoryChange(RECORD));
  };

  return <Button onClick={recordButtonClick}>녹음</Button>;
}
