import DrawToolsButton from "./drawTools";

import { DownButtonsContainer_MobilenDesktop } from "../style";
import { useSelector } from "react-redux";
import { ReducersType } from "../types";

export default function DownButtons() {
  const view = useSelector((state: ReducersType) => state.categoryReducer.view);

  return (
    <DownButtonsContainer_MobilenDesktop state={view ? 1 : 0}>
      <DrawToolsButton />
    </DownButtonsContainer_MobilenDesktop>
  );
}
