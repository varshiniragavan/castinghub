import axios from "axios";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import SideNav from "./Sidenav";

const Addusersdetails = () => {
  const [Name, setName] = useState("");
  const [Mobile, setMobile] = useState("");
  const [Email, setEmail] = useState("");
  const [Role, setRole] = useState("Director");
  const [Profilepic, setProfilepic] = useState(null);
  const [Videoname, setVideoname] = useState(null);
  const [password, setpassword] = useState("");
  const [des, setdes] = useState("");

  const handleFileChange = (e, setter) => {
    setter(e.target.files[0]);
  };

  const submitdata = () => {
    const formData = new FormData();
    formData.append("name", Name);
    formData.append("mobile", Mobile);
    formData.append("email", Email);
    formData.append("role", Role);
    formData.append("profilepic", Profilepic);
    formData.append("videoname", Videoname);
    formData.append("password", password);
    formData.append("des", des);
    axios
      .post("http://localhost:5000/moviecast/insertusersdetails", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        alert("Success: " + res.data.message);
        setName("");
        setMobile("");
        setEmail("");
        setRole("Director");
        setProfilepic(null);
        setVideoname(null);
        setpassword("");
        setdes("");
      })
      .catch((err) => {
        alert("Error: " + err.message);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Side Navigation */}
        <div className="col-2 ">
          <SideNav />
        </div>
        <div className="col-10 ">
          <h1 style={{ textAlign: "center" }}>Add User Details</h1>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
              value={Name}
              placeholder="Enter Name"
            />
            <label htmlFor="Name">Name</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="number"
              className="form-control"
              onChange={(e) => setMobile(e.target.value)}
              value={Mobile}
              placeholder="Enter Mobile"
            />
            <label htmlFor="Mobile">Mobile</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              value={Email}
              placeholder="Enter Email"
            />
            <label htmlFor="Email">Email</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              onChange={(e) => setpassword(e.target.value)}
              value={password}
              placeholder="Enter password"
            />
            <label htmlFor="password">password</label>
          </div>

          <div className="form-floating mb-3">
            <select
              className="form-control"
              onChange={(e) => setRole(e.target.value)}
              value={Role}
            >
              <option>Director</option>
              <option>Actor</option>
              <option>Actress</option>
            </select>
            <label htmlFor="Role">Role</label>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="Profilepic">Profile Picture</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => handleFileChange(e, setProfilepic)}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="Videoname">Video File</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => handleFileChange(e, setVideoname)}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="Description">Description</label>
            <textarea
              value={des}
              onChange={(e) => {
                setdes(e.target.value);
              }}
              placeholder="Description"
            ></textarea>
          </div>

          <button className="btn btn-primary w-100" onClick={submitdata}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Addusersdetails;
