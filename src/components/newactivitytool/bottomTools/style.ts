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
    return props.select == 1 ? "red" : "white";
  }};
`;

export const Thumbnail = style.img`
  height: 100%;
`;

export const LoadingContainer = style.div`
  height: 100%;
`;

export const ColorContainer = style.div`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  gap: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  position: relative;
  top: -10px;
`;

export const Colorchip = style.button<{ color: string; select: number }>`
  width: 30px;
  height: 30px;
  border: none;
  bottom: ${(props) => (props.select == 1 ? "15px" : "0px")};
  border-radius: 100%;
  position: relative;
  background-color: ${(props) => {
    return props.color;
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
