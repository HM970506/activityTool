import { Button } from "../../style";
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
import { Icon, TextInnerBox } from "./style";
import otherClick from "../../common/otherClick";
import { useSpring } from "react-spring";

export default function TextButton() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const option = useSelector(
    (state: ReducersType) => state.categoryReducer.option
  );
  const category = useSelector(
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
    if (category !== TEXT) {
      dispatch(categoryActions.categoryChange(TEXT));
      dispatch(categoryActions.optionChange(true));
    } else {
      dispatch(categoryActions.categoryChange(""));
      dispatch(categoryActions.optionChange(false));
    }
  };

  const props = useSpring({
    from:
      category === TEXT && option
        ? { backgroundColor: "white", fill: "#8959AB" }
        : { backgroundColor: "#8959AB", fill: "white" },
    to:
      category === TEXT && option
        ? { backgroundColor: "#8959AB", fill: "white" }
        : { backgroundColor: "white", fill: "#8959AB" },
  });

  return (
    <>
      <Button onClick={textButtonClick}>
        {category === TEXT && option && <TextMenu />}
        <TextInnerBox style={props}>
          <Icon src="/diary/text/bubble.png" />
        </TextInnerBox>
      </Button>
    </>
  );
}
