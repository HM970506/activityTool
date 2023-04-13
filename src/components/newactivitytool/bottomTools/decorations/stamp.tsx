import { useDispatch, useSelector } from "react-redux";
import { SelectableObjectButton, Thumbnail } from "../style";
import { categoryActions } from "../../../../store/common/categorySlice";
import { fabric } from "fabric-with-erasing";
import { useEffect, useState } from "react";
import { functionRemover } from "../../commonFunction";
import { useQuery } from "react-query";
import { getFirestoreData } from "../../../firestore/getData";

export default function Stamp() {
  const dispatch = useDispatch();
  const [stamps, setStamps] = useState<string[]>([]);
  const { isPanning, isDrawing, canvas } = useSelector(
    (state: any) => state.nodeReducer
  );
  const stamp = useSelector(
    (state: any) => state.categoryReducer.subcategory.stamp
  );

  const { data, isLoading } = useQuery(
    `decoration_stamp`,
    async () => {
      return await getFirestoreData("menu", "decoration");
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (!isLoading && data != undefined) {
      console.log(data.stamp);
      setStamps(data.stamp);
      if (canvas.stamping == "") canvas.stamping = data.stamp[0];
    }
  }, [isLoading]);

  const stampStep_1 = () => {
    const pointer = canvas.getPointer();
    fabric.loadSVGFromString(canvas.stamping, (objects: any, options: any) => {
      const stamp = fabric.util.groupSVGElements(objects, options);

      stamp.fill = canvas.toolColor;

      stamp.left = pointer.x;
      stamp.top = pointer.y;

      canvas.add(stamp);
      canvas.renderAll();
    });
  };

  const stampDown = () => {
    if (canvas.stamping != "") stampStep_1();
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
      {isLoading ? (
        <div>로딩중</div>
      ) : (
        stamps.map((value: string, key: number) => {
          return (
            <SelectableObjectButton
              select={stamp.index == key ? 1 : 0}
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
      )}
    </>
  );
}
function getFireStroeData(arg0: string, arg1: string): any {
  throw new Error("Function not implemented.");
}
