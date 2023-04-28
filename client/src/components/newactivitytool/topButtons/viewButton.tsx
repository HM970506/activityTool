import { useDispatch, useSelector } from "react-redux";
import { categoryActions } from "../../../store/common/categorySlice";
import { ReactComponent as OpenEye } from "./svg/openEye.svg";
import { ReactComponent as CloseEye } from "./svg/closeEye.svg";
import { ReducersType } from "../types";
import { ViewButtonContatiner } from "../styles/zoomButtonStyle";

export default function ViewButton() {
  const view = useSelector((state: ReducersType) => state.categoryReducer.view);

  const dispatch = useDispatch();

  const viewClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(categoryActions.setView(!view));
  };

  return (
    <ViewButtonContatiner onClick={viewClick}>
      {view ? <OpenEye /> : <CloseEye />}
    </ViewButtonContatiner>
  );
}
