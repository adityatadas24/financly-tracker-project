import React, { useEffect, useState } from "react";
import "./style.css";
import Switch from "react-switch";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import userImg from "../../assets/user.svg";

const Headers = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme === "dark"; // Simple check for dark theme
  });

  useEffect(() => {
    const theme = isDarkMode ? "dark" : "light";
    document.body.className = theme;
    localStorage.setItem("theme", theme); // Store as "light" or "dark"
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  function dashboard() {
    toast.error("Please LogIn or signUp");
  }

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  function logOutBtn() {
    try {
      signOut(auth)
        .then(() => {
          navigate("/");
          toast.success("Logout Successfully!");
        })
        .catch((error) => {
          toast.error(error.message); // Corrected error message handling
        });
    } catch (e) {
      toast.error(e.message); // Corrected typo
    }
  }

  return (
    <div className="navbar">
      <p className="logo">Financly.</p>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div className="theme">
          <h3 style={{ color: "#fff", marginRight: "10px" }}>Theme</h3>
          <Switch
            onChange={toggleTheme}
            checked={!isDarkMode}
            onColor="#86d3ff"
            offColor="#73fb08"
            checkedIcon={false}
            uncheckedIcon={false}
            height={15}
            width={40}
          />
        </div>

        {user ? (
          <div style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}>
            <img
              className="img-container"
              src={user.photoURL ? user.photoURL : userImg}
              style={{ width: "35px", height: "35px", borderRadius: "50%", margin: "10px", marginRight:'15px' }}
            />
            <p className="logo logout" onClick={logOutBtn}>
              Logout
            </p>
          </div>
        ) : (
          <div
            onClick={dashboard}
            className="logo dashboard"
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              marginLeft: "10px",
              fontSize: "16px",
              marginRight:'15px'
            }}
          >
            Dashboard
          </div>
        )}
      </div>
    </div>
  );
};

export default Headers;
