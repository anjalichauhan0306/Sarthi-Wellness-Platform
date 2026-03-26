import { useEffect } from "react";
import { serverURL } from "../App";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUserData } from "../redux/userSlice.js";
import { useNavigate } from "react-router-dom";

const GetCurrentUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
 return useEffect(() => {

    const fetchUser = async () => {
      try {
        const result = await axios.get(serverURL + "/api/user/profile", {
          withCredentials: true,
        });
        dispatch(setUserData(result.data));
        console.log(result.data);
        if(result.data?.isAdmin){
          navigate("/admin");
        }
      } catch (error) {
        dispatch(setUserData(null));
      }
    };
    fetchUser();
  }, []);
};

export default GetCurrentUser;
