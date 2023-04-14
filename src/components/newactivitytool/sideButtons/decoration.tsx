import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fabric } from "fabric-with-erasing";
import { categoryActions } from "../../../store/common/categorySlice";
import { Button } from "../styles/indexStyle";
import { DECORATION } from "../types";
import { useQuery, useQueryClient } from "react-query";
import { getFirestoreData, getStorageDataAll } from "../../firestore/getData";

export default function DecorationButton() {
  const dispatch = useDispatch();
  useQuery(
    `decoration_stamp`,
    async () => {
      return await getFirestoreData("menu", "decoration");
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
    }
  );

  useQuery(
    `decoration_template`,
    async () => {
      return await getStorageDataAll(`bottomTools/decorations/template`);
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
    }
  );

  const photoButtonClick = () => {
    dispatch(categoryActions.categoryChange(DECORATION));
  };

  return <Button onClick={photoButtonClick}>꾸미기</Button>;
}
