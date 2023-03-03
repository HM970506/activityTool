import styled from "styled-components";

export const Dialog = styled.dialog`
  padding: 0;

  ::backdrop {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

export const Background = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Template = styled.button`
  width: 120px;
  height: 170px;
  border: 1px solid black;
  margin: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TemplatesContainer = styled.main`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

export const DialogMain = styled.div`
  width: 300px;
  height: 100px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
