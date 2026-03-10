import axios from "axios";
import { serverURL } from "../App";

export const loginUser = async (values) => {
  const response = await axios.post(
    `${serverURL}/api/user/login`,
    values,
    { withCredentials: true }
  );

  return response.data;
};

export const registerUser = async (values) => {
  const response = await axios.post(
    `${serverURL}/api/user/register`,
    values
  );

  return response.data;
};

export const updateUserProfile = async (payload) => {
  const response = await axios.post(
    `${serverURL}/api/user/updateprofile`,
    payload,
    { withCredentials: true }
  );

  return response.data;
};