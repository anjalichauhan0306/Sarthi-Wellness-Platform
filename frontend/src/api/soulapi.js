import axios from "axios";
import { serverURL } from "../App";

export const getDailyShlok = async () => {
  const response = await axios.post(
    `${serverURL}/api/soul/today`,
    {},
    { withCredentials: true }
  );

  return response.data;
};
