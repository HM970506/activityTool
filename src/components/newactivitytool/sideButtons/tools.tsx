import { useDispatch } from "react-redux";
import { categoryActions } from "../../../store/common/categorySlice";
import { Button } from "../style";

export default function ToolsButton() {
  const dispatch = useDispatch();

  return (
    <Button
      onClick={() => {
        dispatch(categoryActions.categoryChange("TOOLS"));
      }}
    >
      도구
    </Button>
  );
}
