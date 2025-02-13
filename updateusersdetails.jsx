import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SideNav from "./Sidenav";
const Updateusersdetails = () => {
  var rx = 0;
  const { state } = useLocation();
  const nav = useNavigate();
  const [Uid, setUid] = useState(state[rx++]);
  const [Name, setName] = useState(state[rx++]);
  const [Mobile, setMobile] = useState(state[rx++]);
  const [Email, setEmail] = useState(state[rx++]);
  const [Role, setRole] = useState(state[rx++]);
  const [Approved, setApproved] = useState(state[rx++]);
  const [Profilepic, setProfilepic] = useState(state[rx++]);
  const [Videoname, setVideoname] = useState(state[rx++]);
  const submitdata = () => {
    const value = {
      uid: Uid,
      name: Name,
      mobile: Mobile,
      email: Email,
      role: Role,
      approved: Approved,
      profilepic: Profilepic,
      videoname: Videoname,
    };
    axios
      .post("http://localhost:5000/moviecast/updateusersdetails", value)
      .then((response) => {
        nav("/viewusersdetails");
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
          <h1>Add usersdetails</h1>
          <div className="form-floating mb-3 mt-3">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setUid(e.target.value)}
              value={Uid}
              placeholder="Enter Uid"
            />
            <label htmlFor="Uid">Uid</label>
          </div>

          <div className="form-floating mb-3 mt-3">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
              value={Name}
              placeholder="Enter Name"
            />
            <label htmlFor="Name">Name</label>
          </div>

          <div className="form-floating mb-3 mt-3">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setMobile(e.target.value)}
              value={Mobile}
              placeholder="Enter Mobile"
            />
            <label htmlFor="Mobile">Mobile</label>
          </div>

          <div className="form-floating mb-3 mt-3">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              value={Email}
              placeholder="Enter Email"
            />
            <label htmlFor="Email">Email</label>
          </div>

          <div className="form-floating mb-3 mt-3">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setRole(e.target.value)}
              value={Role}
              placeholder="Enter Role"
            />
            <label htmlFor="Role">Role</label>
          </div>

          <div className="form-floating mb-3 mt-3">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setApproved(e.target.value)}
              value={Approved}
              placeholder="Enter Approved"
            />
            <label htmlFor="Approved">Approved</label>
          </div>

          <div className="form-floating mb-3 mt-3">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setProfilepic(e.target.value)}
              value={Profilepic}
              placeholder="Enter Profilepic"
            />
            <label htmlFor="Profilepic">Profilepic</label>
          </div>

          <div className="form-floating mb-3 mt-3">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setVideoname(e.target.value)}
              value={Videoname}
              placeholder="Enter Videoname"
            />
            <label htmlFor="Videoname">Videoname</label>
          </div>

          <input
            type="submit"
            className="btn btn-primary"
            onClick={submitdata}
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};
export default Updateusersdetails;
