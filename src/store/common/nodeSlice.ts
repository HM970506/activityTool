import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const nodeSlice = createSlice({
  name: "nodeReducer",
  initialState: { nodes: new Array() },

  reducers: {
    addNodes: (state, action: PayloadAction<any>) => {
      state.nodes.push(action.payload);
    },

    modifyNodes: (state, action: PayloadAction<any>) => {
      state.nodes[parseInt(action.payload.index)].shapeProps = {
        ...state.nodes[parseInt(action.payload.index)].shapeProps, //수정할 노드의 인덱스
        ...action.payload.modifyProps, //수정할 내용
      };
      console.log(JSON.stringify(state.nodes[parseInt(action.payload.index)]));
    },

    removeNodes: (state, action: PayloadAction<any>) => {
      state.nodes = [
        ...state.nodes.slice(0, action.payload),
        ...state.nodes.slice(action.payload + 1, state.nodes.length),
      ];
    },
  },
});

export const nodeActions = nodeSlice.actions;
export default nodeSlice.reducer;
