import { fabric } from "fabric";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useReducer, useState } from "react";
import style from "styled-components";
import { zoomActions } from "../../../store/common/zoomSlice";

const BackgroundContainer = style.div`
  width:95%;
  border:1px solid black;
`;

const Container = style.div`
  display: flex;
  justify-content:left;
  align-items:center;

`;
const SubCategoryContainer = style(Container)`
  .button{
    width: 100px;
    height: 10px;
  }
`;

const ListContainer = style(Container)`
gap: 5px;
overflow-x: scroll;
overflow-y:hidden.
`;

const SubButtons = style.button<{ select: number }>`
  width: 40px;
  height: 30px;
  padding: 10px;
  background-color:${(props) => {
    return props.select == 1 ? "red" : "white";
  }};
  border: 1px solid black;
`;

const array = Array.from(Array(20).keys());

export default function DecorationMenu() {
  const initalState = {
    template: -1,
    stamp: -1,
    tape: -1,
  };

  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const [subCategory, setSubCategory] = useState<string>("template");
  const [subState, setSubState] = useReducer((prev: any, next: any) => {
    return { ...prev, ...next };
  }, initalState);
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
      const pointer = canvas.getPointer();
      console.log(pointer);
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
    canvas.__eventListeners["mouse:down"] = [];
    if (subCategory == "stamp") canvas.on("mouse:down", stamping);
    else if (subCategory == "tape") canvas.on("mouse:down", taping);

    console.log(canvas.__eventListeners["mouse:down"]);
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
                  setSubState({ template: value });
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
                  setSubState({ stamp: value });
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
                  setSubState({ tape: value });
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
