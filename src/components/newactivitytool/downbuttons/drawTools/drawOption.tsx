import Colorbox from "../../common/colorbox";
import { SizeContainer, Sizechip, SizechipBox } from "../../common/sizebox";
import { DrawOptionContainer } from "./style";
import { ERASER, FELTPEN, ReducersType, SPRAY } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { drawActions } from "../../../../store/common/drawSlice";
import { ReactComponent as Line1 } from "./svg/line/line1.svg";
import { ReactComponent as Line2 } from "./svg/line/line2.svg";
import { ReactComponent as Line3 } from "./svg/line/line3.svg";
import { ReactComponent as Line4 } from "./svg/line/line4.svg";
import { ReactComponent as Line5 } from "./svg/line/line5.svg";
import { ReactComponent as Spray1 } from "./svg/spray/spray1.svg";
import { ReactComponent as Spray2 } from "./svg/spray/spray2.svg";
import { ReactComponent as Spray3 } from "./svg/spray/spray3.svg";
import { ReactComponent as Spray4 } from "./svg/spray/spray4.svg";
import { ReactComponent as Spray5 } from "./svg/spray/spray5.svg";

export default function DrawOption({ keyName }: { keyName: string }) {
  const brushes = useSelector((state: ReducersType) => state.drawReducer);
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const dispatch = useDispatch();
  const select = useSelector((state: ReducersType) => state.drawReducer.now);

  const setColor = (keyname: string, color: string) => {
    dispatch(
      drawActions.setBrush({ name: keyName, color: color, width: undefined })
    );
    canvas.freeDrawingBrush.color = color;
  };

  const setSize = (width: number) => {
    dispatch(
      drawActions.setBrush({ name: keyName, color: undefined, width: width })
    );
    canvas.freeDrawingBrush.width = width;
  };

  const option = (brushes as any)[select ? select : "feltpen"];

  return (
    <DrawOptionContainer onClick={(e) => e.stopPropagation()}>
      <SizeContainer>
        <SizechipBox select={option.width === 1 ? 1 : 0} color={option.color}>
          <Sizechip
            color={option.width !== 1 ? option.color : ""}
            onClick={() => {
              setSize(1);
            }}
          >
            {keyName == SPRAY ? <Spray1 /> : <Line1 />}
          </Sizechip>
        </SizechipBox>
        <SizechipBox select={option.width === 5 ? 1 : 0} color={option.color}>
          <Sizechip
            color={option.width !== 5 ? option.color : ""}
            onClick={() => {
              setSize(5);
            }}
          >
            {keyName == SPRAY ? <Spray2 /> : <Line2 />}
          </Sizechip>
        </SizechipBox>
        <SizechipBox select={option.width === 10 ? 1 : 0} color={option.color}>
          <Sizechip
            color={option.width !== 10 ? option.color : ""}
            onClick={() => {
              setSize(10);
            }}
          >
            {keyName == SPRAY ? <Spray3 /> : <Line3 />}
          </Sizechip>
        </SizechipBox>
        <SizechipBox select={option.width === 15 ? 1 : 0} color={option.color}>
          <Sizechip
            color={option.width !== 15 ? option.color : ""}
            onClick={() => {
              setSize(15);
            }}
          >
            {keyName == SPRAY ? <Spray4 /> : <Line4 />}
          </Sizechip>
        </SizechipBox>
        <SizechipBox select={option.width === 20 ? 1 : 0} color={option.color}>
          <Sizechip
            color={option.width !== 20 ? option.color : ""}
            onClick={() => {
              setSize(20);
            }}
          >
            {keyName == SPRAY ? <Spray5 /> : <Line5 />}
          </Sizechip>
        </SizechipBox>
      </SizeContainer>

      {keyName !== FELTPEN && keyName !== ERASER && (
        <Colorbox
          setColor={(color: string) => {
            setColor(keyName, color);
          }}
          option={option}
          keyName={keyName}
        />
      )}
    </DrawOptionContainer>
  );
}
