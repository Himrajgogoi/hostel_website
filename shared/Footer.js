import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import styles from "../styles/Footer.module.css";

function Footer({ isConnected, contact }) {
  if (isConnected) {
    return (
      <footer className={styles.foot}>
        <div className="container" style={{ padding: "2vh 3vw 2vh 3vh" }}>
          <div className="row">
            <div className="col-12 col-md-6">
              <h5 className={styles.text}>Contact At:</h5>
              <b className={styles.text}>Superintendent of Hostel: </b>
              <br></br>
              <small className={styles.text}>
                Mr. Bijay Kumar Roy: +91 9954322064
              </small>
              <br></br>
              <br></br>
              <b className={styles.text}>Present Monitors: </b>
              <ul>
                {contact.map((con) => (
                  <li key={con._id}>
                    <small className={styles.text}>
                      {con.Name}: {con.Phone}
                    </small>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-12 col-md-4 offset-md-2">
              <i className={`${styles.text} fa fa-location-arrow fa-lg`}></i>
              <br></br>
              <small className={styles.text}>
                Jorhat Engineering College, Garmur, Jorhat, Assam, 785007, India
              </small>
              <br></br>
              <br></br>
              <small className={styles.text}>Courtesy of 2019-2023 batch</small>
            </div>
          </div>
          <small>
            <b className={styles.text}>Copyright@Himraj Gogoi-2021</b>
          </small>
        </div>
      </footer>
    );
  }
  return (
    <footer className={styles.foot}>
      <div className="container" style={{ padding: "2vh 3vw 2vh 3vh" }}>
        <div className="row">
          <div className="col-12 col-md-6">
            <a href="/">
              {" "}
              <i className={`${styles.text} fa fa-arrow-left fa-lg`}></i> Home
            </a>
            <br></br>
            <br></br>
            <small>
              <b className={styles.text}>Copyright@Himraj Gogoi</b>
            </small>
          </div>
          <div className="col-12 col-md-4 offset-md-2">
            <i className={`${styles.text} fa fa-location-arrow fa-lg`}></i>
            <br></br>
            <small className={styles.text}>
              Jorhat Engineering College, Garmur, Jorhat, Assam, 785007, India
            </small>
            <br></br>
            <br></br>
            <small className={styles.text}>Courtesy of 2019-2023 batch</small>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
