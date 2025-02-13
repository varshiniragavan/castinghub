import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SideNav from "./Sidenav";
const Updatecastfileupload = () => {
  var rx = 0;
  const { state } = useLocation();
  const nav = useNavigate();
  const [Cfid, setCfid] = useState(state[rx++]);
  const [Crid, setCrid] = useState(state[rx++]);
  const [Fileupload, setFileupload] = useState(state[rx++]);
  const [Status, setStatus] = useState(state[rx++]);
  const [Description, setDescription] = useState(state[rx++]);
  const submitdata = () => {
    const value = {
      cfid: Cfid,
      crid: Crid,
      fileupload: Fileupload,
      status: Status,
      description: Description,
    };
    axios
      .post("http://localhost:5000/moviecast/updatecastfileupload", value)
      .then((response) => {
        nav("/viewcastfileupload");
      });
  };
  return (
    <div>
      <SideNav />
      <h1>Add castfileupload</h1>
      <div className="form-floating mb-3 mt-3">
        <input
          type="text"
          className="form-control"
          onChange={(e) => setCfid(e.target.value)}
          value={Cfid}
          placeholder="Enter Cfid"
        />
        <label htmlFor="Cfid">Cfid</label>
      </div>

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
          onChange={(e) => setFileupload(e.target.value)}
          value={Fileupload}
          placeholder="Enter Fileupload"
        />
        <label htmlFor="Fileupload">Fileupload</label>
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

      <div className="form-floating mb-3 mt-3">
        <input
          type="text"
          className="form-control"
          onChange={(e) => setDescription(e.target.value)}
          value={Description}
          placeholder="Enter Description"
        />
        <label htmlFor="Description">Description</label>
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
export default Updatecastfileupload;
