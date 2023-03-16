import { Button, SideButton, SideButtonBox } from "../style";
import { nodeActions } from "../../../store/common/nodeSlice";
import { useDispatch, useSelector } from "react-redux";
import { categoryActions } from "../../../store/common/categorySlice";
import { BIG, MIDIUM, SMALL } from "../types";
import { TEXT } from "../types";
export default function TextButton() {
  const dispatch = useDispatch();
  const nowCategory = useSelector(
    (state: any) => state.categoryReducer.category
  );
  const textButtonClick = () => {
    if (nowCategory) dispatch(categoryActions.categoryChange(TEXT));
  };

  return <Button onClick={textButtonClick}>글상자</Button>;
}
