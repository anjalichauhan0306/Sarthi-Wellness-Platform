import { useEffect } from "react";
import { serverURL } from "../App";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setActivityData } from "../redux/activitySlice";

const GetUserActivity = () => {
  const dispatch = useDispatch();
 
 return useEffect(() => {
    const fetchActivity = async () => {
      try {
        const result = await axios.get(serverURL + "/api/activity/today", {
          withCredentials: true,
        });
        dispatch(setActivityData(result.data));
      } catch (error) {
        dispatch(setActivityData(null));
      }
    };
    fetchActivity();
  }, []);
};

export default GetUserActivity;
