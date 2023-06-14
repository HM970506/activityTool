import { useDispatch, useSelector } from "react-redux";
import { categoryActions } from "../../../../store/common/categorySlice";
import { DECORATION, ReducersType } from "../../types";
import { useQuery } from "react-query";
import {
  getFirestoreData,
  getStorageDataAll,
} from "../../../api/firestore/getData";
import { useEffect, useState } from "react";
import { DecoContatiner } from "./sizebox";
import DecorationMenu from "./decorations";
import { useSpring } from "react-spring";
import { ButtonInner, Icon } from "../../styles/style";

export default function DecorationButton() {
  const dispatch = useDispatch();
  const category = useSelector(
    (state: ReducersType) => state.categoryReducer.category
  );
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

  const openHandler = () => {
    if (category !== DECORATION)
      dispatch(categoryActions.categoryChange(DECORATION));
    else dispatch(categoryActions.categoryChange(""));
  };

  const innerBox = useSpring({
    from: isOpen
      ? { backgroundColor: "white", margin: 20 }
      : { backgroundColor: "#EE5859", margin: 4 },
    to: isOpen
      ? { backgroundColor: "#EE5859", margin: 4 }
      : { backgroundColor: "white", margin: 20 },
  });

  const outterBox = useSpring({
    from: isOpen ? { width: 72 } : { width: 348 },
    to: isOpen ? { width: 348 } : { width: 72 },
  });

  return (
    <DecoContatiner style={outterBox}>
      <ButtonInner onClick={openHandler} style={innerBox}>
        <Icon src={"/diary/decoration/decorate.png"} />
      </ButtonInner>
      {canvas && <DecorationMenu />}
    </DecoContatiner>
  );
}
