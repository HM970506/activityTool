import { useDispatch, useSelector } from "react-redux";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { categoryActions } from "../../../../store/common/categorySlice";
import { nodeActions } from "../../../../store/common/nodeSlice";
import { ReducersType } from "../../types";
import { selectable, unselectable } from "../../common/selectHandler";
import Template from "./template";
import Stamp from "./stamp";
import Tape from "./tape";
import { DecoCategoryButton, StampCategoryButton } from "./style";
import SVG from "react-inlinesvg";

export default function DecorationMenu() {
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const { template, stamp, tape } = useSelector(
    (state: ReducersType) => state.categoryReducer.subcategory
  );
  const [option, setOption] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (tape.state) {
      unselectable(canvas);
      canvas.tape.state = 1;
    } else {
      if (!stamp.state) selectable(canvas);
      canvas.tape.state = 0;
    }
  }, [tape.state]);

  useEffect(() => {
    if (stamp.state) {
      unselectable(canvas);
      canvas.stamp.state = 1;
    } else {
      if (!tape.state) selectable(canvas);
      canvas.stamp.state = 0;
    }
  }, [stamp.state]);

  // useEffect(() => {
  //   //classname이 아니라 다른 걸로 option 내부 요소인지를 판단하게 하려면 어떻게 해야 할까...
  //   document.addEventListener("mousedown", (e: MouseEvent) => {
  //     if (e.target) {
  //       const target = e.target as Element;
  //       console.log(target);
  //       if (!target.classList.contains("option")) setOption(false);
  //     }
  //   });
  // }, []);

  return (
    <>
      <DecoCategoryButton
        state={template.state ? 1 : 0}
        onClick={() => {
          if (!template.state) dispatch(categoryActions.templateOn());
          else dispatch(categoryActions.templateOff());
        }}
      >
        {template.state && <Template />}
        <p> 템플릿</p>
      </DecoCategoryButton>
      <StampCategoryButton
        color={canvas.stamp.color}
        state={stamp.state ? 1 : 0}
        onClick={() => {
          if (!stamp.state) dispatch(categoryActions.stampOn());
          else if (!option) setOption(true);
          else if (option) setOption(false);
          else dispatch(categoryActions.stampOff());
        }}
      >
        {stamp.state && option && <Stamp />}

        {canvas.stamp.shape != "" ? <SVG src={canvas.stamp.shape} /> : "스탬프"}
      </StampCategoryButton>
      <DecoCategoryButton
        state={tape.state ? 1 : 0}
        onClick={() => {
          if (!tape.state) dispatch(categoryActions.tapeOn());
          else if (!option) setOption(true);
          else if (option) setOption(false);
          else dispatch(categoryActions.tapeOff());
        }}
      >
        {tape.state && option && <Tape />}
        <p> 마스킹테이프</p>
      </DecoCategoryButton>
    </>
  );
}
