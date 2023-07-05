import styled from "styled-components";
import NewActivityTool from "./components/newactivitytool";
import { useState } from "react";
import { Reset } from "styled-reset";

const TestImage = styled.img`
  width: auto;
  height: 100vh;
  display: relative;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

export default function Team() {
  const [background, setBackground] = useState<string>("");
  //@ts-ignore
  window.backgroundFlutterURL = (data: string) => {
    if (data) {
      console.log("받았어욧");
      setBackground(data);
    } else console.log("배경 데이터를 받아오지 못했습니다");
  };
  return (
    <>
      <Reset />
      <Container>
        <TestImage src={background} />
      </Container>
      <NewActivityTool />
    </>
  );
}
