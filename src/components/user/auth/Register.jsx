import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import google from "../../../assets/google.png";
import koiFish from "../../../assets/koi-fish.png";
import home from "../../../assets/home.png";
import "../css/Register.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import UserToast from "../alert/UserToast";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      api
        .post("Users/register", data)
        .then((data) => {
          if (data.success) {
            UserToast("success", "Đăng ký thành công!");
            setIsLoading(false);
            navigate("/login");
          } else {
            setIsLoading(false);
            UserToast("error", "Đăng ký thất bại!");
          }
        })
        .catch(() => {
          setIsLoading(false);
          UserToast("error", "Đăng ký thất bại!, Email hoặc Username đã tồn tại");
        });
    } catch (error) {
      console.error("Register failed", error);
      setIsLoading(false);
      UserToast("error", "Đăng ký thất bại!");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="register">
        <a href="/" className="registerhome-icon">
          <img src={home} alt="Home" />
        </a>

        <div className="register-container">
          <div className="content-box">
            <div className="image-side">
              <img src={koiFish} alt="Koi Fish" className="koi-fish" />
            </div>

            <div className="form-side">
              <h1>Sign Up!</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email">Email/SDT</label>
                <input
                  type="text"
                  id="email"
                  placeholder="Email or Phone Number"
                  {...register("email", { required: true })}
                  className="input-field"
                />
                {errors.email && <span>This field is required</span>}

                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  {...register("username", { required: true })}
                  className="input-field"
                />
                {errors.username && <span>This field is required</span>}

                <label htmlFor="password">Password</label>
                <div className="password-wrapper">
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    {...register("password", { required: true })}
                    className="input-field"
                  />
                  {errors.password && <span>This field is required</span>}
                </div>

                {isLoading ? (
                  <button type="submit" className="signup-btn" disabled>
                    Loading...
                  </button>
                ) : (
                  <button type="submit" className="signup-btn">
                    Sign Up
                  </button>
                )}
              </form>

              <div className="social-login">
                <p className="social-text">or continue with</p>
                <div className="social-icons">
                  <button className="social-btn google-btn">
                    <img src={google} alt="Google" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
