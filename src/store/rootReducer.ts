import { combineReducers } from "redux";
import categorySlice from "./common/categorySlice";
import drawSlice from "./common/drawSlice";
import nodeSlice from "./common/nodeSlice";
import zoomSlice from "./common/zoomSlice";

const rootReducer = combineReducers({
  nodeReducer: nodeSlice,
  drawReducer: drawSlice,
  categoryReducer: categorySlice,
  zoomReducer: zoomSlice,
});

export default rootReducer;
