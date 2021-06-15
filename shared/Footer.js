import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { Modal, ModalBody } from "reactstrap";

function Footer({ isConnected, contact }) {
  if (isConnected) {
    return (
      <footer style={{ minHeight: "20vh", backgroundColor: "grey" }}>
        <div className="container" style={{ padding: "2vh 3vw 2vh 3vh" }}>
          <div className="row">
            <div className="col-12 col-md-6">
              <h5 style={{ color: "white" }}>Contact At:</h5>
              <ul>
                {contact.map((con) => (
                  <li>
                    <small style={{ color: "white" }}>
                      {con.Name}: {con.Phone}
                    </small>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-12 col-md-4 offset-md-2">
              <i className="fa fa-location-arrow fa-lg"></i>
              <br></br>
              <small style={{ color: "white" }}>
                Jorhat Engineering College, Garmur, Jorhat, Assam, 785007, India
              </small>
            </div>
          </div>
          <small>
            <b style={{ color: "white" }}>Copyright@Himraj Gogoi</b>
          </small>
        </div>
      </footer>
    );
  }
  return (
    <footer style={{ height: "20vh", backgroundColor: "grey" }}>
      <div className="container" style={{ padding: "2vh 3vw 2vh 3vh" }}>
        <div className="row">
          <div  className="col-12 col-md-6">
          <a href="/" style={{color: "white"}}> <i className="fa fa-arrow-left fa-lg"></i> Home</a>
          <br></br>
          <br></br>
            <small>
              <b style={{ color: "white" }}>Copyright@Himraj Gogoi</b>
            </small>
          </div>
          <div className="col-12 col-md-4 offset-md-2">
            <i className="fa fa-location-arrow fa-lg"></i>
            <br></br>
            <small style={{ color: "white" }}>
              Jorhat Engineering College, Garmur, Jorhat, Assam, 785007, India
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
