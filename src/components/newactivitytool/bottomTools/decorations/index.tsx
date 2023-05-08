import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  BackgroundContainer,
  ListContainer,
  SubCategoryContainer,
} from "../../styles/bottomToolstyle";
import { categoryActions } from "../../../../store/common/categorySlice";
import { nodeActions } from "../../../../store/common/nodeSlice";
import Tape from "./tape";
import Stamp from "./stamp";
import Template from "./template";
import { ReducersType } from "../../types";
import { selectable, unselectable } from "../../common/selectHandler";

export default function DecorationMenu() {
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const { template, stamp, tape } = useSelector(
    (state: ReducersType) => state.categoryReducer.subcategory
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (tape.state) {
      unselectable(canvas);

      canvas.taping = 1;
      dispatch(nodeActions.setDraw(false));
    } else {
      if (!stamp.state) selectable(canvas);
      canvas.taping = 0;
    }
  }, [tape.state]);

  useEffect(() => {
    if (stamp.state) {
      unselectable(canvas);
      dispatch(nodeActions.setDraw(false));
    } else {
      if (!tape.state) selectable(canvas);
      canvas.stamping = "";
    }
  }, [stamp.state]);

  return (
    <BackgroundContainer>
      <SubCategoryContainer>
        <button
          onClick={() => {
            dispatch(categoryActions.templateOn());
          }}
        >
          템플릿
        </button>
        <button
          onClick={() => {
            dispatch(categoryActions.stampOn());
          }}
        >
          도장
        </button>
        <button
          onClick={() => {
            dispatch(categoryActions.tapeOn());
          }}
        >
          마스킹테이프
        </button>
      </SubCategoryContainer>
      <ListContainer>
        {template.state && <Template />}
        {stamp.state && <Stamp />}
        {tape.state && <Tape />}
      </ListContainer>
    </BackgroundContainer>
  );
}