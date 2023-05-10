import { combineReducers } from "redux";
import categorySlice from "./common/categorySlice";
import nodeSlice from "./common/nodeSlice";
import zoomSlice from "./common/zoomSlice";
import photoEditorSlice from "./common/photoEditorSlice";
import drawSlice from "./common/drawSlice";

const rootReducer = combineReducers({
  nodeReducer: nodeSlice,
  categoryReducer: categorySlice,
  zoomReducer: zoomSlice,
  photoEditorReducer: photoEditorSlice,
  drawReducer: drawSlice,
});

export default rootReducer;
