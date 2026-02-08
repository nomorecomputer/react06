/* eslint-disable no-unused-vars */
import { useState } from "react";
import { setCookie } from "../utility";
import { COOKIE_NAME, api, setApiToken } from "../App";
import { useForm } from "react-hook-form";
import { emailPattern } from "../utilities/validators";

function Login({ setIsAuth, getProducts }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: "nomorecomputer@gmail.com",
      password: "aaa",
    },
  });

  const onSubmit = async (formData) => {
    try {
      const response = await api.post("/admin/signin", formData);
      const { token, expired } = response.data;
      console.dir(response);
      setCookie(COOKIE_NAME, token, expired);
      setApiToken(token);
      if (response.data.success) alert("成功登入！！");
      // setIsAuth(true);
      // getProducts(1);
    } catch (error) {
      // setIsAuth(false);
      alert(
        "登入失敗，請重新登入" + error.response?.data?.message || error.message,
      );
    }
  };
  return (
    <div className="container login">
      <div className="row justify-content-center">
        <h1 className="h3 mb-3 font-weight-normal">請先登入</h1>
        <div className="col-8">
          <form
            id="form"
            className="form-signin"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                name="username"
                id="username"
                placeholder="name@example.com"
                autoFocus
                {...register("username", {
                  required: "必須輸入Email",
                  pattern: emailPattern,
                })}
              />
              {errors.username && (
                <p className="text-danger mt-1">{errors.username.message}</p>
              )}
              <label htmlFor="username">Email address</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                placeholder="Password"
                {...register("password", {
                  required: "請輸入密碼",
                  minLength: {
                    value: 6,
                    message: "密碼長度必須大於6碼",
                  },
                })}
              />
              {errors.password && (
                <p className="text-danger mt-1">{errors.password.message}</p>
              )}
              <label htmlFor="password">Password</label>
            </div>
            <button
              className="btn btn-lg btn-primary w-100 mt-3"
              type="submit"
              // onClick={signIn}
            >
              登入
            </button>
          </form>
        </div>
      </div>
      <p className="mt-5 mb-3 text-muted">&copy; 2024~∞ - 六角學院</p>
    </div>
  );
}

export default Login;
