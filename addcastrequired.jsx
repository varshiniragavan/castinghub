import axios from "axios";
import { useState } from "react";
import SideNav from "./Sidenav";
const Addcastrequired = () => {
  const [Castname, setCastname] = useState("");
  const [Role, setRole] = useState("");
  const [Totalnoofuser, setTotalnoofuser] = useState("");
  const [Cmid, setCmid] = useState("");
  const [Status, setStatus] = useState("");
  const submitdata = () => {
    const value = {
      castname: Castname,
      role: Role,
      totalnoofuser: Totalnoofuser,
      cmid: Cmid,
      status: Status,
    };
    axios
      .post("http://localhost:5000/moviecast/insertcastrequired", value)
      .then((res) => {
        alert("success");
        setCastname("");
        setRole("");
        setTotalnoofuser("");
        setCmid("");
        setStatus("");
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
          <h1 style={{ textAlign: "center" }}>Add castrequired</h1>
          <div className="form-floating mb-3 mt-3">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setCastname(e.target.value)}
              value={Castname}
              placeholder="Enter Castname"
            />
            <label htmlFor="Castname">Castname</label>
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
              onChange={(e) => setTotalnoofuser(e.target.value)}
              value={Totalnoofuser}
              placeholder="Enter Totalnoofuser"
            />
            <label htmlFor="Totalnoofuser">Totalnoofuser</label>
          </div>

          <div className="form-floating mb-3 mt-3">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setCmid(e.target.value)}
              value={Cmid}
              placeholder="Enter Cmid"
            />
            <label htmlFor="Cmid">Cmid</label>
          </div>

          <div className="form-floating mb-3 mt-3">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setStatus(e.target.value)}
              value={Status}
              placeholder="Enter Status"
            />
            <label htmlFor="Status">Status</label>
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
export default Addcastrequired;
