import { fabric } from "fabric-with-erasing";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useReducer, useState } from "react";
import style from "styled-components";
import { zoomActions } from "../../../store/common/zoomSlice";
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
  const [subCategory, setSubCategory] = useState<string>("template");
  const subState = useSelector(
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
      canvas.on("dragenter", () => {
        console.log("start");
      });
      canvas.on("dragover", () => {
        console.log("go");
      });
      canvas.on("dragleave", () => {
        console.log("end");
      });

      console.log(canvas.__eventListeners);
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

  useEffect(() => {
    if (subCategory == "stamp") stamping();
    else if (subCategory == "tape") taping();
  }, [subCategory]);

  return (
    <BackgroundContainer>
      <SubCategoryContainer>
        <button onClick={() => setSubCategory("template")}>템플릿</button>
        <button onClick={() => setSubCategory("stamp")}>도장</button>
        <button onClick={() => setSubCategory("tape")}>마스킹테이프</button>
      </SubCategoryContainer>
      <ListContainer>
        {subCategory == "template" &&
          array.map((value, key) => {
            return (
              <SubButtons
                select={subState.template == key ? 1 : 0}
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
        {subCategory == "stamp" &&
          array.map((value, key) => {
            return (
              <SubButtons
                select={subState.stamp == key ? 1 : 0}
                key={key}
                onClick={() => {
                  dispatch(categoryActions.stampChange(value));
                }}
              >
                {value}
              </SubButtons>
            );
          })}
        {subCategory == "tape" &&
          array.map((value, key) => {
            return (
              <SubButtons
                select={subState.tape == key ? 1 : 0}
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
