import { Button } from "../styles/commonStyle";
import { useDispatch, useSelector } from "react-redux";
import { categoryActions } from "../../../store/common/categorySlice";
import { ReducersType, TEXT } from "../types";
import { useQuery, useQueryClient } from "react-query";
import {
  getFirestoreData,
  getStorageDataAll,
} from "../../api/firestore/getData";
import { useEffect } from "react";

export default function TextButton() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const nowCategory = useSelector(
    (state: ReducersType) => state.categoryReducer.category
  );

  const { data: font, isLoading: fontLoading } = useQuery(
    `text_font`,
    async () => {
      return await getStorageDataAll(`bottomTools/textbox`);
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
    }
  );
  const { data: fontName, isLoading: fontNameLoading } = useQuery(
    `text_fontname`,
    async () => {
      return await getFirestoreData("menu", "textbox");
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (!fontLoading && !fontNameLoading && font && fontName) {
      queryClient.setQueryData(
        "text",
        fontName.font.map((value: string, key: number) => {
          return { name: value, url: font[key] };
        })
      );
    }
  }, [fontLoading, fontNameLoading]);

  const textButtonClick = () => {
    if (nowCategory) dispatch(categoryActions.categoryChange(TEXT));
  };

  return nowCategory == TEXT ? (
    <div>test</div>
  ) : (
    <Button onClick={textButtonClick}>글상자</Button>
  );
}
