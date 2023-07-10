import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ReducersType } from "../../types";
import { selectable, unselectable } from "../../common/selectHandler";
import { DecoOptionContainer2, StampsContainer } from "./sizebox";
import Colorbox from "../../common/colorbox/colorbox";
import { categoryActions } from "../../../../store/common/categorySlice";
import { SizeContainer, Sizechip, SizechipBox } from "../../common/sizebox";
import { ReactComponent as Tape1 } from "./svg/tape/tape1.svg";
import { ReactComponent as Tape2 } from "./svg/tape/tape2.svg";
import { ReactComponent as Tape3 } from "./svg/tape/tape3.svg";
import { ReactComponent as Tape4 } from "./svg/tape/tape4.svg";
import { ReactComponent as Tape5 } from "./svg/tape/tape5.svg";
import React from "react";

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
  const setColor = (color: string) => {
    dispatch(categoryActions.tapeColorChange(color));
    canvas.tape.color = color;
  };

  const sizeChange = (size: number) => {
    canvas.tape.size = size;
    dispatch(categoryActions.tapeChange(size));
  };

  return (
    <DecoOptionContainer2 onClick={(e) => e.stopPropagation()}>
      <StampsContainer>
        <SizeContainer>
          <SizechipBox select={tape.index === 1 ? 1 : 0} color={tape.color}>
            <Sizechip
              color={tape.index !== 1 ? tape.color : ""}
              onClick={() => {
                sizeChange(1);
              }}
            >
              <Tape1 />
            </Sizechip>
          </SizechipBox>
          <SizechipBox select={tape.index === 5 ? 1 : 0} color={tape.color}>
            <Sizechip
              color={tape.index !== 5 ? tape.color : ""}
              onClick={() => {
                sizeChange(5);
              }}
            >
              <Tape2 />
            </Sizechip>
          </SizechipBox>
          <SizechipBox select={tape.index === 10 ? 1 : 0} color={tape.color}>
            <Sizechip
              color={tape.index !== 10 ? tape.color : ""}
              onClick={() => {
                sizeChange(10);
              }}
            >
              <Tape3 />
            </Sizechip>
          </SizechipBox>
          <SizechipBox select={tape.index === 30 ? 1 : 0} color={tape.color}>
            <Sizechip
              color={tape.index !== 30 ? tape.color : ""}
              onClick={() => {
                sizeChange(30);
              }}
            >
              <Tape4 />
            </Sizechip>
          </SizechipBox>
          <SizechipBox select={tape.index === 50 ? 1 : 0} color={tape.color}>
            <Sizechip
              color={tape.index !== 50 ? tape.color : ""}
              onClick={() => {
                sizeChange(50);
              }}
            >
              <Tape5 />
            </Sizechip>
          </SizechipBox>
        </SizeContainer>
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
