import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import api from "../../../api/CallAPI"
import google from "../../../assets/google.png"
import facebook from "../../../assets/facebook.png"
import apple from "../../../assets/apple.png"
import koiFish from "../../../assets/koi-fish.png"
import home from "../../../assets/home.png"
import "../css/Register.css"

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const navigate = useNavigate()

    //   const onSubmit = async (data) => {
    //     try {
    //       api.post("Users/register", data).then((data) => {
    //         if (data.success) {
    //           alert("Đăng ký thành công!");
    //           navigate("/login");
    //         } else {
    //           alert("Đăng ký thất bại!");
    //         }
    //       });
    //     } catch (error) {
    //       console.error("Register failed", error);
    //       alert("Register failed. Please try again.");
    //     }
    //   };

    return (
        <>
            <div className="home-icon">
                <a href="/">
                    <img src={home} alt="Home" />
                </a>
            </div>

            <div className="container">
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
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label htmlFor="email">Email/SDT</label>
                            <input
                                type="text"
                                id="email"
                                placeholder="Email or Phone Number"
                                {...register("email", { required: true })}
                                className="input-field"
                            />
                            {errors.email && (
                                <span>This field is required</span>
                            )}

                            {/* <label htmlFor="password">Password</label>
              <div className="password-wrapper">
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  {...register("password", { required: true })}
                  className="input-field"
                />
                {errors.password && <span>This field is required</span>}
              </div> */}

                            <button type="submit" className="btn">
                                Reset Password
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
