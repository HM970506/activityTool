import { useState } from "react";
import {
  Button,
  ButtonBox,
  Canvas,
  LoadButton,
  MainButton,
  NewButton,
  SubButton,
  ToolBox,
} from "./style";

export default function NewActivityTool() {
  const [subButtonVisible, setSubButtonVisible] = useState<boolean>(false);
  const [toolsVisible, setToolsVisible] = useState<boolean>(false);

  const mainClick = () => {
    if (!toolsVisible) setSubButtonVisible((x) => !x);
    else {
      setSubButtonVisible(false);
      setToolsVisible(false);
    }
  };

  const start = () => {
    setSubButtonVisible(false);
    setToolsVisible(true);
  };

  return (
    <>
      <ButtonBox>
        {toolsVisible && (
          <>
            <Button>글상자</Button>
            <Button>녹음</Button>
            <Button>사진</Button>
            <Button>스티커</Button>
            <Button>도구</Button>
          </>
        )}
        <MainButton onClick={mainClick}>test</MainButton>
        {subButtonVisible && (
          <>
            <LoadButton>불러오기</LoadButton>
            <NewButton onClick={start}>새로하기</NewButton>
          </>
        )}
      </ButtonBox>
      {toolsVisible && (
        <>
          <ToolBox></ToolBox>
          <Canvas />
        </>
      )}
    </>
  );
}
