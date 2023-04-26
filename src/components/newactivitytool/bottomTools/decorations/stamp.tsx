import { useDispatch, useSelector } from "react-redux";
import {
  SelectableObjectButton,
  Thumbnail,
} from "../../styles/bottomToolstyle";
import { categoryActions } from "../../../../store/common/categorySlice";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { ReducersType } from "../../types";

export default function Stamp() {
  const dispatch = useDispatch();
  const [stamps, setStamps] = useState<string[]>([]);
  const { isPanning, isDrawing, canvas } = useSelector(
    (state: ReducersType) => state.nodeReducer
  );
  const stamp = useSelector(
    (state: ReducersType) => state.categoryReducer.subcategory.stamp
  );

  const queryClient = useQueryClient();
  const data = queryClient.getQueryData("decoration_stamp");

  useEffect(() => {
    if (Array.isArray(data)) {
      setStamps(data);
      if (canvas.stamping == "") canvas.stamping = data[stamp.index];
    }
  }, [data]);

  const stampOn = () => {
    if (Array.isArray(data)) {
      setStamps(data);
      if (canvas.stamping == "") canvas.stamping = data[stamp.index];
    }
  };

  const stampOff = () => {
    canvas.stamping = "";
  };

  useEffect(() => {
    if (canvas) {
      if (!isPanning && !isDrawing) stampOn();
      else stampOff();
    }
  }, [isPanning, isDrawing]);

  return (
    <>
      {data ? (
        stamps.map((value: string, key: number) => {
          return (
            <SelectableObjectButton
              select={stamp.index === key ? 1 : 0}
              key={`stamp_${key}`}
              onClick={() => {
                canvas.stamping = value;
                dispatch(categoryActions.stampChange(key));
              }}
            >
              <Thumbnail src={`data:image/svg+xml;utf8,${value}`} />
            </SelectableObjectButton>
          );
        })
      ) : (
        <div>로딩중</div>
      )}
    </>
  );
}
