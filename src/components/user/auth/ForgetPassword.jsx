import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import koiFish from "../../../assets/koi-fish.png";
import "../css/Register.css";
import { Button } from "@mui/material";
import {LoadingOverlay} from "@achmadk/react-loading-overlay";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import UserToast from "../alert/UserToast";

export default function ForgetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const fullData = {
      email: data.email,
      clientUri: window.location.origin + "/ResetPassword",
    };
    try {
      setIsLoading(true);
      api.post("Users/password/forget", fullData).then((data) => {
        if (data.success) {
          setIsLoading(false);
          UserToast("success", "Check your email to reset password");
        } else {
          setIsLoading(false);
          UserToast("error", "Reset password failed");
        }
      });
    } catch (error) {
      console.error("Register failed", error);
      setIsLoading(false);
      UserToast("error", "Reset password failed, please check your email");
    }
  };

  return (
    <>
      {" "}
      <LoadingOverlay active={isLoading} spinner text="Resting Password....">
        <ToastContainer />
        <div className="container">
          <div className="content-box">
            <div className="image-side">
              <img src={koiFish} alt="Koi Fish" className="koi-fish" />
            </div>

            <div className="form-side">
              <h1>Forget Password</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email">Email/SDT</label>
                <input
                  type="text"
                  id="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                  className="input-field"
                />
                {errors.email && <span>This field is required</span>}
                <Button type="submit" className="btn">
                  Reset Password
                </Button>
              </form>
            </div>
          </div>
        </div>
      </LoadingOverlay>
    </>
  );
}
