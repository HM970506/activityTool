import { useDispatch, useSelector } from "react-redux";
import {
  SelectableObjectButton,
  Thumbnail,
} from "../../styles/bottomToolstyle";
import { categoryActions } from "../../../../store/common/categorySlice";
import { fabric } from "fabric-with-erasing";
import { useEffect, useState } from "react";
import { functionRemover } from "../../commonFunction";
import { useQueryClient } from "react-query";
import { ReducersType, stickerOptionType } from "../../types";

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

  const stampStep_1 = () => {
    const pointer = canvas.getPointer();
    fabric.loadSVGFromString(
      canvas.stamping,
      (objects: Object[], options: stickerOptionType) => {
        const stamp = fabric.util.groupSVGElements(objects, options);

        stamp.fill = canvas.toolColor;

        stamp.left = pointer.x;
        stamp.top = pointer.y;

        canvas.add(stamp);
        canvas.renderAll();
      }
    );
  };
  const stampDown = () => {
    if (canvas.stamping !== "") stampStep_1();
  };

  const stampOn = () => {
    canvas.on({ "mouse:down": stampDown });
  };

  const stampOff = (canvas: any) => {
    canvas.__eventListeners["mouse:down"] = functionRemover(
      canvas.__eventListeners["mouse:down"],
      stampDown.name
    );
  };

  useEffect(() => {
    if (canvas) {
      if (!isPanning && !isDrawing) stampOn();
      else stampOff(canvas);
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
