import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "@/context/userContext";
import axios from "axios";

const AuthSuccess = () => {
  const navigate = useNavigate();
  const { setUser } = getData();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("accessToken", token);
        axios.get("http://localhost:8000/auth/me", {

          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.data.success) {
            setUser(res.data.user);
            navigate("/"); // redirect to home
          }
        })
        .catch(() => {
          localStorage.removeItem("accessToken");
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, []);

  return <div>Logging in...</div>;
};

export default AuthSuccess;
