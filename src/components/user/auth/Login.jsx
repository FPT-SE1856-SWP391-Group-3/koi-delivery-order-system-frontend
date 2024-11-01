import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { set, useForm } from "react-hook-form";
import api from "../../../api/CallAPI";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import "../css/Login.css";
import koiFish from "../../../assets/koi-fish.png";
import home from "../../../assets/home.png";
import ComponentPath from "routes/ComponentPath";
import { Alert } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserToast from "../alert/UserToast";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const navigate = useNavigate();


  const onSubmit = async (data) => {
    try {
      await api
        .post("Users/login/jwt/", data)
        .then((data) => {
          if (data.success) {
            console.log("Đăng nhập thành công!");
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("userId", JSON.stringify(data.userId));
            localStorage.setItem("token", JSON.stringify(data.stringToken));
            console.log(data.user.roleId);
            switch (data.user.roleId) {
              case 5:
                console.log("redirect to admin");
                navigate("/admindashboard");
                break;
              case 2:
                navigate(ComponentPath.user.profile.viewProfile);
                break;
              case 3:
                navigate("/admindashboard");
                break;
              case 4:
                navigate("/admindashboard");
                break;
              default:
                alert("Không xác định được vai trò người dùng");
                navigate("/");
            }
          }
        })
        .catch((error) => {
          console.log("Đăng nhập thất bại!");
          setError("Đăng nhập thất bại!");
          UserToast("error", "Đăng nhập thất bại!");
        });
    } catch (error) {
      console.error("Lỗi đang nhập:", error);
      alert("Lỗi đang nhập, vui lòng thử lại.");
    }
  };

  useEffect(() => {
    handleNavigateIfLoggedIn();
  }, []);

  const handleNavigateIfLoggedIn = () => {
    if (user != null) {
      console.log(user);
      switch (user.roleId) {
        case 5:
          console.log("redirect to admin");
          var admin = ComponentPath.admin.dashboard;
          navigate(admin);
          break;
        case 2:
          navigate(ComponentPath.user.profile.viewProfile);
          break;
        case 3:
          navigate(ComponentPath.admin.dashboard);
          break;
        case 4:
          navigate(ComponentPath.admin.dashboard);
          break;
        default:
          <Alert variant="filled" severity="error">
            This is a filled error Alert.
          </Alert>;
          navigate("/");
      }
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
        navigate(ComponentPath.user.profile.viewProfile);
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
    /*!token ? */ <GoogleOAuthProvider clientId="140153999668-glsb80p23t7i57jhuvkllouljgv5uo48.apps.googleusercontent.com">
      <ToastContainer/>
      <div className="login">
        <a href="/" className="loginhome-icon">
          <img src={home} />
        </a>
        <div className="login-container">
          <div className="login-box">
            <div className="login-left">
              <h1>Sign In</h1>
              <p>
                Dont have an account? <a href="/register">Sign Up</a>
              </p>

              <form onSubmit={handleSubmit(onSubmit)}>
                <h3>{error}</h3>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="input-field"
                  {...register("email")}
                />

                <label htmlFor="password">Password</label>
                <div className="password-wrapper">
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="input-field"
                    name="password"
                    {...register("password")}
                  />
                  <span className="password-icon"></span>
                </div>

                <button type="submit" className="signin-btn">
                  Sign In
                </button>
              </form>

              <div className="social-login">
                <p>or continue with</p>
                <div className="social-icons">
                  <button className="google-btn">
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={handleGoogleFailure}
                      useOneTap // Hiển thị nút đăng nhập Google
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="login-right">
              <img src={koiFish} alt="Koi Fish" className="koi-fish" />
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
    /* ) : (
    handleNavigateIfLoggedIn()*/
  );
}
/* {/* <h1>Login</h1>
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
      </div> */
