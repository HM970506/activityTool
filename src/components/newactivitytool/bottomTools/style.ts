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

export const SubButtons = style.button<{ select: number }>`
  width: 100px;
  height: 30px;
  padding: 10px;
  background-color:${(props) => {
    return props.select == 1 ? "red" : "white";
  }};
  border: 1px solid black;
  display: flex;
  justify-content:center;
  align-items:center;
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

export const Thumbnail = style.img`
  height: 100%;
`;

export const LoadingContainer = style.div`
  height: inherit;
  
`;
