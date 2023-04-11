import { useDispatch, useSelector } from "react-redux";
import { STAMP } from "../decorationSample";
import { SelectableObjectButton } from "../style";
import { categoryActions } from "../../../../store/common/categorySlice";
import { fabric } from "fabric-with-erasing";
import { useEffect } from "react";
import { functionChecker, functionRemover } from "../../commonFunction";

export default function Stamp() {
  const isPanning = useSelector((state: any) => state.nodeReducer.isPanning);
  const isDrawing = useSelector((state: any) => state.nodeReducer.isDrawing);
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const dispatch = useDispatch();
  const stamp = useSelector(
    (state: any) => state.categoryReducer.subcategory.stamp
  );

  const stampStep_1 = () => {
    const pointer = canvas.getPointer();
    fabric.loadSVGFromString(
      STAMP[canvas.stamping].value,
      (objects: any, options: any) => {
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
    if (canvas.stamping >= 0) stampStep_1();
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
      {STAMP.map((value: any, key: number) => {
        return (
          <SelectableObjectButton
            select={stamp.index == key ? 1 : 0}
            key={key}
            onClick={() => {
              canvas.stamping = stamp.key;
              dispatch(categoryActions.stampChange(key));
            }}
          >
            {value.name}
          </SelectableObjectButton>
        );
      })}
    </>
  );
}
