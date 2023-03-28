import { fabric } from "fabric";
import { useSelector } from "react-redux";
import { useState } from "react";
import style from "styled-components";

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

const SubButtons = style.button`
  width: 40px;
  height: 30px;
  padding: 10px;
  border: 1px solid black;
`;

const array = Array.from(Array(20).keys());

export default function DecorationMenu() {
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const [subCategory, setSubCategory] = useState<string>("template");

  const stamping = (id: number) => {
    const pointer = canvas.getPointer();

    fabric.loadSVGFromUrl("./stamp.svg", (objects: any, options: any) => {
      const stamp = fabric.util.groupSVGElements(objects, options);
      stamp.x = pointer.x;
      stamp.y = pointer.y;
      canvas.add(stamp);
      canvas.calcOffset();
      canvas.renderAll();
    });
  };

  const taping = (id: number) => {
    const pointer = canvas.getPointer();
  };

  const templating = (templateId: number) => {
    const url = `/test${templateId + 1}.PNG`;

    fabric.Image.fromURL(url, (img: any) => {
      console.log(img);
      const mag = canvas.width / img.width;

      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        scaleX: mag,
        scaleY: mag,
      });
      canvas.setHeight(img.height * mag);
      canvas.renderAll();
    });
  };

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
                key={key}
                onClick={() => {
                  templating(value);
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
                key={key}
                onClick={() => {
                  stamping(value);
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
                key={key}
                onClick={() => {
                  taping(value);
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
