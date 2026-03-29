import React from "react";
import {useNavigate} from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { logout } from "../../Services/LoginService";

const StudentMenu = () => {

   let navigate = useNavigate();
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
        Lost & Found Student Menu 
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
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">

          <NavDropdown title="Personal" id="collasible-nav-dropdown">
            <NavDropdown.Item href="">Personal Details</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Lost Item" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/lost-entry">Lost Item Form Submission</NavDropdown.Item>
            <NavDropdown.Item href="/lost-list">Lost Item List</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Found Item" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/found-entry">Found Item Form Submission</NavDropdown.Item>
            <NavDropdown.Item href="/found-list">Found Item List</NavDropdown.Item>
          </NavDropdown>

          <Nav.Link href=""><b>Chatting</b></Nav.Link>

        </Nav>

        <button className="theme-btn" onClick={handleLogout}>
          Logout
        </button>

      </Navbar.Collapse>
    </Navbar>

  </div>
  );
}

export default StudentMenu;