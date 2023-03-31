import { fabric } from "fabric-with-erasing";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useReducer, useState } from "react";
import {
  BackgroundContainer,
  ListContainer,
  SubButtons,
  SubCategoryContainer,
} from "./style";
import { categoryActions } from "../../../store/common/categorySlice";

const array = Array.from(Array(20).keys());

export default function DecorationMenu() {
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const { template, stamp, tape } = useSelector(
    (state: any) => state.categoryReducer.subcategory
  );
  const dispatch = useDispatch();

  const stamping = () => {
    const pointer = canvas.getPointer();
    console.log(pointer);
    fabric.loadSVGFromUrl("./stamp.svg", (objects: any, options: any) => {
      const stamp = fabric.util.groupSVGElements(objects, options);
      stamp.x = pointer.x;
      stamp.y = pointer.y;
      canvas.add(stamp);
      canvas.calcOffset();
      canvas.renderAll();
    });
  };

  const taping = () => {
    if (canvas) {
    }
  };

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

  return (
    <BackgroundContainer>
      <SubCategoryContainer>
        <button onClick={() => dispatch(categoryActions.templatepOn)}>
          템플릿
        </button>
        <button onClick={() => dispatch(categoryActions.stampOn)}>도장</button>
        <button onClick={() => dispatch(categoryActions.tapeOn)}>
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
                  dispatch(categoryActions.templateChange(value));
                }}
              >
                {value}
              </SubButtons>
            );
          })}
        {stamp.state &&
          array.map((value, key) => {
            return (
              <SubButtons
                select={stamp.index == key ? 1 : 0}
                key={key}
                onClick={() => {
                  dispatch(categoryActions.stampChange(value));
                }}
              >
                {value}
              </SubButtons>
            );
          })}
        {tape.state &&
          array.map((value, key) => {
            return (
              <SubButtons
                select={tape.index == key ? 1 : 0}
                key={key}
                onClick={() => {
                  dispatch(categoryActions.tapeChange(value));
                }}
              >
                {value}
              </SubButtons>
            );
          })}
      </ListContainer>
    </BackgroundContainer>
  );
}
