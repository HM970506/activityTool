import { useDispatch, useSelector } from "react-redux";
import { Dispatch, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { ReducersType } from "../../types";
import { categoryActions } from "../../../../store/common/categorySlice";
import Colorbox from "../../common/colorbox";
import { SelectButton } from "../../styles/commonStyle";
import { Button, DecoOptionContainer2, StampsContainer } from "./style";
import SVG from "react-inlinesvg";

export default function Stamp() {
  const dispatch = useDispatch();
  const option = useSelector(
    (state: ReducersType) => state.categoryReducer.option
  );
  const [stamps, setStamps] = useState<string[]>([]);
  const { color } = useSelector(
    (state: ReducersType) => state.categoryReducer.subcategory.stamp
  );

  const canvas = useSelector((state: ReducersType) => state.nodeReducer.canvas);
  const stamp = useSelector(
    (state: ReducersType) => state.categoryReducer.subcategory.stamp
  );

  const queryClient = useQueryClient();
  const data = queryClient.getQueryData("decoration_stamp");

  useEffect(() => {
    if (Array.isArray(data)) {
      setStamps(data);
      canvas.stamp.state = 1;
      canvas.stamp.shape = data[stamp.index];
    }
  }, [data]);

  const setColor = (color: string) => {
    dispatch(categoryActions.stampColorChange(color));
    canvas.stamp.color = color;
  };

  return (
    <DecoOptionContainer2 onClick={(e) => e.stopPropagation()}>
      <StampsContainer>
        {data ? (
          stamps.map((value: string, key: number) => (
            <Button
              select={stamp.index === key ? 1 : 0}
              color={color}
              key={`stamp_${key}`}
              onClick={() => {
                canvas.stamp.shape = value;
                dispatch(categoryActions.stampChange(key));
              }}
            >
              <SVG src={value} />
            </Button>
          ))
        ) : (
          <div>로딩중</div>
        )}
      </StampsContainer>
      <Colorbox
        setColor={setColor}
        option={{
          color: color,
          size: 0,
        }}
        keyName={"stamp"}
      />
    </DecoOptionContainer2>
  );
}
