import { Button, SideButton, SideButtonBox } from "../style";
import { useDispatch, useSelector } from "react-redux";
import { categoryActions } from "../../../store/common/categorySlice";
import { TEXT } from "../types";
import { useQueries, useQuery } from "react-query";
import { getFirestoreData, getStorageDataAll } from "../../firestore/getData";

export default function TextButton() {
  const dispatch = useDispatch();
  useQuery(
    `text_font`,
    async () => {
      return await getStorageDataAll(`bottomTools/textbox`);
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
    }
  );
  useQuery(
    `text_fontname`,
    async () => {
      return await getFirestoreData("menu", "textbox");
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
    }
  );

  const nowCategory = useSelector(
    (state: any) => state.categoryReducer.category
  );
  const textButtonClick = () => {
    if (nowCategory) dispatch(categoryActions.categoryChange(TEXT));
  };

  return <Button onClick={textButtonClick}>글상자</Button>;
}
