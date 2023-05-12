import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ReducersType } from "../../types";
import { selectable, unselectable } from "../../common/selectHandler";
import { Button, DecoOptionContainer2, StampsContainer } from "./style";
import { SelectButton } from "../../styles/commonStyle";
import Colorbox from "../../common/colorbox";
import { categoryActions } from "../../../../store/common/categorySlice";

export default function Tape() {
  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const tape = useSelector(
    (state: ReducersType) => state.categoryReducer.subcategory.tape
  );

  useEffect(() => {
    if (canvas) {
      if (tape.state) {
        unselectable(canvas);
        canvas.tape.state = 1;
      }
    } else {
      selectable(canvas);
      canvas.tape.state = 0;
    }
  }, [tape.state]);
  const dispatch = useDispatch();
  const SIZE = [1, 2, 3, 4, 5];
  const setColor = (color: string) => {
    dispatch(categoryActions.tapeColorChange(color));
    canvas.tape.color = color;
  };
  return (
    <DecoOptionContainer2 onClick={(e) => e.stopPropagation()}>
      <StampsContainer>
        {SIZE.map((value: number, key: number) => {
          return (
            <Button
              select={tape.index === key ? 1 : 0}
              color={tape.color}
              onClick={() => {
                canvas.tape.size = value * 10;
                dispatch(categoryActions.tapeChange(key));
              }}
              key={`tape${key}`}
            >
              {value}
            </Button>
          );
        })}
      </StampsContainer>
      <Colorbox
        setColor={setColor}
        option={{
          color: tape.color,
          size: 0,
        }}
        keyName={"tape"}
      />
    </DecoOptionContainer2>
  );
}
