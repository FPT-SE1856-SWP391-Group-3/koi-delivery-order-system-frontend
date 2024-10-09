import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../../../api/CallAPI";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import "../css/Login.css";

export default function Login() {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      api.post("Users/login/jwt/", data).then((data) => {
        if (data.success) {
          alert("Đăng nhập thành công!");
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("userId", JSON.stringify(data.userId));
          localStorage.setItem("token", JSON.stringify(data.stringToken));
          navigate("/");
        } else {
          alert("Đăng nhập thất bại!");
        }
      });
    } catch (error) {
      console.error("Lỗi đang nhập:", error);
      alert("Lỗi đang nhập, vui lòng thử lại.");
    }
  };

  // Hàm xử lý khi đăng nhập thành công qua Google
  const handleGoogleSuccess = async (response) => {
    try {
      const googleIdToken = response.credential;

      // Gửi token Google IdToken tới backend để xác thực
      const res = await fetch(api.buildUrl("Users/login/google"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ IdToken: googleIdToken }), // Gửi IdToken tới backend
      });

      // Kiểm tra kiểu nội dung của phản hồi
      const contentType = res.headers.get("content-type");
      let data;
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await res.json(); // Phản hồi JSON
      } else {
        data = await res.text(); // Phản hồi văn bản thuần
      }

      if (data.success) {
        alert("Đăng nhập bằng Google thành công!");
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      } else {
        alert("Đăng nhập bằng Google thất bại!");
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      alert("An error occurred during Google login. Please try again.");
    }
  };

  // Hàm xử lý khi đăng nhập bằng Google thất bại
  const handleGoogleFailure = (error) => {
    console.error("Google Login Failure:", error);
    alert("Đăng nhập bằng Google thất bại!");
  };

  return (
    <GoogleOAuthProvider clientId="140153999668-glsb80p23t7i57jhuvkllouljgv5uo48.apps.googleusercontent.com">
      <nav className="navbarlogin">
        <div className="menu-icon">
          <button>☰ Menu</button>
        </div>

        <div className="nav-right">
          <ul className="nav-links">
            <li>
              <a href="#">Help</a>
            </li>
            <li>
              <a href="#">Contact us</a>
            </li>
            <li>
              <a href="#">
                English <span>▼</span>
              </a>
            </li>
            <li>
              <a href="#">Sign Up</a>
            </li>
          </ul>
          <div className="home-icon">
            <a href="/">
              <h1>HOME</h1>
            </a>
          </div>
        </div>
      </nav>

      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" {...register("email")} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            {...register("password")}
          />
        </div>
        <button type="submit">Login</button>
        <a href="/register">Register</a>
      </form>

      <div>
        <h3>Or login with Google</h3>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleFailure}
          useOneTap // Hiển thị nút đăng nhập Google
        />
      </div>
    </GoogleOAuthProvider>
  );
}
