import { useDispatch, useSelector } from "react-redux";
import { nodeActions } from "../../../store/common/nodeSlice";
import { selectActions } from "../../../store/common/selectSlice";

export const OnChange = (index: number, newAttr: any) => {
  const dispatch = useDispatch();
  dispatch(nodeActions.modifyNodes({ index: index, modifyProps: newAttr }));
};

export const OnSelect = (index: number) => {
  const dispatch = useDispatch();
  dispatch(selectActions.selectChange(index));
};

export const IsSelected = (index: number) => {
  const nowSelect = useSelector((state: any) => state.selectReducer.select);
  return nowSelect === index ? true : false;
};
