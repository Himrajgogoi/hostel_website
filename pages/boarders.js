import React, { useState, useEffect } from "react";
import Head from "next/head";
import Footer from "../shared/Footer";
import styles from "../styles/Boarders.module.css";
import axios from "axios";
import { Loader } from "../shared/Loader";
import {Modal, ModalBody} from "reactstrap";
import fire from "../config/fire_config";

function boarders() {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [searched, setSearch] = useState([]);
  const [word, setWord] = useState("");
  const [modal,setModal] = useState(false);
  const [loggedIn,setLoggedIn] = useState(false);
  const [post,setPost] = useState('post');
  
  //user data
  const [username,setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password,setPassword] = useState(null);
  const [phone,setPhone] = useState(null);
  const [batch,setBatch] = useState(null);
  const [branch,setBranch] = useState(null);
  const [currently_at, setCurrentlyAt] = useState(null);
  const [uid,setUid] = useState(null);

  

  useEffect(() => {
    axios
    .get("/api/getBoarders")
    .then((res) => {
        setData(res.data);
        setLoading(false);
    })
    .catch((error) => {
        console.log(error.message);
    });

    if(loggedIn){
        axios.get(`/api/user_handler?uid=${uid}`)
        .then(res=>{
          setUsername(res.data.name);
          setEmail(res.data.email);
          setPhone(res.data.phone);
          setBatch(res.data.batch);
          setBranch(res.data.branch);
          setCurrentlyAt(res.data.currently_at);
        })
    }
  }, [loggedIn]);

  /// checking the user
  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      if(user.uid !== process.env.USER_ID){
        setUid(user.uid);
        setLoggedIn(true);
      }
    } else {
      setLoggedIn(false);
    }
  });

  /// posting new boarder
  const handlePost = () =>{
    if(username && email && 
      password && phone && 
      batch && branch && 
      currently_at){
          var body = {
             username: username,
             email: email,
             password: password,
             phone: phone,
             batch: batch,
             branch: branch,
             currently_at: currently_at
          };

          axios.post("/api/user_handler", body)
          .then(res=>{
            alert('added successfully. Note: if same email provided, it will fail!');
            window.location.reload();
          })
          .catch(err=>{
            alert('an error occured.');
            window.location.reload();
          });

    }
    else{
      alert('some fields are missing');
    }
  }

  /// editing user data
  const handleUpdate = () =>{
    var data = {
      username: username,
      email: email,
      phone: phone,
      batch: batch,
      branch: branch,
      currently_at: currently_at,
      uid: uid,
   };

   axios.put("/api/user_handler", data)
   .then(res=>{
    alert('updated successfully');
    window.location.reload();
   })
   .catch(err=>{
     alert('an error occured.');
     window.location.reload();
   });

  }

  
  /// search algo
  const makepattern = (word) => {
    let splitted = word.split("");
    let pattern = "";
    splitted.forEach((letter) => {
      pattern += letter + ".*";
    });
    return pattern + "";
  };

  const search = (item) => {
    let pattern = makepattern(item.toLowerCase());
    let re = new RegExp(pattern, "i");
    setSearch(
      data.filter((element) => {
        let found = re.exec(element.name);
        return found ? true : false;
      })
    );
  };

  if (loading) {
    return (
      <div>
        <Head>
          <title>Octave | boarders</title>
        </Head>
        <Loader />
        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <Head>
          <title>Octave | boarders</title>
        </Head>
        <div className="container">
          <Modal isOpen={modal}>
            <ModalBody>
              <span
                className="fa fa-close fa-lg"
                onClick={() => setModal(!modal)}
              ></span>
              <form>
                {post=== "post"?<div>
                <div className="form-group">
                    <label for="email">Email for authentication</label> 
                    <input type="email" id="email" className="form-control" onChange={e=>setEmail(e.target.value)}/>
                </div>
                 <div className="form-group">
                 <label for="password">Password for authentication</label> 
                 <input type="password" id="password" className="form-control" onChange={e=>setPassword(e.target.value)}/>
             </div>
                </div>:<></>}
                 <div className="form-group" style={{borderBottom:'1px solid grey'}}></div>
                <div className="form-group">
                    <label for="username">Username</label> 
                    <input type="text" id="username" placeholder={username} className="form-control" onChange={e=>setUsername(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label for="phone">Phone</label> 
                    <input type="text" id="phone" placeholder={phone} className="form-control" onChange={e=>setPhone(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label for="batch">Batch</label> 
                    <input type="text" id="batch" placeholder={batch} className="form-control" onChange={e=>setBatch(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label for="branch">Branch</label> 
                    <input type="text" id="branch" placeholder={branch} className="form-control" onChange={e=>setBranch(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label for="currently_at">Currently At</label> 
                    <input type="text" id="currently_at" placeholder={currently_at} className="form-control" onChange={e=>setCurrentlyAt(e.target.value)}/>
                </div>
                <button type="button" onClick={post === 'post'? handlePost:handleUpdate} className="btn btn-primary">
                  Post/Update
                </button>
              </form>
            </ModalBody>
          </Modal>
          <div className="row">
            <div
              className={`${styles.hover_underline_animation} col-12 col-md-4` }
            >
              <h2>Previous/Current Boarders</h2>
            </div>
            <div className="col-10 col-md-3">
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="search for a boarder"
                    className="form-control"
                    onChange={(e) => setWord(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="col-1 col-md-1">
              <i
                className="fa fa-search fa-lg"
                onClick={() => search(word)}
              ></i>
            </div>
            {loggedIn?<></>:<div className="col-6 col-md-2">
              <button className="btn btn-outline-success" onClick={()=>{
                setPost('post');
                setModal(!modal)
              }}>Sign Up</button>
            </div>}
            {loggedIn?  <div className="col-6 col-md-2">
              <button className="btn btn-outline-primary" onClick={()=>{
                setPost('update');
                setModal(!modal)
              }}>Edit</button>
            </div>:<></>}
          </div>
        </div>
        {
          searched.length >0?  
          <div>
              <div className="container">
               <h2>Search Result</h2>
            </div>
          <div className={`${styles.search_container} table-responsive`}>
          <table className="table table-bordered table-striped table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Name</th>
                <th>Batch</th>
                <th>Branch</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Currently At</th>
              </tr>
            </thead>
            <tbody>
              {searched.map((boarder, index) => (
                <tr key={index}>
                  <td>{boarder.name}</td>
                  <td>{boarder.batch}</td>
                  <td>{boarder.branch}</td>
                  <td>{boarder.phone}</td>
                  <td>{boarder.email}</td>
                  <td>{boarder.currently_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
          </div>:<></>
        }
        <div className={`${styles.container} table-responsive`}>
          <table className="table table-bordered table-striped table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Name</th>
                <th>Batch</th>
                <th>Branch</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Currently At</th>
              </tr>
            </thead>
            <tbody>
              {data.map((boarder, index) => (
                <tr key={index}>
                  <td>{boarder.name}</td>
                  <td>{boarder.batch}</td>
                  <td>{boarder.branch}</td>
                  <td>{boarder.phone}</td>
                  <td>{boarder.email}</td>
                  <td>{boarder.currently_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Footer />
      </div>
    );
  }
}

export default boarders;
