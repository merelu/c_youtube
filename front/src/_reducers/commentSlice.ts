import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IComment } from "@typings/db";

export const commentSlice = createSlice({
  name: "comments",
  initialState: [] as IComment[],
  reducers: {
    fetchComment(state, action: PayloadAction<IComment[]>) {
      return action.payload;
    },
    addComment(state, action: PayloadAction<IComment[]>) {
      state.push(...action.payload);
    },
  },
});
