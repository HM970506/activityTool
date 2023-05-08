import { useDispatch } from "react-redux";
import { categoryActions } from "../../../store/common/categorySlice";
import { Button } from "../styles/indexStyle";
import { DECORATION } from "../types";
import { useQuery } from "react-query";
import {
  getFirestoreData,
  getStorageDataAll,
} from "../../api/firestore/getData";

export default function DecorationButton() {
  const dispatch = useDispatch();
  useQuery(
    `decoration_stamp`,
    async () => {
      const datas = await getFirestoreData("menu", "decoration");
      let array = new Array();
      if (datas) for (let data in datas) array.push(datas[data]);
      array = array.sort();
      return array;
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
