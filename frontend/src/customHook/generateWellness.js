import { useEffect } from "react";
import { serverURL } from "../App";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setWellnessData } from "../redux/wellnessSlice.js";

const GenerateWellness = () => {
  const dispatch = useDispatch();
 
return useEffect(() => {
  const fetchWellness = async () => {
      try {
        const result = await axios.post(serverURL + "/api/wellness/generate-wellness", {
          withCredentials: true,
        });
        dispatch(setWellnessData(result.data));
      } catch (error) {
        console.log(error)
        dispatch(setWellnessData(null));
      }
    };
    fetchWellness();
  }, []);
};

export default GenerateWellness;
