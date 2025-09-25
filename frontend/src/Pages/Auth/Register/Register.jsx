import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader } from "lucide-react";
import "./Register.css";
import AuthLayout from "../../../Routes/Layout/PublicLayout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginAction,
  loginActionReset,
  registerAction,
  registerActionReset,
} from "../../../Redux/auth/action";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../Components/Toaster/ToasterServices";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const dispatch = useDispatch();
  const registerReducer = useSelector((state) => state?.registerReducer);
  const loginReducer = useSelector((state) => state?.loginReducer);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(registerAction({ ...data, role: "hr" }));
  };

  const emailWatch = watch("email");
  const emailPassword = watch("password");
  const password = watch("password");

  useEffect(() => {
    const registerUser = registerReducer?.data;
    if (registerUser?.status || registerUser?.error) {
      if (registerUser?.status == 201) {
        showSuccessToast("User Successfully Created");
        dispatch(
          loginAction({
            email: emailWatch,
            password: emailPassword,
          })
        );
      } else {
        showErrorToast(registerUser?.error);
        dispatch(registerActionReset());
      }
    }
  }, [registerReducer]);

  useEffect(() => {
    const loginUser = loginReducer?.data;
    if (loginUser?.status || loginUser?.error) {
      if (loginUser?.status == 200) {
        dispatch(registerActionReset());
        localStorage?.setItem("token", loginUser?.data?.token);
        navigate("/candidates");
      } else {
        showErrorToast(loginUser?.error);
        dispatch(registerActionReset());
      }
      dispatch(loginActionReset());
    }
  }, [loginReducer]);

  return (
    <>
      <div className="form-header">
        <h2>Welcome to dashboard</h2>
      </div>

      <form
        style={{ width: "65%" }}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            {...register("name", { required: "Full name is required" })}
            placeholder="Full Name"
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

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

        <div className="form-group password-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="password-input">
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              placeholder="Confirm Password"
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
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="register-btn"
          disabled={
            !isValid || registerReducer?.loading || loginReducer?.loading
          }
          style={{
            backgroundColor:
              !isValid || registerReducer?.loading || loginReducer?.loading
                ? "#ccc"
                : "#4D007D",
            cursor:
              !isValid || registerReducer?.loading || loginReducer?.loading
                ? "not-allowed"
                : "pointer",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {registerReducer?.loading ? (
            <Loader size={16} className="loader-spin" />
          ) : loginReducer?.loading ? (
            "Logging in..."
          ) : (
            "Register"
          )}
        </button>
      </form>

      <div className="login-link">
        <p>
          Already have an account? <Link to={`/login`}>Login here</Link>
        </p>
      </div>
    </>
  );
};

export default Register;
