import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice.js";
import shlokSlice from "./shlokSlice.js";
import wellnessSlice from "./wellnessSlice.js";
import activitySlice from "./activitySlice.js";
//import chatSlice from "./chatSlice.js";

export const store = configureStore({
  reducer: {
    user: userSlice,
    shlok: shlokSlice,
    wellness: wellnessSlice,
    activity: activitySlice,
   // chat: chatSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["shlok/fetchDaily/fulfilled"],
        ignoredPaths: ["shlok.lastFetched", "wellness.lastGenerated"],
      },
    }),
});

export default store;