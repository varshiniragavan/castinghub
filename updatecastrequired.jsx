import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SideNav from "./Sidenav";
const Updatecastrequired = () => {
  var rx = 0;
  const { state } = useLocation();
  const nav = useNavigate();
  const [Crid, setCrid] = useState(state[rx++]);
  const [Castname, setCastname] = useState(state[rx++]);
  const [Role, setRole] = useState(state[rx++]);
  const [Totalnoofuser, setTotalnoofuser] = useState(state[rx++]);
  const [Cmid, setCmid] = useState(state[rx++]);
  const [Status, setStatus] = useState(state[rx++]);
  const submitdata = () => {
    const value = {
      crid: Crid,
      castname: Castname,
      role: Role,
      totalnoofuser: Totalnoofuser,
      cmid: Cmid,
      status: Status,
    };
    axios
      .post("http://localhost:5000/moviecast/updatecastrequired", value)
      .then((response) => {
        nav("/viewcastrequired");
      });
  };
  return (
    <div>
      <SideNav />
      <h1>Add castrequired</h1>
      <div className="form-floating mb-3 mt-3">
        <input
          type="text"
          className="form-control"
          onChange={(e) => setCrid(e.target.value)}
          value={Crid}
          placeholder="Enter Crid"
        />
        <label htmlFor="Crid">Crid</label>
      </div>

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
  );
};
export default Updatecastrequired;
