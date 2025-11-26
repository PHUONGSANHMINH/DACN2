import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import authApi from "../../api/authApi";
import "./register.css";
import Banner from "../../assets/images/login_register/Frame 55.png";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Lưu lỗi hiển thị
  const [errors, setErrors] = useState({});
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleRegister = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!email) newErrors.email = "Email không được bỏ trống";
    if (!password) newErrors.password = "Mật khẩu không được bỏ trống";
    if (!emailRegex.test(email)) {
      newErrors.email = "Email không đúng định dạng!";
    }
    if (!confirmPassword)
      newErrors.confirmPassword = "Bạn phải nhập lại mật khẩu";

    if (password !== confirmPassword)
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      const res = await authApi.register({ email, password });
      alert("Đăng ký thành công!");
    } catch (err) {
      alert("Đăng ký thất bại!");
    }
  };

  return (
    <div className="auth-container">
      <img src={Banner} alt="" />

      <h2>Đăng ký</h2>

      <form onSubmit={handleRegister}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Nhập email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? "error" : ""}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
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

        <div className="input-group">
          <input
            type="password"
            placeholder="Xác nhận mật khẩu..."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={errors.confirmPassword ? "error" : ""}
          />
          {errors.confirmPassword && (
            <p className="error-text">{errors.confirmPassword}</p>
          )}
        </div>

        <button type="submit" className="primaryBtn">
          Đăng ký
        </button>

        <div className="login-register-text">
          <span>Bạn đã có tài khoản? </span>
          <NavLink to="/login" className="register-link">
            Đăng nhập
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Register;
