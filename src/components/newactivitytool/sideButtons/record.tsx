import { useDispatch } from "react-redux";
import { categoryActions } from "../../../store/common/categorySlice";
import { nodeActions } from "../../../store/common/nodeSlice";
import { RECORD } from "../types";
import { Button } from "../style";

export default function RecordButton() {
  const dispatch = useDispatch();

  const recordButtonClick = () => {
    dispatch(categoryActions.categoryChange(RECORD));
  };

  return <Button onClick={recordButtonClick}>녹음</Button>;
}
