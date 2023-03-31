import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fabric } from "fabric-with-erasing";
import { categoryActions } from "../../../store/common/categorySlice";
import { Button } from "../style";
import { DECORATION } from "../types";

export default function DecorationButton() {
  const dispatch = useDispatch();
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);
  const draws = useSelector((state: any) => state.drawReducer);
  const { tape } = useSelector(
    (state: any) => state.categoryReducer.subcategory
  );

  useEffect(() => {
    if (canvas) {
      canvas.on("mouse:down", () => {
        if (tape.state) {
          const pointer = canvas.getPointer();
          const points = [pointer.x, pointer.y, pointer.x, pointer.y];

          const line = new fabric.Line(points, {
            strokeWidth: 30,
            stroke: draws.color,
            originX: "center",
            originY: "center",
            strokeDashArray: [10],
          });
          canvas.add(line);
          canvas.taping = true;
        }
      });

      canvas.on("mouse:move", () => {
        if (canvas.taping) {
          const pointer = canvas.getPointer();
          canvas.getObjects()[canvas.getObjects().length - 1].set({
            x2: pointer.x,
            y2: pointer.y,
          });

          canvas.renderAll();
        }
      });
      canvas.on("mouse:up", () => {
        if (canvas.taping) {
          canvas.getObjects()[canvas.getObjects().length - 1].setCoords();
          canvas.renderAll();
          canvas.taping = false;
        }
      });
    }
  }, [canvas]);

  const photoButtonClick = () => {
    dispatch(categoryActions.categoryChange(DECORATION));
  };

  return <Button onClick={photoButtonClick}>꾸미기</Button>;
}
