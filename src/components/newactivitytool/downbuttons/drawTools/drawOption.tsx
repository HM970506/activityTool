import Colorbox from "../../common/colorbox/colorbox";
import { SizeContainer, Sizechip, SizechipBox } from "../../common/sizebox";
import { DrawOptionContainer } from "./style";
import { ERASER, FELTPEN, ReducersType, SPRAY } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { drawActions } from "../../../../store/common/drawSlice";
import { LineSize, SIZES, SpraySize } from "./datas";

export default function DrawOption({ keyName }: { keyName: string }) {
  const brushes = useSelector((state: ReducersType) => state.drawReducer);
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const dispatch = useDispatch();
  const select = useSelector((state: ReducersType) => state.drawReducer.now);

  const setColor = (color: string) => {
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

  const OptionButton = ({ size, index }: { size: number; index: number }) => {
    return (
      <SizechipBox select={option.width === size ? 1 : 0} color={option.color}>
        <Sizechip
          color={option.width !== size ? option.color : ""}
          onClick={() => {
            setSize(size);
          }}
        >
          {keyName == SPRAY ? SpraySize[index] : LineSize[index]}
        </Sizechip>
      </SizechipBox>
    );
  };

  return (
    <DrawOptionContainer onClick={(e) => e.stopPropagation()}>
      <SizeContainer>
        {SIZES.map((value: number, key: number) => {
          return <OptionButton size={value} index={key} />;
        })}
      </SizeContainer>

      {keyName !== FELTPEN && keyName !== ERASER && (
        <Colorbox
          setColor={(color: string) => {
            setColor(keyName);
          }}
          option={option}
          keyName={keyName}
        />
      )}
    </DrawOptionContainer>
  );
}
