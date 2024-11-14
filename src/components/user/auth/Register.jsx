import { set, useForm } from "react-hook-form";
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
import ComponentPath from "../../../routes/ComponentPath";

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
    })
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)

    const checkPassword = (password, confirmPassword) => {
        return password === confirmPassword
    }

  const onSubmit = async (data) => {
      try {
          setIsLoading(true)
          if (!checkPassword(data.password, data.confirmPassword)) {
              setIsLoading(false)
              UserToast("error", "Mật khẩu không khớp!")
              return
          }
          api.post("Users/register", data)
              .then((data) => {
                  if (data.success) {
                      UserToast(
                          "success",
                          "Đăng ký thành công! Vuilong kiểm tra email để xác nhận tài khoản"
                      )
                      setIsLoading(false)
                      setTimeout(() => {
                          navigate("/login")
                      }, 3000)
                  } else {
                      setIsLoading(false)
                      UserToast("error", "Đăng ký thất bại!")
                  }
              })
              .catch(() => {
                  setIsLoading(false)
                  UserToast(
                      "error",
                      "Đăng ký thất bại!, Email hoặc Username đã tồn tại"
                  )
              })
      } catch (error) {
          console.error("Register failed", error)
          setIsLoading(false)
          UserToast("error", "Đăng ký thất bại!")
      }

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
                              <img
                                  src={koiFish}
                                  alt="Koi Fish"
                                  className="koi-fish"
                              />
                          </div>

                          <div className="form-side">
                              <h1>Sign Up!</h1>
                              {errors.email && (
                                  <span style={{ color: "red" }}>
                                      This field is required
                                  </span>
                              )}
                              <form onSubmit={handleSubmit(onSubmit)}>
                                  <input
                                      type="hidden"
                                      value={
                                          window.location.origin +
                                          ComponentPath.user.user.validateEmail
                                      }
                                      {...register("clientURI")}
                                  />
                                  <label htmlFor="email">Email/SDT</label>
                                  <input
                                      type="text"
                                      id="email"
                                      placeholder="Email or Phone Number"
                                      {...register("email", { required: true })}
                                      className="input-field"
                                  />

                                  {errors.username && (
                                      <span style={{ color: "red" }}>
                                          This field is required
                                      </span>
                                  )}
                                  <br />
                                  <label htmlFor="username">Username</label>

                                  <input
                                      type="text"
                                      id="username"
                                      placeholder="Username"
                                      {...register("username", {
                                          required: true,
                                      })}
                                      className="input-field"
                                  />
                                  {errors.username && (
                                      <span style={{ color: "red" }}>
                                          This field is required
                                      </span>
                                  )}
                                  <br />

                                  <label htmlFor="fullname">Full Name</label>
                                  <input
                                      type="text"
                                      id="fullname"
                                      placeholder="Full Name"
                                      {...register("fullname", {
                                          required: true,
                                      })}
                                      className="input-field"
                                  />
                                  {errors.fullname && (
                                      <span style={{ color: "red" }}>
                                          This field is required
                                      </span>
                                  )}

                                  <label htmlFor="password">Password</label>
                                  <div className="password-wrapper">
                                      <input
                                          type="password"
                                          id="password"
                                          placeholder="Password"
                                          {...register("password", {
                                              required: true,
                                          })}
                                          className="input-field"
                                      />
                                  </div>

                                  {errors.confirmPassword && (
                                      <span style={{ color: "red" }}>
                                          This field is required
                                      </span>
                                  )}
                                  <br />
                                  <label htmlFor="confirmPassword">
                                      Confirm Password
                                  </label>
                                  <div className="password-wrapper">
                                      <input
                                          type="password"
                                          id="confirmPassword"
                                          placeholder="Confirm Password"
                                          {...register("confirmPassword", {
                                              required: true,
                                          })}
                                          className="input-field"
                                      />
                                  </div>
                                  <br />

                                  {isLoading ? (
                                      <button
                                          type="submit"
                                          className="signup-btn"
                                          disabled
                                      >
                                          Loading...
                                      </button>
                                  ) : (
                                      <button
                                          type="submit"
                                          className="signup-btn"
                                      >
                                          Sign Up
                                      </button>
                                  )}
                              </form>

                              <div className="social-login">
                                  <p className="social-text">
                                      or continue with
                                  </p>
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
      )
  }
}