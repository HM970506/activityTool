import { useDispatch } from "react-redux";
import { categoryActions } from "../../../store/common/categorySlice";
import { nodeActions } from "../../../store/common/nodeSlice";
import { Button } from "../style";

export default function RecordButton() {
  const dispatch = useDispatch();

  const addNodes = () => {
    dispatch(
      nodeActions.addNodes({
        type: "RECORD",
        shapeProps: {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          width: 100,
          height: 100,
          fill: "red",
        },
      })
    );
  };

  return (
    <Button
      onClick={() => {
        dispatch(categoryActions.categoryChange("RECORD"));
      }}
    >
      녹음
    </Button>
  );
}
