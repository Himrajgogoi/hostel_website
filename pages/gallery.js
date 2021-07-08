import Head from "next/head";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { connectToDatabase } from "../util/mongodb";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import styles from "../styles/Gallery.module.css";
import fire from "../config/fire_config";
import { Modal, ModalBody } from "reactstrap";
import axios from "axios";

function Gallery({ isConnected, gallery }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [image, setImage] = useState(null);
  const [modal, setModal] = useState(false);

  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleSubmit = async (image) => {
    if (image) {
      const img = await getBase64(image);
      const body = {
        image: img,
      };
      await axios
        .post("/api/edit_gallery", body)
        .then((res) => {
          console.log("success");
          window.location.reload();
        })
        .catch(err=>alert(err.message));
    }
  };

  const deleteImage = async (id, public_id) => {
    const body = {
      id: id,
      image: public_id,
    };

    await fetch("/api/edit_gallery", {
      method: "DELETE",
      body: JSON.stringify(body),
      headers:{
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        window.location.reload();
      })
      .catch(err=>alert(err.message));
  };

  if (isConnected) {
    return (
      <div>
        <Head>
          <title>Octave | gallery</title>
          <link rel="icon" href="/logo_fvt.ico"></link>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Header />
        <div className="container">
          <div className="row">
            <div
              className="col-12 col-md-6"
              className={styles.hover_underline_animation}
            >
              <h2>Gallery</h2>
            </div>
            <div className="col-12 col-md-1">
              {loggedIn && gallery.length < 20? (
                <i
                  className="fa fa-plus fa-lg"
                  onClick={() => setModal(!modal)}
                ></i>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <Modal isOpen={modal}>
            <ModalBody>
              <span
                className="fa fa-close fa-lg"
                onClick={() => setModal(!modal)}
              ></span>
              <h4>Upload Image</h4>
              <input
                className="form-control"
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
              />
              <button type="button" onClick={() => handleSubmit(image)}>
                Submit
              </button>
            </ModalBody>
          </Modal>
        </div>
        <div className={styles.activities_achievements}>
          <div className="row">
            <div className="col-12">
              <div className={styles.flex_container}>
                {gallery == [] ? (
                  <p style={{ minHeight: `100vh` }}>
                    <h5>Empty</h5>
                  </p>
                ) : (
                  gallery.map((image) => (
                    <div
                      key={image._id}
                      className={styles.flex_content}
                      style={{
                        backgroundImage: `url(${image.image}`,
                      }}
                    >
                      {loggedIn ? (
                        <i
                          className="fa fa-trash fa-lg" style={{color:`white`}}
                          onClick={() =>
                            deleteImage(image._id, image.public_id)
                          }
                        ></i>
                      ) : (
                        <div></div>
                      )}
                      <i className="fa fa-forward fa-lg" style={{color: 'white', marginLeft: '2vw'}}
                      onClick={() =>
                        window.open(image.image)
                      }/>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        <style jsx global>{`
          h2,
          small {
            font-family: "Raleway", sans-serif;
          }

          h5,
          h1 {
            font-family: "Raleway", sans-serif;
            font-weight: bold;
          }
        `}</style>
        <Footer />
      </div>
    );
  }
  else{
    return (
      <div>
        <Head>
          <title>Octave | gallery</title>
          <link rel="icon" href="/logo_fvt.ico"></link>
        </Head>
        <Header />
        <div className="container">
          <p style={{ textAlign: "center" }}>
            Could not connect to the server. Try checking your internet
            connection!
          </p>
        </div>
        <Footer/>
      </div>
    );
  }
}
export async function getServerSideProps(context) {
  const { client, db } = await connectToDatabase();
  const isConnected = await client.isConnected();
  const gallery = await db.collection("Gallery").find({}).toArray();
  const gallery_props = JSON.parse(JSON.stringify(gallery));
  return {
    props: { gallery: gallery_props, isConnected: isConnected },
  };
}
export default Gallery;
