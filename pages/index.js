import Head from "next/head";
import Header from "../shared/Header";
import { connectToDatabase } from "../util/mongodb";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Footer from "../shared/Footer";
import { Modal, ModalBody } from "reactstrap";
import fire from "../config/fire_config";
import axios from "axios";

export default function Home({
  isConnected,
  activities,
  achievements,
  monitors,
}) {
  

  const [header, setHeader] = useState(null);
  const [content, setContent] = useState(null);
  const [image, setImage] = useState(null);

  const [name, setName] = useState(null);
  const [quote, setQuote] = useState(null);
  const [designation, setDesignation] = useState(null);
  const [phone, setPhone] = useState(null);

  const [flag, setFlag] = useState(null);
  const [modal, setModal] = useState(false);
  const [monitor_post, setMonitor] = useState(false);

  ///check user
  const [loggedIn, setLoggedIn] = useState(false);

  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });


  const getBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    });


  const post_submit = async (e,flag, header, content, image) => {

    let img = null;
    if(image){
      img = await getBase64(image);
    }

    const form = {
      header: header,
      content: content,
      image: img
    }
    if (flag === "activities_post") {
      await axios.post("/api/edit_activities",form)
      .then(res=>{
        console.log("success");
      })
      .catch(err=>alert(err.message));

    } else if (flag === "achievements_post") {
      await axios.post("/api/edit",form)
      .then(res=>{
        console.log("success");
      })
      .catch(err=>alert(err.message));
      
    }
  };

  const post_monitor = async (e,name, designation, quote, phone, image) => {
     
    if(image){
      const img = await getBase64(image);

      const form = {
        name: name,
        designation: designation, 
        quote: quote, 
        phone: phone,
        image: img
      }
      await axios.post("/api/edit_monitors",form)
        .then(res=>{
          console.log("success");
        })
        .catch(err=>alert(err.message));
  
    }
    else{
      const form = {
        name: name,
        designation: designation, 
        quote: quote, 
        phone: phone,
        image: null
      }
      await axios.post("/api/edit_monitors",form)
        .then(res=>{
          console.log("success");
        })
        .catch(err=>alert(err.message));
  
    }
    
  };

  const handleSubmit = async (e,id, header, content, image, public_id) => {

    if(image){
      const img = await getBase64(image);
      const form = {
        id: id,
        header: header,
        content: content,
        image: img,
        public_id: public_id
      }
      await axios.patch("/api/edit",form)
        .then(res=>{
          console.log("success");
        })
        .catch(err=>alert(err.message));
  
    }
    else{
      const form = {
        id: id,
        header: header,
        content: content,
        image: null
      }
      await axios.patch("/api/edit",form)
        .then(res=>{
          console.log("success");
        })
        .catch(err=>alert(err.message));
  
    }
    
    
  };

  const handleSubmit_activities = async (e,id, header, content, image, public_id) => {
    
    if(image){
      const img = await getBase64(image);
      const form = {
        id: id,
        header: header,
        content: content,
        image: img,
        public_id: public_id
      }
      await axios.patch("/api/edit_activities",form)
        .then(res=>{
          console.log("success");
        })
        .catch(err=>alert(err.message));
    }

    else{
      const form = {
      id: id,
      header: header,
      content: content,
      image: null
    }
    await axios.patch("/api/edit_activities",form)
      .then(res=>{
        console.log("success");
      })
      .catch(err=>alert(err.message));
   
    
  };}

  const handleSubmit_monitors = async (
    e,
    id,
    name,
    designation,
    quote,
    phone,
    image,
    public_id
  ) => {
   
    if(image){
      const img = await getBase64(image);

      const form = {
        id:id,
        name: name,
        designation: designation, 
        quote: quote, 
        phone: phone,
        image: img,
        public_id: public_id
      }
      await axios.patch("/api/edit_monitors",form)
        .then(res=>{
          console.log("success");
        })
        .catch(err=>alert(err.message));
  
    }
    else{
      const form = {
        id:id,
        name: name,
        designation: designation, 
        quote: quote, 
        phone: phone,
        image: null
      }
      await axios.patch("/api/edit_monitors",form)
        .then(res=>{
          console.log("success");
        })
        .catch(err=>alert(err.message));
  
    }
    
  };

  const delete_activity = async (e,id,public_id) => {
  
   const form ={
      id:id,
      image: public_id
   }
      await fetch("/api/edit_activities", {
        method: "DELETE",
        body: JSON.stringify(form),
        headers:{
          "Content-Type": "application/json"
        }
      })
      .then(res=>window.location.reload())
      .catch(err=>alert(err.message));
  

  };

  const delete_achievement = async (e,id,public_id) => {
    
    const form ={
      id:id,
      image: public_id
    }
    await fetch("/api/edit", {
      method: "DELETE",
      body: JSON.stringify(form),
      headers:{
        "Content-Type": "application/json"
      }
    })
    .then(res=>window.location.reload())
    .catch(err=>alert(err.message));
  };

  const delete_monitor = async (e,id,public_id) => {
    const form ={
      id:id,
      image: public_id
    }
    await fetch("/api/edit_monitors", {
      method: "DELETE",
      body: JSON.stringify(form),
      headers:{
        "Content-Type": "application/json"
      }
    })
    .then(res=>window.location.reload())
    .catch(err=>alert(err.message));
   
  };
  if (!isConnected) {
    return (
      <div>
        <Head>
          <title>Octave | home</title>
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
  else{
  const FooterPage = () => {
    return <Footer isConnected={isConnected} contact={monitors} />;
  };

  return (
    <div>
      <Head>
        <title>Octave | home</title>
        <link rel="icon" href="/logo_fvt.ico"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header />
      <div
        className="container"
        style={{
          border: "1px solid grey",
          minHeight: "40vh",
          marginTop: "4vh",
          backgroundImage: `url("/hostel/hostel_1.jpg")`,
          backgroundPosition: "top left",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="row">
          <div className="col-12 col-md-3">
            <div className={styles.content}>
              <h5>Welcome to,</h5>
              <h1>Octave</h1>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.hover_underline_animation}>
          <div className="row">
            <div className="col-12">
              <h2 className={styles.hover_underline_animation}>About us</h2>
              <p>
                Established in 1984 and hence the youngest among all the boys 
                hostels, we have produced some of the most well established
                individuals in Assam as well as in India and abroad. We nurture
                a sense of brotherhood among us that transcends the walls of
                this hostel; brothers for life, as we all say, once an Octavian
                always an Octavian. College life is one of the most pivotal part
                of our lives, full of learning, failing and succeeding; we try
                to mold our boarders into individuals who can survive in this
                fast changing world. One must learn to be resourceful as well as
                be able to manage situations in order to grow in today's world
                and what better place to learn all this than in Octave, the best boys hostel in Jorhat Engineering College.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.alternate_container}>
        <div className={styles.alternate_content}>
          <div className={styles.hover_underline_animation}>
            <div className="row">
              <div className="col-12">
                <h2>Location</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-5">
                <img alt="hostel image"
                  className={`img-fluid ${styles.image}`}
                  src="/hostel/hostel_sidegate.jpg"
                />
              </div>
              <div className="col-12 col-md-6 offset-md-1">
                <div>
                  <p>
                    Located in the Southeastern part of this sprawling college
                    campus, far away from all the noise of a town, nature is
                    just outside the door. With a forest on one side, decent
                    playground behind and a garden upfront, the environment is
                    just right to nestle an individual. One can feel a sense of
                    calm and peace breathing in the air around here; an ecstacy
                    one can hardly let go off.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className="row">
          <div className="col-12 col-md-5">
            <h2 className={styles.box_header}>Student Life.</h2>
          </div>
          <div className="col-12 col-md-6 offset-md-1">
            <div className={styles.alternate_content}>
              <p>
                From the seniormost to the freshers, all the batches live
                together in harmony, learning and growing as one is made to
                understand the traditions of our hostel. There are a ton of
                tournaments and competitions all year long in which all the
                batches participate as a team bringing laurels to our hostel. We
                come here as strangers, but leave as brothers; brothers for
                life. That's the beauty of our hostel.
              </p>
              <img alt="hostel image"
                className={`img-fluid ${styles.image}`}
                src="/hostel/street_play.jpg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.alternate_container}>
        <div className={styles.alternate_content}>
          <div className={styles.hover_underline_animation}>
            <div className="row">
              <div className="col-12">
                <div>
                  <h2 className={styles.hover_underline_animation}>
                    Facilities.
                  </h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6">
                <p>
                  Built in the form of H, our hostel boasts 32 rooms, 1 common
                  room, 1 gym-cum-library room, 1 mess and 4 washrooms. The
                  common room is the pride of the hostel, as it serves as the
                  hosting venue for various celebrations like freshers,
                  farewell, distinguised guests. It is christened with all the
                  trophies, medals and commendations that our hostel has
                  garnered over the years. Apart from all this, it also serves
                  as a place of rejuvination. One can relax, have a chat, watch
                  some tv and even engage in some carrom with each other. We
                  believe an individual must excel not only in academics, but
                  also in other activities, as such we have indoor games like
                  Table Tenis, Carrom, Chess etc. and outdoor games as well like
                  Badminton, Cricket, Football, Volleyball to name a few.
                </p>
              </div>
              <div className={`col-12 col-md-5 offset-md-1 `}>
                <img alt="hostel image"
                  className={`img-fluid ${styles.image}`}
                  src="/hostel/hostel_inside.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={modal}>
        <ModalBody>
          <span
            className="fa fa-close fa-lg"
            onClick={() => setModal(!modal)}
          ></span>
          <form   onSubmit={(e) =>{post_submit(e,flag, header, content, image);}}>
            <div className="form-group">
              <label for="header">
                <b>Header</b>
              </label>
              <input
                type="text"
                className="form-control"
                id="header"
                onChange={(e) => setHeader(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label for="content">
                <b>Content</b>
              </label>
              <textarea
                type="text"
                rows="5"
                className="form-control"
                id="content"
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label for="image">
                <b>Image</b>
              </label>
              <input
                type="file"
                className="form-control"
                id="image"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Post
            </button>
          </form>
        </ModalBody>
      </Modal>
      <div className={styles.activities_achievements}>
        <div className="row">
          <div className="col-12 col-md-6">
            <h2 className={styles.box_header}>
              Activities throughout the year
            </h2>
          </div>
          <div className="col-12 col-md-1 offset-md-5">
            {activities.length < 6 && loggedIn ? (
              <i
                className="fa fa-plus fa-lg"
                onClick={() => {
                  setFlag("activities_post");
                  setModal(!modal);
                }}
              ></i>
            ) : (
              <div></div>
            )}
          </div>
          <div className="row">
            <div className="col-12">
              <div className={styles.flex_container}>
                {activities.map((activity) => {
                  const [edit, setEdit] = useState(false);
                  if (!edit) {
                    return (
                      <div key={activity._id}
                        className={styles.flex_content}
                        style={{
                          backgroundImage: `url(${
                            activity.image ??
                            "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Jorhat_Engineering_College_%2C_Jorhat_%2C_Assam%2C_India_-_Vikramjit_Kakati_2012.jpg/700px-Jorhat_Engineering_College_%2C_Jorhat_%2C_Assam%2C_India_-_Vikramjit_Kakati_2012.jpg"
                          }`,
                        }}
                      >
                        {loggedIn ? (
                          <i
                            className="fa fa-edit fa-lg"
                            onClick={() => setEdit(!edit)}
                          ></i>
                        ) : (
                          <div></div>
                        )}
                        <h1 className={styles.content_shadow_header}>{activity.Header}</h1>
                        <small className={styles.content_shadow}>
                          {activity.Content}
                        </small>
                        <br></br>
                        {loggedIn ? (
                          <i
                            className="fa fa-trash fa-lg" style={{color:'white'}}
                            onClick={(e) => delete_activity(e,activity._id, activity.Public_id)}
                          ></i>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    );
                  }
                  return (
                    <div key={activity._id} className={styles.flex_content}>
                      <div className="row">
                        <div className="col-12">
                          <i
                            className="fa fa-close fa-lg"
                            onClick={() => setEdit(!edit)}
                          ></i>
                          <form
                            onSubmit={(e) =>
                              handleSubmit_activities(e,
                                activity._id,
                                header ?? activity.Header,
                                content ?? activity.Content,
                                image,
                                activity.Public_id??null
                              )
                            }
                          >
                            <div className="form-group">
                              <label for="header">
                                <b>Header</b>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder={activity.Header}
                                id="header"
                                onChange={(e) => setHeader(e.target.value)}
                              />
                            </div>
                            <div className="form-group">
                              <label for="content">
                                <b>Content</b>
                              </label>
                              <textarea
                                type="text"
                                rows="5"
                                className="form-control"
                                placeholder={activity.Content}
                                id="content"
                                onChange={(e) => setContent(e.target.value)}
                              />
                            </div>
                            <div className="form-group">
                              <label for="image">
                                <b>Image</b>
                              </label>
                              <input
                                type="file"
                                className="form-control"
                                id="image"
                                onChange={(e) => setImage(e.target.files[0])}
                              />
                            </div>
                            <button type="submit" className="btn btn-primary">
                              Edit
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.activities_achievements}>
        <div className="row">
          <div className="col-12 col-md-6">
            <h2 className={styles.box_header}>Previous Achievements</h2>
          </div>
          <div className="col-12  col-md-1 offset-md-5">
            {achievements.length < 6 && loggedIn ? (
              <i
                className="fa fa-plus fa-lg"
                onClick={() => {
                  setFlag("achievements_post");
                  setModal(!modal);
                }}
              ></i>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className={styles.flex_container}>
              {achievements.map((activity) => {
                const [edit, setEdit] = useState(false);
                if (!edit) {
                  return (
                    <div key={activity._id}
                      className={styles.flex_content}
                      style={{
                        backgroundImage: `url(${
                          activity.image ??
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Jorhat_Engineering_College_%2C_Jorhat_%2C_Assam%2C_India_-_Vikramjit_Kakati_2012.jpg/700px-Jorhat_Engineering_College_%2C_Jorhat_%2C_Assam%2C_India_-_Vikramjit_Kakati_2012.jpg"
                        }`,
                      }}
                    >
                      {loggedIn ? (
                        <i
                          className="fa fa-edit fa-lg"
                          onClick={() => setEdit(!edit)}
                        ></i>
                      ) : (
                        <div></div>
                      )}
                      <h1 className={styles.content_shadow_header}>{activity.Header}</h1>
                      <small className={styles.content_shadow}>
                        {activity.Content}
                      </small>
                      <br></br>
                      {loggedIn ? (
                        <i
                          className="fa fa-trash fa-lg" style={{color:'white'}}
                          onClick={(e) => delete_achievement(e,activity._id,activity.Public_id)}
                        ></i>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  );
                }
                return ( 
                  <div  key={activity._id} className={styles.flex_content}>
                    <div className="row">
                      <div className="col-12">
                        <i
                          className="fa fa-close fa-lg"
                          onClick={() => setEdit(!edit)}
                        ></i>
                        <form
                          onSubmit={(e) =>
                            handleSubmit(e,
                              activity._id,
                              header ?? activity.Header,
                              content ?? activity.Content,
                              image??null,
                              activity.Public_id??null
                            )
                          }
                        >
                          <div className="form-group">
                            <label for="header">
                              <b>Header</b>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder={activity.Header}
                              id="header"
                              onChange={(e) => setHeader(e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <label for="content">
                              <b>Content</b>
                            </label>
                            <textarea
                              type="text"
                              rows="5"
                              className="form-control"
                              placeholder={activity.Content}
                              id="content"
                              onChange={(e) => setContent(e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <label for="image">
                              <b>Image</b>
                            </label>
                            <input
                              type="file"
                              className="form-control"
                              id="image"
                              onChange={(e) => setImage(e.target.files[0])}
                            />
                          </div>
                          <button type="submit" className="btn btn-primary">
                            Edit
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={monitor_post}>
        <ModalBody>
          <i
            className="fa fa-close fa-lg"
            onClick={() => setMonitor(!monitor_post)}
          ></i>
          <form
            onSubmit={(e) =>
              post_monitor(e,name, designation, quote, phone, image)
            }
          >
            <div className="form-group">
              <label for="header">
                <b>Name</b>
              </label>
              <input
                type="text"
                className="form-control"
                id="header"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label for="content">
                <b>Designation</b>
              </label>
              <textarea
                type="text"
                rows="5"
                className="form-control"
                id="content"
                onChange={(e) => setDesignation(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label for="content">
                <b>Words From Them</b>
              </label>
              <textarea
                type="text"
                rows="5"
                className="form-control"
                id="content"
                onChange={(e) => setQuote(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label for="phone">
                <b>Phone</b>
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label for="image">
                <b>Image</b>
              </label>
              <input
                type="file"
                className="form-control"
                id="image"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Post
            </button>
          </form>
        </ModalBody>
      </Modal>
      <div className={styles.container}>
        <div className="row">
          <div className="col-12 col-md-5">
            <h2 className={styles.box_header}>From present Monitors,</h2>
          </div>
          <div className="col-12 col-md-1 offset-md-5">
            {monitors.length < 5 && loggedIn ? (
              <i
                className="fa fa-plus fa-lg"
                onClick={() => {
                  setMonitor(!monitor_post);
                }}
              ></i>
            ) : (
              <div></div>
            )}
          </div>
          <div className="row">
            <div className="col-12">
              <div className={styles.flex_container}>
                {monitors.map((monitor) => {
                  const [edit_monitor, setEdit] = useState(false);
                  if (!edit_monitor) {
                    return (
                      <div key={monitor._id} className={styles.flex_content_monitor}>
                        <div className="container">
                          <div className="row">
                            <div className="col-12 col-md-6 order-md-2">
                              <img alt="hostel image"
                                className={`img-fluid ${styles.image}`}
                                src={
                                  monitor.image ?? "/hostel/hostel_inside.jpg"
                                }
                              />
                            </div>
                            <div className="col-12 col-md-6 order-md-1">
                              {loggedIn ? (
                                <i
                                  className="fa fa-edit fa-lg"
                                  onClick={() => setEdit(!edit_monitor)}
                                ></i>
                              ) : (
                                <div></div>
                              )}
                              <h2>"{monitor.Quote}"</h2>
                              <br></br>
                              <h5>{monitor.Name},</h5>
                              <small>{monitor.Designation}</small>
                              <br></br>
                              {loggedIn ? (
                                <i
                                  className="fa fa-trash fa-lg"
                                  onClick={(e) => delete_monitor(e,monitor._id, monitor.Public_id)}
                                ></i>
                              ) : (
                                <div></div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div key={monitor._id} className={styles.flex_content_monitor}>
                      <div className="row">
                        <div className="col-12">
                          <i
                            className="fa fa-close fa-lg"
                            onClick={() => setEdit(!edit_monitor)}
                          ></i>
                          <form
                            onSubmit={(e) =>
                              handleSubmit_monitors(e,
                                monitor._id,
                                name ?? monitor.Name,
                                designation ?? monitor.Designation,
                                quote ?? monitor.Quote,
                                phone ?? monitor.Phone,
                                image,
                                monitor.Public_id??null
                              )
                            }
                          >
                            <div className="form-group">
                              <label for="header">
                                <b>Name</b>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder={monitor.Name}
                                id="header"
                                onChange={(e) => setName(e.target.value)}
                              />
                            </div>
                            <div className="form-group">
                              <label for="content">
                                <b>Designation</b>
                              </label>
                              <textarea
                                type="text"
                                rows="5"
                                className="form-control"
                                placeholder={monitor.Designation}
                                id="content"
                                onChange={(e) => setDesignation(e.target.value)}
                              />
                            </div>
                            <div className="form-group">
                              <label for="content">
                                <b>Words From Them</b>
                              </label>
                              <textarea
                                type="text"
                                rows="5"
                                className="form-control"
                                placeholder={monitor.Quote}
                                id="content"
                                onChange={(e) => setQuote(e.target.value)}
                              />
                              <div className="form-group">
                                <label for="phone">
                                  <b>Phone</b>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder={monitor.Phone ?? " "}
                                  id="phone"
                                  onChange={(e) => setPhone(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="form-group">
                              <label for="image">
                                <b>Image</b>
                              </label>
                              <input
                                type="file"
                                className="form-control"
                                id="image"
                                onChange={(e) => setImage(e.target.files[0])}
                              />
                            </div>
                            <button type="submit" className="btn btn-primary">
                              Edit
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterPage />
      <style jsx global>{`
        h2,
        p,
        small {
          font-family: "Raleway", sans-serif;
        }

        h5,
        h1 {
          font-family: "Raleway", sans-serif;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
      }
}

export async function getServerSideProps(context) {
  const { client, db } = await connectToDatabase();

  const isConnected = await client.isConnected();
  const activities = await db.collection("Activities").find({}).toArray();
  const activities_props = JSON.parse(JSON.stringify(activities));

  const achievements = await db.collection("Achievements").find({}).toArray();
  const achievements_props = JSON.parse(JSON.stringify(achievements));

  const monitors = await db.collection("Monitors").find({}).toArray();
  const monitors_props = JSON.parse(JSON.stringify(monitors));

  return {
    props: {
      isConnected: isConnected,
      activities: activities_props,
      achievements: achievements_props,
      monitors: monitors_props,
    },
  };
}
