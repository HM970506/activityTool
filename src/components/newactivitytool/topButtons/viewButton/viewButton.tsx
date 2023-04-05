import { ReactComponent as OpenEye } from "./openEye.svg";
import { ReactComponent as CloseEye } from "./closeEye.svg";

import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { stat } from "fs";
import { categoryActions } from "../../../../store/common/categorySlice";

const ViewButtonContatiner = styled.button`
  border: none;
  background-color: rgba(0, 0, 0, 0);
  width: 50px;
  height: 50px;
`;

export default function ViewButton() {
  const view = useSelector((state: any) => state.categoryReducer.view);
  const dispatch = useDispatch();

  const viewClick = (e: any) => {
    dispatch(categoryActions.setView(!view));
  };

  return (
    <ViewButtonContatiner onClick={viewClick}>
      {view ? <OpenEye /> : <CloseEye />}
    </ViewButtonContatiner>
  );
}
