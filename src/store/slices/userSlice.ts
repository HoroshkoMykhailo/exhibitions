import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { Axios } from "axios";
import { fetchUser, loginUser, registerUser } from "~/api/userActions";
import { DataStatus } from "~/constants/constants";
import { loginUserResponse, registerUserResponse, User, UserRequest } from "~/types/types";
import { ValueOf } from "~/utils/utils";

export const register = createAsyncThunk(
  "user/register",
  async ({ username, password }: UserRequest, { rejectWithValue }) => {
    try {
      return await registerUser(username, password);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw rejectWithValue(
          error.response?.data?.message || "Error occurred during registration"
        );
      }
    }
  }
);

export const login = createAsyncThunk('user/login', async ({ username, password }: UserRequest) => {
    return await loginUser(username, password);
});

export const fetch = createAsyncThunk('user/fetch', async () => {
    return await fetchUser();
});


interface UserState {
    user: User | null;
    dataStatus: ValueOf<typeof DataStatus>;
    isAdmin: boolean;
    isAuthenticated: boolean;
    message: string;
}

const getInitialState = async () => {
  const token = localStorage.getItem('token');
  let error: string = '';
  if (token) {
    try{
      const user = await fetchUser();
      return {
          user: user,
          dataStatus: DataStatus.FULFILLED,
          isAdmin: false,
          isAuthenticated: true,
          message: error,
      };
    }
    catch(error: any) {
      localStorage.removeItem('token');
      error = error.message as string;
    }
  }

  return {
      user: null,
      dataStatus: DataStatus.IDLE,
      isAdmin: false,
      isAuthenticated: false,
      message: error,
  };
}

const initialState: UserState = await getInitialState();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.dataStatus = DataStatus.IDLE;
      state.user = null;
      state.isAdmin = false;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.dataStatus = DataStatus.PENDING;
      })
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<registerUserResponse | undefined>) => {
          if (action.payload) {
            state.dataStatus = DataStatus.FULFILLED;
            state.user = {
              id: action.payload.id || 0,
              username: action.payload.username || "",
            };
            state.isAdmin = action.payload.isAdmin || false;
            state.message = "Registration successful";
          }
        }
      )
      .addCase(register.rejected, (state, action) => {
        state.dataStatus = DataStatus.REJECTED;
        state.message = action.payload as string;
      })
      .addCase(login.pending, (state) => {
        state.dataStatus = DataStatus.PENDING;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<loginUserResponse>) => {
          state.dataStatus = DataStatus.FULFILLED;
          state.user = {
            id: action.payload.userId,
            username: action.payload.userName,
          };
          localStorage.setItem("token", action.payload.access_token);
          state.isAuthenticated = true;
        }
      )
      .addCase(login.rejected, (state) => {
        state.dataStatus = DataStatus.REJECTED;
        state.message = 'Incorrect username or password';
      })
      .addCase(fetch.pending, (state) => {
        state.dataStatus = DataStatus.PENDING;
      })
      .addCase(fetch.fulfilled, (state, action: PayloadAction<User>) => {
        state.dataStatus = DataStatus.FULFILLED;
        state.user = {
          id: action.payload.id,
          username: action.payload.username,
        };
        state.isAuthenticated = true;
      })
      .addCase(fetch.rejected, (state) => {
        state.dataStatus = DataStatus.REJECTED;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;