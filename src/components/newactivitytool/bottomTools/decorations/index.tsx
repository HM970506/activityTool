import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  BackgroundContainer,
  ListContainer,
  SubCategoryContainer,
} from "../style";
import { categoryActions } from "../../../../store/common/categorySlice";
import { nodeActions } from "../../../../store/common/nodeSlice";
import Tape from "./tape";
import Stamp from "./stamp";
import Template from "./template";

export default function DecorationMenu() {
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const { template, stamp, tape } = useSelector(
    (state: any) => state.categoryReducer.subcategory
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (tape.state) {
      canvas.taping = 1;
      dispatch(nodeActions.setDraw(false));
    } else canvas.taping = 0;
  }, [tape]);

  useEffect(() => {
    if (stamp.state) dispatch(nodeActions.setDraw(false));
    else canvas.stamping = "";
  }, [stamp]);

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
