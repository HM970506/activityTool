import { combineReducers } from "redux";
import categorySlice from "./common/categorySlice";
import drawSlice from "./common/drawSlice";
import nodeSlice from "./common/nodeSlice";
import zoomSlice from "./common/zoomSlice";
import photoEditorSlice from "./common/photoEditorSlice";

const rootReducer = combineReducers({
  nodeReducer: nodeSlice,
  drawReducer: drawSlice,
  categoryReducer: categorySlice,
  zoomReducer: zoomSlice,
  photoEditorReducer: photoEditorSlice,
});

export default rootReducer;
