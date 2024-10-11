import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import google from "../../../assets/google.png";
import facebook from "../../../assets/facebook.png";
import apple from "../../../assets/apple.png";
import koiFish from "../../../assets/koi-fish.png";
import home from "../../../assets/home.png";
import "../css/Register.css";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      api.post("Users/register", data).then((data) => {
        if (data.success) {
          alert("Đăng ký thành công!");
          navigate("/login");
        } else {
          alert("Đăng ký thất bại!");
        }
      });
    } catch (error) {
      console.error("Register failed", error);
      alert("Register failed. Please try again.");
    }
  };

  return (
    <>
      <div>
        {/* Navigation Menu */}
        <div className="home-icon">
          <a href="/">
            <img src={home} />
          </a>
        </div>

        {/* Sign-Up Form */}
        <div className="container">
          <div className="signup-box">
            <div className="signup-left">
              <img src={koiFish} alt="Koi Fish" className="koi-fish" />
            </div>

            <div className="signup-right">
              <h1>Sign Up!</h1>

              <form>
                <label htmlFor="email">Email/SDT</label>
                <input
                  type="text"
                  id="email"
                  placeholder="Email or Phone Number"
                  className="input-field"
                />

                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  className="input-field"
                />

                <label htmlFor="password">Password</label>
                <div className="password-wrapper">
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="input-field"
                  />
                  <span className="password-icon"></span>
                </div>

                <button type="submit" className="btn">
                  Sign Up
                </button>
              </form>

              <div className="social-login">
                <p className="social-text">or continue with</p>
                <div className="social-icons">
                  <button className="social-btn google-btn">
                    <img src={google} alt="Google" />
                  </button>
                  <button className="social-btn facebook-btn">
                    <img src={facebook} alt="Facebook" />
                  </button>
                  <button className="social-btn apple-btn">
                    <img src={apple} alt="Apple" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <h1>Registration</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", { required: true })}
          />
          {errors.username && <span>This field is required</span>}
        </div>
        <div>
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            id="fullname"
            {...register("fullname", { required: true })}
          />
          {errors.fullname && <span>This field is required</span>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", { required: true })}
          />
          {errors.email && <span>This field is required</span>}
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            {...register("phoneNumber", { required: true })}
          />
          {errors.phoneNumber && <span>This field is required</span>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register("password", { required: true })}
          />
          {errors.password && <span>This field is required</span>}
        </div>
        <button type="submit">Register</button>
      </form> */}
    </>
  );
}
