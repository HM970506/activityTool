import { combineReducers } from "redux";
import categorySlice from "./common/categorySlice";
import drawSlice from "./common/drawSlice";
import nodeSlice from "./common/nodeSlice";

const rootReducer = combineReducers({
  nodeReducer: nodeSlice,
  drawReducer: drawSlice,
  categoryReducer: categorySlice,
});

export default rootReducer;
