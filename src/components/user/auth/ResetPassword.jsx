import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../../api/CallAPI";
import koiFish from "../../../assets/koi-fish.png";
import "../css/Register.css";
import UserToast from "../alert/UserToast";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { LoadingOverlay } from "@achmadk/react-loading-overlay";
import Bootstrap from "../props/Bootstrap";
import { Button } from "@mui/material";

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [param, setParam] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      UserToast("error", "Password and Confirm Password do not match");
      return;
    }
    console.log(param);
    const fullData = {
      email: param.get("email"),
      token: param.get("token"),
      password: data.password,
    };
    try {
      setIsLoading(true);
      api.post("Users/password/reset", fullData).then((data) => {
        if (data.success) {
          setIsLoading(false);
          UserToast("success", "Your password has been reset successfully");
          navigate("/login");
        } else {
          setIsLoading(false);
          UserToast("error", "Reset password failed");
        }
      }).catch((error) => {
        console.error("Register failed", error);
        setIsLoading(false);
        UserToast("error", "Reset password failed!");
      });
    } catch (error) {
      console.error("Register failed", error);
      setIsLoading(false);
      UserToast("error", "Reset password failed!");
    }
  };

  return (
    <>
      <ToastContainer />
      <Bootstrap />
      <div className="login">
        <div className="content-box">
          <div className="image-side">
            <img src={koiFish} alt="Koi Fish" className="koi-fish" />
          </div>

          <div className="form-side">
            <h1>Reset Password</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="email">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                {...register("password", { required: true })}
                className="input-field"
              />
              <label htmlFor="email">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                {...register("confirmPassword", { required: true })}
                className="input-field"
              />
              {errors.password && <span>This field is required</span>}
              <br />
              {isLoading ? (
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  className="btn"
                  disabled
                >
                  Reseting Password...
                </Button>
              ) : (
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  className="btn"
                   
                >
                  Reset Password
                </Button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
