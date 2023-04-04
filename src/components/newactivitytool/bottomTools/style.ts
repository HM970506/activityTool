import style from "styled-components";

export const BackgroundContainer = style.div`
  width:95%;
  border:1px solid black;
`;

export const Container = style.div`
  display: flex;
  justify-content:left;
  align-items:center;

`;
export const SubCategoryContainer = style(Container)`
  .button{
    width: 100px;
    height: 10px;
  }
`;

export const ListContainer = style(Container)`
gap: 5px;
overflow-x: scroll;
overflow-y:hidden.
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
