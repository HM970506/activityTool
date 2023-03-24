import { combineReducers } from "redux";
import categorySlice from "./common/categorySlice";
import drawSlice from "./common/drawSlice";
import nodeSlice from "./common/nodeSlice";
import historySlice from "./common/historySlice";

const rootReducer = combineReducers({
  nodeReducer: nodeSlice,
  drawReducer: drawSlice,
  categoryReducer: categorySlice,
  historyReducer: historySlice,
});

export default rootReducer;
