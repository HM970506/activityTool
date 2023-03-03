import { combineReducers } from "redux";
import categorySlice from "./common/categorySlice";
import drawSlice from "./common/drawSlice";
import nodeSlice from "./common/nodeSlice";
import selectSlice from "./common/selectSlice";

const rootReducer = combineReducers({
  nodeReducer: nodeSlice,
  drawReducer: drawSlice,
  categoryReducer: categorySlice,
  selectReducer: selectSlice,
});

export default rootReducer;
