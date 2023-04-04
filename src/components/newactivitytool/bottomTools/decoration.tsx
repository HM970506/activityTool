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
const TAPES = [
  "https://i.pinimg.com/564x/08/dd/35/08dd35fcf52d84495113ea6d900d8350.jpg",
  "https://i.pinimg.com/736x/dc/5c/2f/dc5c2f082d46071cca41bd31e1a0ea50.jpg",
  "https://i.pinimg.com/564x/07/75/c2/0775c21e58ff42da3975d751e3784579.jpg",
  "https://i.pinimg.com/736x/90/a4/4b/90a44bca4d3c37c0a958dd3ebfd85c27.jpg",
  "https://i.pinimg.com/564x/f5/8c/00/f58c008a20bd9054becbe01d5c8ff6cc.jpg",
];

export default function DecorationMenu() {
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const subcateogory = useSelector(
    (state: any) => state.categoryReducer.subcategory
  );
  const { template, stamp, tape } = subcateogory;
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
    if (tape.state) canvas.taping = 1;
    else canvas.taping = 0;
  }, [tape]);

  useEffect(() => {
    console.log(JSON.stringify(subcateogory));
  }, [subcateogory]);

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
        {stamp.state &&
          array.map((value, key) => {
            return (
              <SubButtons
                select={stamp.index == key ? 1 : 0}
                key={key}
                onClick={() => {
                  dispatch(categoryActions.stampChange(key));
                }}
              >
                {value}
              </SubButtons>
            );
          })}
        {tape.state &&
          TAPES.map((value, key) => {
            return (
              <SubButtons
                select={tape.index == key ? 1 : 0}
                key={key}
                onClick={() => {
                  dispatch(categoryActions.tapeChange(key));
                }}
              >
                {key}
              </SubButtons>
            );
          })}
      </ListContainer>
    </BackgroundContainer>
  );
}
