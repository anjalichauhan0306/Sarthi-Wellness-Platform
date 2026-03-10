import axios from "axios";
import { serverURL } from "../App";

export const getWellness = async () => {
  const res = await axios.get(
    `${serverURL}/api/wellness/get-wellness`,
    { withCredentials: true }
  );

  return res.data;
};

export const generateWellness = async () => {
  const res = await axios.post(
    `${serverURL}/api/wellness/generate-wellness`,
    {},
    { withCredentials: true }
  );

  return res.data;
};