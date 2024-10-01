import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../../../api/CallAPI";
import Header from "../common/Header";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      api
        .post("Users/register", data)
        .then((data) => {
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
      <Header />
      <h1>Registration</h1>
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
      </form>
    </>
  );
}
