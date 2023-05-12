import { Button } from "../../styles/commonStyle";
import { useDispatch, useSelector } from "react-redux";
import { categoryActions } from "../../../../store/common/categorySlice";
import { ReducersType, TEXT } from "../../types";
import { useQuery, useQueryClient } from "react-query";
import {
  getFirestoreData,
  getStorageDataAll,
} from "../../../api/firestore/getData";
import { useEffect, useState } from "react";
import TextMenu from "./text";
import { TextInnerBox } from "./style";
import otherClick from "../../common/otherClick";

export default function TextButton() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState<number>(0);
  const category = useSelector(
    (state: ReducersType) => state.categoryReducer.category
  );

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
    console.log("클릭");
    if (category !== TEXT) {
      dispatch(categoryActions.categoryChange(TEXT));
      setIsOpen(1);
    } else {
      dispatch(categoryActions.categoryChange(""));
      setIsOpen(0);
    }
  };

  return (
    <>
      <Button onClick={textButtonClick}>
        {category === TEXT && <TextMenu />}
        <TextInnerBox state={isOpen}>글상자</TextInnerBox>
      </Button>
    </>
  );
}
