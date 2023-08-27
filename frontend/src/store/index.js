import { configureStore } from "@reduxjs/toolkit";
import blogSlice from "./slices/blogSlices";

const store = configureStore({
  reducer: {
    blog: blogSlice.reducer,
  },
});

export { store };
