import style from "styled-components";

export const BackgroundContainer = style.div`
  width:95%;
  height: 90%;
`;

export const Container = style.div`
  display: flex;
  justify-content:left;
  align-items:center;
  width: 100%;
`;
export const SubCategoryContainer = style(Container)`
height: 30%;  
gap: 10px;
border:1px solid black;
.button{
    width: 100px;
  }
`;

export const ListContainer = style(Container)`
gap: 10px;
border:1px solid black;

height: 70%;
overflow-x: auto;
overflow-y:hidden;
`;

export const ObjectButton = style.button`
  background-color: inherit;
  width: 10%;
  height: 100%;
  border: 1px solid black;
  display: flex;
  justify-content:center;
  align-items:center;
`;

export const SelectableObjectButton = style(ObjectButton)<{ select: number }>`
  background-color:${(props) => {
    return props.select === 1 ? "red" : "white";
  }};
`;

export const FontButton = style.button<{ font: string; url: string }>`
@font-face{
  font-family: ${(props) => {
    return props.font;
  }};
  src: url(${(props) => {
    return props.url;
  }});
}

  font-family: ${(props) => {
    return props.font;
  }};
  border: none;
  background-color: inherit;
  font-size: 20px;
`;

export const DrawSample = style.div<{ size: number }>`
  border: 1px solid black;
  backgound-color: inherit;
  border-radius: 100%;
  width:  ${(props) => props.size + "px"};
  height: ${(props) => props.size + "px"};
`;
