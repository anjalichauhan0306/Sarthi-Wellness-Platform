import axios from "axios";
import { serverURL } from "../App";

export const logActivityApi = async (activityType, contentId) => {
  const response = await axios.post(
    `${serverURL}/api/activity/log`,
    {
      activityType,
      contentId,
    },
    { withCredentials: true }
  );

  return response.data;
};


export const getActivityStats = async () => {
  const response = await axios.get(
    `${serverURL}/api/activity/stats`,
    { withCredentials: true }
  );

  return response.data;
};