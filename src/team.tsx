import Background from "./background.png";
import styled from "styled-components";
import NewActivityTool from "./components/newactivitytool";

const TestImage = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
`;

export default function Team() {
  return <NewActivityTool />;
}
