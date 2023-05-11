import { useDispatch, useSelector } from "react-redux";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { categoryActions } from "../../../../store/common/categorySlice";
import { nodeActions } from "../../../../store/common/nodeSlice";
import { ReducersType } from "../../types";
import { selectable, unselectable } from "../../common/selectHandler";
import Template from "./template";
import Stamp from "./stamp";
import Tape from "./tape";
import { DecoCategoryButton } from "./style";

export default function DecorationMenu({
  isOpen,
  setIsOpen,
}: {
  isOpen: number;
  setIsOpen: Dispatch<SetStateAction<number>>;
}) {
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const { template, stamp, tape } = useSelector(
    (state: ReducersType) => state.categoryReducer.subcategory
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (tape.state) {
      unselectable(canvas);
      canvas.tape.state = 1;
      dispatch(nodeActions.setDraw(false));
    } else {
      if (!stamp.state) selectable(canvas);
      canvas.tape.state = 0;
    }
  }, [tape.state]);

  useEffect(() => {
    if (stamp.state) {
      unselectable(canvas);
      dispatch(nodeActions.setDraw(false));
    } else {
      if (!tape.state) selectable(canvas);
      canvas.stamp.state = 0;
    }
  }, [stamp.state]);

  return (
    <>
      <DecoCategoryButton
        onClick={() => {
          dispatch(categoryActions.templateOn());
        }}
      >
        {template.state && <Template />}
        <p> 템플릿</p>
      </DecoCategoryButton>
      <DecoCategoryButton
        onClick={() => {
          dispatch(categoryActions.stampOn());
        }}
      >
        {stamp.state && <Stamp />}
        <p> 도장</p>
      </DecoCategoryButton>
      <DecoCategoryButton
        onClick={() => {
          dispatch(categoryActions.tapeOn());
        }}
      >
        {tape.state && <Tape />}
        <p> 마스킹테이프</p>
      </DecoCategoryButton>
    </>
  );
}
