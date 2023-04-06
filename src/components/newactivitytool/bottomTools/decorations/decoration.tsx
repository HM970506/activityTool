import { fabric } from "fabric-with-erasing";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useReducer, useState } from "react";
import {
  BackgroundContainer,
  ListContainer,
  SubButtons,
  SubCategoryContainer,
} from "../style";
import { categoryActions } from "../../../../store/common/categorySlice";
import { STAMP } from "../decorationSample";
import { nodeActions } from "../../../../store/common/nodeSlice";
import Tape from "./tape";
import Stamp from "./stamp";

const array = Array.from(Array(20).keys());

export default function DecorationMenu() {
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const subcateogory = useSelector(
    (state: any) => state.categoryReducer.subcategory
  );
  const { template, stamp, tape } = subcateogory;
  const dispatch = useDispatch();

  const templating = (templateId: number) => {
    const url = `/test${templateId + 1}.PNG`;

    fabric.Image.fromURL(url, (img: any) => {
      const scale = canvas.width / img.width;

      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        scaleX: scale,
        scaleY: scale,
      });

      canvas.setHeight(img.height * scale);
      canvas.renderAll();
    });
  };

  useEffect(() => {
    if (tape.state) {
      canvas.taping = 1;
      dispatch(nodeActions.setDraw(false));
    } else canvas.taping = 0;
  }, [tape]);

  useEffect(() => {
    if (stamp.state) {
      canvas.stamping = stamp.index;
      dispatch(nodeActions.setDraw(false));
    } else canvas.stamping = -1;
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
        {template.state &&
          array.map((value, key) => {
            return (
              <SubButtons
                select={template.index == key ? 1 : 0}
                key={key}
                onClick={() => {
                  templating(value);
                  dispatch(categoryActions.templateChange(key));
                }}
              >
                {value}
              </SubButtons>
            );
          })}
        {stamp.state && <Stamp />}
        {tape.state && <Tape />}
      </ListContainer>
    </BackgroundContainer>
  );
}
