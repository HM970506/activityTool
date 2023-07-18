import { combineReducers } from "redux";
import categorySlice from "./common/categorySlice";
import nodeSlice from "./common/nodeSlice";
import zoomSlice from "./common/zoomSlice";
import photoEditorSlice from "./common/photoEditorSlice";
import drawSlice from "./common/drawSlice";
import firestoreSlice from "./common/firestoreSlice";

const rootReducer = combineReducers({
  nodeReducer: nodeSlice,
  categoryReducer: categorySlice,
  zoomReducer: zoomSlice,
  photoEditorReducer: photoEditorSlice,
  drawReducer: drawSlice,
  firestoreReducer: firestoreSlice,
});

export default rootReducer;
