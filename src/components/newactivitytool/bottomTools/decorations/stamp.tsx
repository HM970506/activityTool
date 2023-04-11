import { useDispatch, useSelector } from "react-redux";
import { STAMP } from "../decorationSample";
import { SelectableObjectButton, Thumbnail } from "../style";
import { categoryActions } from "../../../../store/common/categorySlice";
import { fabric } from "fabric-with-erasing";
import { useEffect, useState } from "react";
import { functionChecker, functionRemover } from "../../commonFunction";
import { useQuery } from "react-query";
import { getStorageDataAll } from "../../../firestore/getData";

export default function Stamp() {
  const { data, isLoading } = useQuery(
    `decoration_stamp`,
    async () => {
      return await getStorageDataAll(`bottomTools/decorations/stamp`);
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
    }
  );
  const [stamps, setStamps] = useState<any[]>([]);

  useEffect(() => {
    if (!isLoading && data != undefined) {
      setStamps(data);
      if (canvas.stamping == "") canvas.stamping = data[0];
    }
  }, [isLoading]);

  const isPanning = useSelector((state: any) => state.nodeReducer.isPanning);
  const isDrawing = useSelector((state: any) => state.nodeReducer.isDrawing);
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const dispatch = useDispatch();
  const stamp = useSelector(
    (state: any) => state.categoryReducer.subcategory.stamp
  );

  const stampStep_1 = () => {
    const pointer = canvas.getPointer();
    console.log(canvas.stamping);

    //잠깐..이건 링크지 svg가 아니잖어
    fabric.loadSVGFromUrl(canvas.stamping, (objects: any, options: any) => {
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
              <Thumbnail src={value} />
            </SelectableObjectButton>
          );
        })
      )}
    </>
  );
}
