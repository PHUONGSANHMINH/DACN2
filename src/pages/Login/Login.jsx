import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import authApi from "../../api/authApi";
import "./login.css";
import Banner from "../../assets/images/login_register/Frame 55.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await authApi.login({ email, password });
      localStorage.setItem("token", res.data.token);
      alert("Đăng nhập thành công!");
    } catch (err) {
      alert("Sai email hoặc mật khẩu!");
    }
  };

  return (
    <div className="auth-container">
      <img src={Banner} alt="" />
      <h2>Đăng nhập</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Nhập email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Nhập mật khẩu..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="primaryBtn">
          Đăng nhập
        </button>
        <div className="login-register-text">
          <span>Bạn chưa có tài khoản? </span>
          <NavLink to="/register" className="register-link">
            Đăng ký
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Login;
