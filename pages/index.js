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

  const [flag, setFlag] = useState(null);
  const [modal, setModal] = useState(false);
  const [monitor_post, setMonitor] = useState(false);


  ///check user
  const[loggedIn, setLoggedIn] = useState(false);

  fire.auth().onAuthStateChanged((user)=>{
    if(user){
      console.log("user called");
      setLoggedIn(true);
    }
    else{
      setLoggedIn(false);
    }
  })

  
  const post_submit = async (flag, header, content, image) => {
    
    const form = new FormData();
    form.append('header', header);
    form.append('content', content);
    form.append('image', image);


    if (flag === "activities_post") {
      const data = await fetch("/api/edit_activities", {
        method: "POST",
        body: form
      });
    } 
    
    else if (flag === "achievements_post") {
      const data = await fetch("/api/edit", {
        method: "POST",
        body: form
      });
    }
  };

  const post_monitor = async (name, designation, quote, image) => {
   
    const form = new FormData();
    form.append('name', name);
    form.append('designation', designation);
    form.append('quote', quote);
    form.append('image', image);
    


    const data = await fetch("/api/edit_monitors", {
      method: "POST",
      body:form
    });
  };

  const handleSubmit = async (id, header, content,image) => {
    
    const form = new FormData();
    form.append('id',id);
    form.append('header', header);
    form.append('content', content);
    form.append('image', image);

    const data = await fetch("/api/edit", {
      method: "PATCH",
      body: form
    });
  };

  const handleSubmit_activities = async (id, header, content, image) => {
   
    const form = new FormData();
    form.append('id',id);
    form.append('header', header);
    form.append('content', content);
    form.append('image', image);
    const data = await fetch("/api/edit_activities", {
      method: "PATCH",
      body: form,
    });
  };

  const handleSubmit_monitors = async (id, name, designation, quote, image) => {
    
    const form = new FormData();
    form.append('id', id)
    form.append('name', name);
    form.append('designation', designation);
    form.append('quote', quote);
    form.append('image', image);

    const data = await fetch("/api/edit_monitors", {
      method: "PATCH",
      body: form
    });
  };
  if (!isConnected) {
    return (
      <div>
        <Head>
          <title>Octave | home</title>
        </Head>
        <Header />
        <div className="container">
          <p style={{ textAlign: "center" }}>
            Could not connect to the server. Try checking your internet
            connection!
          </p>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Head>
        <title>Octave | home</title>
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
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                sit amet, consectetur, adipisci velit, sed quia non numquam eius
                modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem. Ut enim ad minima veniam, quis nostrum
                exercitationem ullam corporis suscipit laboriosam, nisi ut
                aliquid ex ea commodi consequatur? Quis autem vel eum iure
                reprehenderit qui in ea voluptate velit esse quam nihil
                molestiae consequatur, vel illum qui dolorem eum fugiat quo
                voluptas nulla pariatur?"
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
                <img
                  className={`img-fluid ${styles.image}`}
                  src="/hostel/hostel_sidegate.jpg"
                />
              </div>
              <div className="col-12 col-md-6 offset-md-1">
                <div>
                  <p>
                    "Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto beatae vitae dicta sunt explicabo. Nemo
                    enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                    aut fugit, sed quia consequuntur magni dolores eos qui
                    ratione voluptatem sequi nesciunt. Neque porro quisquam est,
                    qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
                    velit, sed quia non numquam eius modi tempora incidunt ut
                    labore et dolore magnam aliquam quaerat voluptatem. Ut enim
                    ad minima veniam, quis nostrum exercitationem ullam corporis
                    suscipit laboriosam, nisi ut aliquid ex ea commodi
                    consequatur? Quis autem vel eum iure reprehenderit qui in ea
                    voluptate "
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
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem
              </p>
              <img
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
                  "Sed ut perspiciatis unde omnis iste natus error sit
                  voluptatem accusantium doloremque laudantium, totam rem
                  aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                  architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
                  voluptatem quia voluptas sit aspernatur aut odit aut fugit,
                  sed quia consequuntur magni dolores eos qui ratione voluptatem
                  sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
                  quia dolor sit amet, consectetur, adipisci velit, sed quia non
                  numquam eius modi tempora incidunt ut labore et dolore magnam
                  aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
                  nostrum exercitationem ullam corporis suscipit laboriosam,
                  nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum
                  iure reprehenderit qui in ea voluptate "
                </p>
              </div>
              <div className={`col-12 col-md-5 offset-md-1 `}>
                <img
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
          <form onSubmit={() => post_submit(flag, header, content, image)}>
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
              <input type="file" className="form-control" id="image"  onChange={e=> setImage(e.target.files[0])}/>
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
            {activities.length < 4 && loggedIn? (
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
                      <div className={styles.flex_content}>
                        {loggedIn? <i
                          className="fa fa-edit fa-lg"
                          onClick={() => setEdit(!edit)}
                        ></i>:<div></div>}
                        <h1 className={styles.content}>{activity.Header}</h1>
                        <small className={styles.content}>
                          {activity.Content}
                        </small>
                      </div>
                    );
                  }
                  return (
                    <div className={styles.flex_content}>
                      <div className="row">
                        <div className="col-12">
                          <i
                            className="fa fa-close fa-lg"
                            onClick={() => setEdit(!edit)}
                          ></i>
                          <form
                            onSubmit={() =>
                              handleSubmit_activities(
                                activity._id,
                                header ?? activity.Header,
                                content ?? activity.Content,
                                image
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
                                onChange={e=>setImage(e.target.files[0])}
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
            {achievements.length < 4 && loggedIn? (
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
                    <div className={styles.flex_content} >
                      {loggedIn? <i
                          className="fa fa-edit fa-lg"
                          onClick={() => setEdit(!edit)}
                        ></i>:<div></div>}
                      <h1 className={styles.content}>{activity.Header}</h1>
                      <small className={styles.content}>
                        {activity.Content}
                      </small>
                    </div>
                  );
                }
                return (
                  <div className={styles.flex_content}>
                    <div className="row">
                      <div className="col-12">
                        <i
                          className="fa fa-close fa-lg"
                          onClick={() => setEdit(!edit)}
                        ></i>
                        <form
                          onSubmit={() =>
                            handleSubmit(
                              activity._id,
                              header ?? activity.Header,
                              content ?? activity.Content,
                              image
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
                              onChange={e=>setImage(e.target.files[0])}
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
        <i className="fa fa-close fa-lg" onClick={() => setMonitor(!monitor_post)}></i>
          <form
            onSubmit={() =>
              post_monitor(name,designation,quote, image)
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
              <label for="image">
                <b>Image</b>
              </label>
              <input type="file" className="form-control" id="image"  onChange={e=>setImage(e.target.files[0])}/>
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
            {activities.length < 4 && loggedIn? (
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
                  const [edit, setEdit] = useState(false);
                  if (!edit) {
                    return (
                      <div className={styles.flex_content_monitor}>
                        <div className="container">
                          <div className="row">
                            <div className="col-12 col-md-6 order-md-2">
                              <img
                                className={`img-fluid ${styles.image}`}
                                src="/hostel/hostel_inside.jpg"
                              />
                            </div>
                            <div className="col-12 col-md-6 order-md-1">
                              {loggedIn?<i
                                className="fa fa-edit fa-lg"
                                onClick={() => setEdit(!edit)}
                              ></i>:<div></div>}
                              <h2>"{monitor.Quote}"</h2>
                              <br></br>
                              <h5>{monitor.Name},</h5>
                              <small>{monitor.Designation}</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div className={styles.flex_content_monitor}>
                      <div className="row">
                        <div className="col-12">
                          <i
                            className="fa fa-close fa-lg"
                            onClick={() => setEdit(!edit)}
                          ></i>
                          <form
                            onSubmit={() =>
                              handleSubmit_monitors(
                                monitor._id,
                                name ?? monitor.Name,
                                designation ?? monitor.Designation,
                                quote ?? monitor.Quote,
                                image
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
                            </div>
                            <div className="form-group">
                              <label for="image">
                                <b>Image</b>
                              </label>
                              <input
                                type="file"
                                className="form-control"
                                id="image"
                                onChange={e=>setImage(e.target.files[0])}
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
      <Footer />
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
