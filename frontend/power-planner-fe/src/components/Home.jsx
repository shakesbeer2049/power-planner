import { GiFalconMoon } from "react-icons/gi";
import "../styles/home.css";
import { useRef, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { jwtDecode } from "jwt-decode";
import { callApi } from "../utils/callApi";
import { Link } from "react-router-dom";

const Home = () => {
  const { setUserDetails, userDetails, handleLogout } = useContext(AuthContext);
  console.log(userDetails);

  useEffect(() => {
    (async () => {
      const jwt = localStorage.getItem("token");
      let userId = "";

      if (jwt) {
        userId = jwtDecode(jwt).id;
        if (userId) {
          const verifyUser = await callApi("/home", "GET", {}, jwt);
          if (verifyUser.status === "success") {
            setUserDetails(verifyUser.data);
          }
        }
      }
    })();
  }, []);

  return (
    <div className="home">
      <div className="nav-container flex">
        <div className="navbar bg-base-100 justify-between">
          <a className="btn btn-ghost text-xl">
            <GiFalconMoon className="text-2xl" /> Consistent
          </a>
          {userDetails?.username ? (
            <div className="logged-in">
              <button className="btn btn-info mr-2" onClick={handleLogout}>
                Logout
              </button>
              <button className="btn btn-success mr-2">
                <Link to="/tasks/daily">Tasks</Link>
              </button>
            </div>
          ) : (
            <div className="home-buttons flex justify-between ">
              <div className="login-modal">
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <button
                  className="btn"
                  onClick={() =>
                    document.getElementById("login-modal").showModal()
                  }
                >
                  Login
                </button>
                {/* Login Comp */}
                <LoginForm />
              </div>
              <div className="signup-modal">
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <button
                  className="btn"
                  onClick={() =>
                    document.getElementById("sign-up-modal").showModal()
                  }
                >
                  Sign Up
                </button>
                <SignupForm />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="banner-container">
        <img
          src="dist/images/banner.jpg"
          alt=""
          srcset=""
          className="landing-image"
        />
        <h2 className="heading">
          Motivation is temporary; <br /> Discipline is permanent.
        </h2>
      </div>
    </div>
  );
};

export default Home;
