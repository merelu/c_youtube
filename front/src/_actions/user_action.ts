import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ILoginBodyData {
  email: string;
  password: string;
}

interface IRegisterBodyData {
  email: string;
  name: string;
  password: string;
  image: string;
}

export const logInUser = createAsyncThunk(
  "users/login",
  async (body: ILoginBodyData, thunkApi) => {
    try {
      const response = await axios.post("/api/users/login", body);
      return await response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const logOutUser = createAsyncThunk("users/logout", async () => {
  const response = await axios.get("/api/users/logout");
  return response.data;
});

export const registerUser = createAsyncThunk(
  "users/register",
  async (body: IRegisterBodyData, thunkApi) => {
    try {
      const response = await axios.post("/api/users/register", body);
      return await response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const authUser = createAsyncThunk("users/auth", async () => {
  const response = await axios.get("/api/users/auth");
  return response.data;
});
