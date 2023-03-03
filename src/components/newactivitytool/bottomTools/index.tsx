import { useSelector } from "react-redux";
import { ToolBox } from "../style";
import ToolsMenu from "./tools";

export default function BottomTools() {
  const nowCategory = useSelector(
    (state: any) => state.categoryReducer.category
  );

  return (
    <ToolBox>
      {(nowCategory === "TOOLS" || nowCategory === "TEXT") && <ToolsMenu />}
    </ToolBox>
  );
}
