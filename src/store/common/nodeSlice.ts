import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const nodeSlice = createSlice({
  name: "nodeReducer",
  initialState: { canvas: "", nodes: new Array() },

  reducers: {
    setCanvas: (state, action: PayloadAction<any>) => {
      state.canvas = action.payload;
    },
    addNodes: (state, action: PayloadAction<any>) => {
      state.nodes.push(action.payload);
      console.log(JSON.stringify(state.nodes));
    },

    modifyNodes: (state, action: PayloadAction<any>) => {
      state.nodes[parseInt(action.payload.index)].shapeProps = {
        ...state.nodes[parseInt(action.payload.index)].shapeProps, //수정할 노드의 인덱스
        ...action.payload.modifyProps, //수정할 내용
      };
      console.log(JSON.stringify(state.nodes));
    },

    removeNodes: (state, action: PayloadAction<any>) => {
      state.nodes = [
        ...state.nodes.slice(0, action.payload),
        ...state.nodes.slice(action.payload + 1, state.nodes.length),
      ];
    },
    selectNodes: (state, action: PayloadAction<any>) => {
      state.nodes = [
        state.nodes[action.payload],
        ...state.nodes.slice(0, action.payload),
        ...state.nodes.slice(action.payload + 1, state.nodes.length),
      ];
      //  console.log("0번노드:", state.nodes);
    },
  },
});

export const nodeActions = nodeSlice.actions;
export default nodeSlice.reducer;
