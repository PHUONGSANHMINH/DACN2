import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Navbar,
  Offcanvas,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/images/icons/Logo.png"
import "../Header/header.css";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setOpen(!open);
  };

  useEffect(()=>{
    window.addEventListener("scroll", isSticky);
    return ()=>{
      window.removeEventListener("scroll", isSticky)
    }
  })

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogged(!!token);

    const onStorage = (e) => {
      if (e.key === "token") setIsLogged(!!e.newValue);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // sticky Header 
  const isSticky=(e)=>{
    const header = document.querySelector('.header-section');
    const scrollTop = window.scrollY;
    scrollTop >= 120 ? header.classList.add('is-sticky') :
    header.classList.remove('is-sticky')
  }


 

  return (
    
    <header className="header-section">
      <Container>
       
          <Navbar expand="lg" className="p-0">
            {/* Logo Section  */}
            <Navbar.Brand>
              <img 
                src={Logo} 
                alt="Trip Go Logo" />
              <NavLink to="/"> Trip Go</NavLink>
            </Navbar.Brand>
            {/* End Logo Section  */}

            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-lg`}
              aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
              placement="start"
              show={open}
            >
              {/*mobile Logo Section  */}
              <Offcanvas.Header>
                <h1 className="logo">Weekendmonks</h1>
                <span className="navbar-toggler ms-auto"  onClick={toggleMenu}>
                  <i className="bi bi-x-lg"></i>
                </span>
              </Offcanvas.Header>
              {/*end mobile Logo Section  */}

              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <NavLink className="nav-link" to="/" >
                    Trang chủ
                  </NavLink>
                  <NavLink className="nav-link" to="/" >
                    ABOUT US
                  </NavLink>
                  <NavLink className="nav-link" to="/" >
                    Khám phá
                  </NavLink>

                  <NavLink className="nav-link" to="/" >
                    Đặt chỗ của tôi
                  </NavLink>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
            <div className="ms-md-4 ms-2">
              {!isLogged ? (
                <>
                  <NavLink className="primaryBtn d-none d-sm-inline-block" to="/login">
                    Đăng nhập
                  </NavLink>
                  <NavLink className="primaryBtn1 d-none d-sm-inline-block" to="/register">
                    Đăng ký
                  </NavLink>
                </>
              ) : (
                <NavDropdown
                  title={<span className="avatar-circle"><i className="bi bi-person-circle"></i></span>}
                  id="user-nav-dropdown"
                  align="end"
                >
                  <NavDropdown.Item onClick={() => navigate('/profile')}>Hồ sơ</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => { localStorage.removeItem('token'); setIsLogged(false); navigate('/'); }}>Đăng xuất</NavDropdown.Item>
                </NavDropdown>
              )}
              <li className="d-inline-block d-lg-none ms-3 toggle_btn">
                <i className={open ? "bi bi-x-lg" : "bi bi-list"}  onClick={toggleMenu}></i>
              </li>
            </div>
          </Navbar>
    
      </Container>
    </header>
  );
};

export default Header;
