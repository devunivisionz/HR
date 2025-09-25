import React, { useState, useEffect } from "react";
import AuthLayout from "../../../Routes/Layout/PublicLayout";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, loginActionReset } from "../../../Redux/auth/action";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../Components/Toaster/ToasterServices";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const loginReducer = useSelector((state) => state?.loginReducer);
  console.log(loginReducer?.loading);
  const onSubmit = (data) => {
    dispatch(loginAction(data));
  };

  useEffect(() => {
    const loginUser = loginReducer?.data;
    if (loginUser?.status || loginUser?.error) {
      if (loginUser?.status === 200) {
        navigate("/candidates");
        localStorage.setItem("token", loginUser?.data?.token);
        showSuccessToast("Logging In...");
      } else {
        showErrorToast(loginUser?.error);
      }
      dispatch(loginActionReset());
    }
  }, [loginReducer]);

  return (
    <>
      <div className="form-header">
        <h2>Welcome to dashboard</h2>
      </div>

      <form style={{ width: "65%" }} onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Enter a valid email",
              },
            })}
            placeholder="Email Address"
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className="form-group password-group">
          <label htmlFor="password">Password</label>
          <div className="password-input">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              placeholder="Password"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={16} style={{ color: "#4D007D" }} />
              ) : (
                <Eye size={16} style={{ color: "#4D007D" }} />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </div>

        <label className="">Forgot Password ?</label>
        <br />

        <button
          type="submit"
          className="register-btn"
          style={{
            marginTop: "10px",
            backgroundColor: isValid ? "#4D007D" : "#ccc",
            cursor: isValid ? "pointer" : "not-allowed",
            color: "#fff",
          }}
          disabled={!isValid || loginReducer?.loading}
        >
          {loginReducer?.loading ? <Loader /> : "Login"}
        </button>
      </form>

      <div className="login-link">
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </>
  );
};

export default Login;
