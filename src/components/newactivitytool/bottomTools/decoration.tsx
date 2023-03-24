import { BottomButton, ButtonBox } from "../style";
import { fabric } from "fabric";
import { useSelector } from "react-redux";

export default function DecorationMenu() {
  const canvas = useSelector((state: any) => state.nodeReducer.canvas);

  const stamping = () => {
    const pointer = canvas.getPointer();

    fabric.loadSVGFromUrl("./stamp.svg", (objects: any, options: any) => {
      const stamp = fabric.util.groupSVGElements(objects, options);
      stamp.x = pointer.x;
      stamp.y = pointer.y;
      canvas.add(stamp);
      canvas.calcOffset();
      canvas.renderAll();
    });
  };

  const taping = () => {
    const pointer = canvas.getPointer();
  };

  return (
    <>
      <BottomButton onClick={stamping}>도장</BottomButton>
      <BottomButton onClick={taping}>마스킹테이프</BottomButton>
    </>
  );
}
