import Head from "next/head";
import React, { useState } from "react";
import { connectToDatabase } from "../util/mongodb";
import Footer from "../shared/Footer";
import styles from "../styles/Gallery.module.css";
import fire from "../config/fire_config";
import { Modal, ModalBody } from "reactstrap";
import axios from "axios";
import imageCompression from "browser-image-compression";

function Gallery({ isConnected, gallery }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [image, setImage] = useState(null);
  const [modal, setModal] = useState(false);

  fire.auth().onAuthStateChanged((user) => {
   if(user){
    if (user.uid === process.env.USER_ID) {
      setLoggedIn(true);
    }
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
      const compressedImage = await imageCompression(image, {
        maxSizeMB: 2,
        useWebWorker: true,
      });

      const img = await getBase64(compressedImage);
      const body = {
        image: img,
      };
      axios
        .post("/api/edit_gallery", body)
        .then((res) => {
          alert("Success. Refresh to see changes");
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

    fetch("/api/edit_gallery", {
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
        </Head>
        <div className="container">
          <div className="row">
            <div
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
      
        <Footer />
      </div>
    );
  }
  else{
    return (
      <div>
        <Head>
          <title>Octave | gallery</title>
        </Head>
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
  let gallery_props;

  if(isConnected){
    const gallery = await db.collection("Gallery").find({}).toArray();
    gallery_props = JSON.parse(JSON.stringify(gallery));
  }
  return {
    props: { gallery: gallery_props, isConnected: isConnected },
  };
}
export default Gallery;
