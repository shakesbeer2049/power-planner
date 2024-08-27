import { GiFalconMoon } from "react-icons/gi";
import "../styles/home.css";
import { useRef, useContext } from "react";
import AuthContext from "../context/AuthContext";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

const Home = () => {
  const { setUserDetails, userDetails } = useContext(AuthContext);

  return (
    <div className="home">
      <div className="nav-container flex">
        <div className="navbar bg-base-100 justify-between">
          <a className="btn btn-ghost text-xl">
            <GiFalconMoon className="text-2xl" /> Consistent
          </a>
          {userDetails?.loggedIn ? (
            <div>{userDetails.username} is logged in</div>
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
