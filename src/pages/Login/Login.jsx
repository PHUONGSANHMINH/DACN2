import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import authApi from "../../api/authApi";
import "./login.css";
import Banner from "../../assets/images/login_register/Frame 55.png";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!phone) e.phone = "Số điện thoại không được bỏ trống";
    if (!password) e.password = "Mật khẩu không được bỏ trống";
    return e;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const res = await authApi.login({ phone, password });
      if (res && res.data && res.data.token) localStorage.setItem("token", res.data.token);
      alert("Đăng nhập thành công!");
      // Clear fields on success
      setPhone("");
      setPassword("");
      setErrors({});
    } catch (err) {
      const message = err?.response?.data?.message || "Sai số điện thoại hoặc mật khẩu!";
      alert(message);
    }
  };

  return (
    <div className="auth-container">
      <img src={Banner} alt="banner" />
      <h2>Đăng nhập</h2>
      <p className="subtext">Đăng nhập bằng số điện thoại để tiếp tục</p>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <input
            type="tel"
            placeholder="Nhập số điện thoại..."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={errors.phone ? "error" : ""}
          />
          {errors.phone && <p className="error-text">{errors.phone}</p>}
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Nhập mật khẩu..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? "error" : ""}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

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
