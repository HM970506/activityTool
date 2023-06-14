import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { ReducersType } from "../../types";
import { categoryActions } from "../../../../store/common/categorySlice";
import Colorbox from "../../common/colorbox/colorbox";
import {
  ListButton,
  DecoOptionContainer2,
  StampsContainer,
} from "../../styles/sizebox";
import SVG from "react-inlinesvg";

export default function Stamp() {
  const dispatch = useDispatch();
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
            <ListButton
              select={stamp.index === key ? 1 : 0}
              color={color}
              key={`stamp_${key}`}
              onClick={() => {
                canvas.stamp.shape = value;
                dispatch(categoryActions.stampChange(key));
              }}
            >
              <SVG src={value} />
            </ListButton>
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
