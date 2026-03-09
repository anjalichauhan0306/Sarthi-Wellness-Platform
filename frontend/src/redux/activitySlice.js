import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// ============ ASYNC THUNKS ============

/**
 * Log activity and mood
 */
export const logActivity = createAsyncThunk(
  "activity/log",
  async (activityData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/activity/log`, activityData, {
        withCredentials: true,
      });
      return response.data.activity;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to log activity");
    }
  }
);

/**
 * Get today's activity
 */
export const getTodayActivity = createAsyncThunk(
  "activity/getToday",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/activity/today`, {
        withCredentials: true,
      });
      return response.data.activity;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "No activity logged for today");
    }
  }
);

/**
 * Get activity history
 */
export const getActivityHistory = createAsyncThunk(
  "activity/getHistory",
  async ({ startDate, endDate }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/activity/history?startDate=${startDate}&endDate=${endDate}`,
        { withCredentials: true }
      );
      return response.data.activities;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch history");
    }
  }
);

/**
 * Get weekly stats
 */
export const getWeeklyStats = createAsyncThunk(
  "activity/getStats",
  async (weeks = 4, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/activity/weekly-stats?weeks=${weeks}`, {
        withCredentials: true,
      });
      return response.data.stats;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch stats");
    }
  }
);

/**
 * Get mood trend
 */
export const getMoodTrend = createAsyncThunk(
  "activity/getMoodTrend",
  async (days = 7, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/activity/mood-trend?days=${days}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch mood trend");
    }
  }
);

// ============ SLICE ============

const activitySlice = createSlice({
  name: "activity",
  initialState: {
    todayActivity: null,
    activityHistory: [],
    weeklyStats: null,
    moodTrend: null,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    // Clear error
    clearActivityError: (state) => {
      state.error = null;
    },
    // Clear success message
    clearActivitySuccess: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    // Log Activity
    builder
      .addCase(logActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.todayActivity = action.payload;
        state.successMessage = "Activity logged successfully!";
      })
      .addCase(logActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get Today Activity
    builder
      .addCase(getTodayActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTodayActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.todayActivity = action.payload;
      })
      .addCase(getTodayActivity.rejected, (state, action) => {
        state.loading = false;
        state.todayActivity = null;
      });

    // Get Activity History
    builder
      .addCase(getActivityHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getActivityHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.activityHistory = action.payload;
      })
      .addCase(getActivityHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get Weekly Stats
    builder
      .addCase(getWeeklyStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWeeklyStats.fulfilled, (state, action) => {
        state.loading = false;
        state.weeklyStats = action.payload;
      })
      .addCase(getWeeklyStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get Mood Trend
    builder
      .addCase(getMoodTrend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMoodTrend.fulfilled, (state, action) => {
        state.loading = false;
        state.moodTrend = action.payload;
      })
      .addCase(getMoodTrend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearActivityError, clearActivitySuccess } = activitySlice.actions;
export default activitySlice.reducer;