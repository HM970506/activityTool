import styled from "styled-components";

export const Textarea = styled.textarea`
  position: absolute;
  display: none;
  top: 0;
  left: 0;
  resize: none;
  overflow: hidden;
  outline: none;
  word-break: keep-all;
  rows: 1;
  border: none;
  backgroundcolor: white;
`;

export const Background = styled.div`
  position: relative;
  height: window.innerHeight;
  width: window.innerWidth;
  backgroundcolor: black;
`;
