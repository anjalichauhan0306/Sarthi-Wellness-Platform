import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "User",
    initialState :{
        userData : null
    },
    reducers : {
        setUserData :(state,action)=>{
            state.userData = action.payload
        }
    }
})

export const {setUserData} = userSlice.actions
export default userSlice.reducer

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// // ============ ASYNC THUNKS ============

// /**
//  * Register user
//  */
// export const registerUser = createAsyncThunk(
//   "user/register",
//   async ({ username, email, password }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_URL}/user/register`, {
//         username,
//         email,
//         password,
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Registration failed");
//     }
//   }
// );

// /**
//  * Login user
//  */
// export const loginUser = createAsyncThunk(
//   "user/login",
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_URL}/user/login`, {
//         email,
//         password,
//       }, {
//         withCredentials: true, // Send cookies
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Login failed");
//     }
//   }
// );

// /**
//  * Get user profile
//  */
// export const getProfile = createAsyncThunk(
//   "user/getProfile",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${API_URL}/user/profile`, {
//         withCredentials: true,
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Failed to load profile");
//     }
//   }
// );

// /**
//  * Check if user is authenticated
//  */
// export const checkAuth = createAsyncThunk(
//   "user/checkAuth",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${API_URL}/user/checkauth`, {
//         withCredentials: true,
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(false);
//     }
//   }
// );

// /**
//  * Update user profile
//  */
// export const updateProfile = createAsyncThunk(
//   "user/updateProfile",
//   async (profileData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_URL}/user/updateprofile`, profileData, {
//         withCredentials: true,
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Profile update failed");
//     }
//   }
// );

// /**
//  * Logout user
//  */
// export const logoutUser = createAsyncThunk(
//   "user/logout",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_URL}/user/logout`, {}, {
//         withCredentials: true,
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Logout failed");
//     }
//   }
// );

// // ============ SLICE ============

// const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     userData: null,
//     isAuthenticated: false,
//     loading: false,
//     error: null,
//     successMessage: null,
//   },
//   reducers: {
//     // Clear error message
//     clearError: (state) => {
//       state.error = null;
//     },
//     // Clear success message
//     clearSuccess: (state) => {
//       state.successMessage = null;
//     },
//     // Reset user state
//     resetUserState: (state) => {
//       state.userData = null;
//       state.isAuthenticated = false;
//       state.error = null;
//       state.successMessage = null;
//     },
//   },
//   extraReducers: (builder) => {
//     // Register User
//     builder
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.successMessage = action.payload.message;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });

//     // Login User
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.userData = {
//           _id: action.payload._id,
//           username: action.payload.username,
//           email: action.payload.email,
//         };
//         state.isAuthenticated = true;
//         state.successMessage = action.payload.message;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.isAuthenticated = false;
//       });

//     // Get Profile
//     builder
//       .addCase(getProfile.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getProfile.fulfilled, (state, action) => {
//         state.loading = false;
//         state.userData = action.payload;
//         state.isAuthenticated = true;
//       })
//       .addCase(getProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.isAuthenticated = false;
//       });

//     // Check Auth
//     builder
//       .addCase(checkAuth.fulfilled, (state, action) => {
//         state.isAuthenticated = action.payload === true;
//       })
//       .addCase(checkAuth.rejected, (state) => {
//         state.isAuthenticated = false;
//       });

//     // Update Profile
//     builder
//       .addCase(updateProfile.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateProfile.fulfilled, (state, action) => {
//         state.loading = false;
//         state.userData = action.payload;
//         state.successMessage = "Profile updated successfully";
//       })
//       .addCase(updateProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });

//     // Logout User
//     builder
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.userData = null;
//         state.isAuthenticated = false;
//         state.successMessage = "Logged out successfully";
//       })
//       .addCase(logoutUser.rejected, (state) => {
//         state.isAuthenticated = false;
//       });
//   },
// });

// export const { clearError, clearSuccess, resetUserState } = userSlice.actions;
// export default userSlice.reducer;