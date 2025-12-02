import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import authApi from "../../api/authApi";
import "./register.css";
import Banner from "../../assets/images/login_register/Frame 55.png";

const Register = () => {
  const [phone] = useState("+84987654321"); // giả sử số đã xác minh (readonly)
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("Nữ");
  const [dob, setDob] = useState("");

  const [errors, setErrors] = useState({});
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    const newErrors = {};
    if (!phone) newErrors.phone = "Số điện thoại không hợp lệ";
    if (!fullName) newErrors.fullName = "Họ và tên không được bỏ trống";
    if (!password) newErrors.password = "Mật khẩu không được bỏ trống";
    else if (password.length < 8)
      newErrors.password = "Mật khẩu phải ít nhất 8 ký tự";
    if (!confirmPassword) newErrors.confirmPassword = "Bạn phải nhập lại mật khẩu";
    if (password && confirmPassword && password !== confirmPassword)
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    if (!dob) newErrors.dob = "Vui lòng chọn ngày sinh";
    return newErrors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const payload = { phone, fullName, password, gender, dob };
      const res = await authApi.register(payload);
      if (res && res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      // Xóa các dòng đã nhập sau khi đăng ký thành công
      setFullName("");
      setPassword("");
      setConfirmPassword("");
      setGender("Nữ");
      setDob("");
      setErrors({});
      alert("Đăng ký thành công!");
    } catch (err) {
      const message = err?.response?.data?.message || "Đăng ký thất bại";
      alert(message);
    }
  };

  return (
    <div className="auth-container">
      <img src={Banner} alt="banner" />

      <h2>Đăng ký tài khoản</h2>
      <p className="subtext">Chúng tôi có một ưu đãi mà bạn không thể bỏ qua!</p>

      <form onSubmit={handleRegister}>
        <label className="label-muted">Số điện thoại đã xác minh</label>
        <div className="input-group phone-group">
          <input type="text" value={phone} />
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="Họ và tên của bạn"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={errors.fullName ? "error" : ""}
          />
          {errors.fullName && <p className="error-text">{errors.fullName}</p>}
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Nhập mật khẩu..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? "error" : ""}
          />
          <small className="hint">Tối thiểu 8 kí tự, kết hợp chữ cái, chữ số và kí hiệu đặc biệt</small>
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

        <div className="gender-row">
          <label className="label-muted">Giới tính</label>
          <div className="gender-buttons">
            {["Nam", "Nữ", "Khác"].map((g) => (
              <button
                type="button"
                key={g}
                className={"gender-btn " + (gender === g ? "active" : "")}
                onClick={() => setGender(g)}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="input-group">
          <label className="label-muted">Ngày sinh</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className={errors.dob ? "error" : ""}
          />
          {errors.dob && <p className="error-text">{errors.dob}</p>}
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
