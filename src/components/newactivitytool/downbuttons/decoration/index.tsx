import { useDispatch, useSelector } from "react-redux";
import { categoryActions } from "../../../../store/common/categorySlice";
import { DECORATION, ReducersType } from "../../types";
import { useQuery } from "react-query";
import {
  getFirestoreData,
  getStorageDataAll,
} from "../../../api/firestore/getData";
import { useEffect, useState } from "react";
import { DecoContatiner, DecoInnerBox } from "./style";
import DecorationMenu from "./decorations";

export default function DecorationButton() {
  const dispatch = useDispatch();
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
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

  const [isOpen, setIsOpen] = useState<number>(0);

  const category = useSelector(
    (state: ReducersType) => state.categoryReducer.category
  );
  const decorationStart = () => {
    dispatch(categoryActions.categoryChange(DECORATION));
  };

  const decorationEnd = () => {
    dispatch(categoryActions.categoryChange(""));
  };

  useEffect(() => {
    if (canvas) {
      if (category === DECORATION) setIsOpen(1);
      else {
        setIsOpen(0);
        canvas.tape.state = 0;
        canvas.stamp.state = 0;
      }
    }
  }, [category]);

  return (
    <DecoContatiner state={isOpen}>
      <DecoInnerBox
        onClick={(e) => {
          if (category !== DECORATION) decorationStart();
          else decorationEnd();
        }}
        state={isOpen}
      >
        <p>아이콘</p>
      </DecoInnerBox>
      {isOpen ? <DecorationMenu /> : null}
    </DecoContatiner>
  );
}
