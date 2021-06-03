import React, { useState } from "react";
import Link from "next/link";
import {
  NavbarToggler,
  Collapse,
  Modal,
  ModalBody,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  DropdownToggle
} from "reactstrap";
import styles from "../styles/Header.module.css";
import "font-awesome/css/font-awesome.min.css";


function Header() {
  const [isOpen, setisOpen] = useState(false);

  const [modal, setModal] = useState(false);
  const [menu, setMenu] = useState(false);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light">
        <span
          className="navbar-brand"
          href="#"
          style={{ marginLeft: "2vw", marginRight: "65vw" }}
        >
          <b>Octave</b>
        </span>
        <NavbarToggler onClick={() => setisOpen(!isOpen)}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar>
          <ul className="navbar-nav">
            <li className={styles.item}>
              <a href="/" className={styles.hover_underline_animation} style={{textDecoration:'none'}}> <span>Home</span></a>
              {/* <Dropdown isOpen={menu} toggle={()=>setMenu(!menu)}>
                <DropdownToggle caret  className={styles.item}> 
                    home
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>About Us</DropdownItem>
                </DropdownMenu>
              </Dropdown> */}
            </li>
            <li className={styles.item}>
              <a href="/brief_history" className={styles.hover_underline_animation} style={{textDecoration:'none'}}> <span>Brief History</span></a>
            </li>
            <li className={styles.item} onClick={() => setModal(!modal)}>
              <span  className={styles.hover_underline_animation}>Sign In</span>
            </li>
          </ul>
        </Collapse>
      </nav>
      <Modal isOpen={modal}>
        <ModalBody>
          <span className="fa fa-close fa-lg" onClick={() => setModal(!modal)}></span>
          <form>
            <div class="form-group">
              <label for="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label for="passwordoftheuser">Password</label>
              <input
                type="password"
                className="form-control"
                id="passwordoftheuser"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Header;
