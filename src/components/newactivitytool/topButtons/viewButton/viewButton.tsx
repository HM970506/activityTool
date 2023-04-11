import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { stat } from "fs";
import { categoryActions } from "../../../../store/common/categorySlice";
import { getStorageData, getStorageDataAll } from "../../../firestore/getData";
import { useQuery } from "react-query";
import { useEffect } from "react";

const ViewButtonContatiner = styled.button`
  border: none;
  background-color: rgba(0, 0, 0, 0);
  width: 50px;
  height: 50px;
`;

export default function ViewButton() {
  const view = useSelector((state: any) => state.categoryReducer.view);
  const { data, isLoading } = useQuery(
    "eyeimage",
    async () => {
      return await getStorageDataAll("topButtons/viewButton");
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
    }
  );

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(isLoading);
    console.log(data);
  }, [isLoading]);

  const viewClick = (e: any) => {
    dispatch(categoryActions.setView(!view));
  };

  const OpenEye = () => {
    //const url = getData("topButtons/viewButton/openEye.svg");
    return isLoading ? <image /> : null;
  };

  const CloseEye = () => {
    // const url = getData("topButtons/viewButton/closeEye.svg");
    return isLoading ? <image /> : null;
  };

  return (
    <ViewButtonContatiner onClick={viewClick}>
      {view ? <OpenEye /> : <CloseEye />}
    </ViewButtonContatiner>
  );
}
