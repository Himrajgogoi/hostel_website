import React, { useState } from "react";
import {useRouter} from "next/router";
import {
  NavbarToggler,
  Collapse,
  Modal,
  ModalBody,
} from "reactstrap";
import styles from "../styles/Header.module.css";
import "font-awesome/css/font-awesome.min.css";
import fire from "../config/fire_config";


function Header() {


  const router = useRouter();
  const [isOpen, setisOpen] = useState(false);

  const [modal, setModal] = useState(false);
  const [menu, setMenu] = useState(false);
  const [error, setError] = useState(' ');


  ///user signIn
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
   
  const handleLogin = e =>{
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(email,password)
    .catch((err)=>{
      console.log(err);
      setError(err.message)
    })

    setEmail('');
    setPassword('');
    setModal(!modal);
  
  }

  const handleLogout = () =>{
    fire.auth().signOut()
    .then(()=>{
      router.reload()
    })
  }


  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light">
        <span
          className="navbar-brand"
          href="#"
          style={{ marginLeft: "2vw", marginRight: "50vw" }}
        >
            <img alt="hostel image" src="/hostel/logo.jpg" className="img-fluid" height="45vh" width="45vw"/>
          <b>Octave</b>
        </span>
        <NavbarToggler onClick={() => setisOpen(!isOpen)}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar>
          <ul className="navbar-nav">
            <li className={styles.item}>
              <a href="/" className={styles.hover_underline_animation} style={{textDecoration:'none'}}> <span>Home</span></a>
            </li>
            <li className={styles.item}>
              <a href="/brief_history" className={styles.hover_underline_animation} style={{textDecoration:'none'}}> <span>Brief History</span></a>
            </li>
            <li className={styles.item}>
              <a href="/gallery" className={styles.hover_underline_animation} style={{textDecoration:'none'}}> <span>Gallery</span></a>
            </li>
           
            <li className={styles.item} onClick={() => setModal(!modal)}>
              <span  className={styles.hover_underline_animation}>Sign In</span>
            </li>
            <li className={styles.item} onClick={() => setModal(!modal)}>
              <span  className={styles.hover_underline_animation} onClick={()=>handleLogout()}>Sign Out</span>
            </li>
          </ul>
        </Collapse>
      </nav>
      <Modal isOpen={modal}>
        <ModalBody>
          <span className="fa fa-close fa-lg" onClick={() => setModal(!modal)}></span>
          <form onSubmit={handleLogin}>
            <div class="form-group">
              <label for="username">Email</label>
              <input
                type="email"
                className="form-control"
                id="username"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
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
            <div>{error}</div>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Header;
