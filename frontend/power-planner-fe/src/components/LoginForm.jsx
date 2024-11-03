import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { callApi } from "../utils/callApi";
import AuthContext from "../context/AuthContext";
import { IoEyeOutline } from "react-icons/io5";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUserDetails, userDetails } = useContext(AuthContext);
  const [showPwd, setShowPwd] = useState(false);
  const emailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();

  const handleLogin = async (data) => {
    try {
      const response = await callApi("/users/login", "POST", data);
      // console.log("login response", response)
      if (response.status === "success") {
        setUserDetails(response.data);
        localStorage.setItem("token", response.token);
        navigate("/tasks/daily");
      }

      if (response.status === "fail") {
        setError("root", {
          message: "Invalid credentials!",
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <dialog id="login-modal" className="modal modal-middle ">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Login</h3>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="login-details flex flex-col ">
            <label className="input input-bordered flex items-center gap-2 mb-4 mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                name="email"
                type="text"
                className="grow"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  validate: (value) => {
                    if (!emailRegex.test(value)) return "Invalid email";
                  },
                })}
              />
            </label>
            {errors.email && (
              <div className="text-red-500">{errors.email.message}</div>
            )}
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type={`${showPwd ? "text" : "password"}`}
                className="grow"
                placeholder="Password"
                {...register("password", {
                  required: "Enter your password",
                })}
              />
              <span
                onClick={() => {
                  setShowPwd(!showPwd);
                }}
              >
                <IoEyeOutline />
              </span>
            </label>
            {errors.password && (
              <div className="text-red-500">{errors.password.message}</div>
            )}
          </div>
          <button
            className="btn btn-success login-btn"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "hang on..." : "Login"}
          </button>
          {errors.root && (
            <div className="text-red-500">{errors.root.message}</div>
          )}
        </form>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default LoginForm;
