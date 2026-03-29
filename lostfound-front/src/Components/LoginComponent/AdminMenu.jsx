import React from "react";
import {useNavigate} from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { logout } from "../../Services/LoginService";

const AdminMenu=()=>{

let navigate=useNavigate();
   const handleLogout = () => {
     logout().then(() => {
           localStorage.clear();
           sessionStorage.clear();
           navigate('/');
       })
    };
return (
  <div className="theme-layout">

    {/* Header */}
    <div style={{
      background: "rgba(0,0,0,0.6)",
      backdropFilter: "blur(8px)",
      padding: "15px",
      textAlign: "center"
    }}>
      <h2 style={{
        color: "white",
        margin: 0,
        fontWeight: "700",
        letterSpacing: "1px"
      }}>
        Lost & Found Admin Panel 🛠️
      </h2>
    </div>

    {/* Navbar */}
    <Navbar
      expand="lg"
      style={{
        background: "rgba(255,255,255,0.25)",
        backdropFilter: "blur(10px)",
        padding: "10px 40px"
      }}
    >
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">

        <Nav className="me-auto">

          <NavDropdown title="Student" id="student-dropdown">
            <NavDropdown.Item href="">
              Student List
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Items" id="items-dropdown">
            <NavDropdown.Item href="/found-list">
              Found Item List
            </NavDropdown.Item>
            <NavDropdown.Item href="/lost-list">
              Lost Item List
            </NavDropdown.Item>
            <NavDropdown.Item href="/match-list">
              Match Item List
            </NavDropdown.Item>
          </NavDropdown>

          <Nav.Link href="">
            Chatting
          </Nav.Link>

        </Nav>

        <button className="theme-btn" onClick={handleLogout}>
          Logout
        </button>

      </Navbar.Collapse>
    </Navbar>

    {/* Optional: content section below navbar */}
    <div style={{ padding: "40px", color: "white" }}>
      {/* Your dashboard content can go here */}
    </div>

  </div>
);
}
export default AdminMenu;