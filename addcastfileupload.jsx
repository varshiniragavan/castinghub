import axios from "axios";
import { useState } from "react";
import SideNav from "./Sidenav";
const Addcastfileupload = () => {
  const [Crid, setCrid] = useState("");
  const [Fileupload, setFileupload] = useState("");
  const [Status, setStatus] = useState("");
  const [Description, setDescription] = useState("");
  const submitdata = () => {
    const value = {
      crid: Crid,
      fileupload: Fileupload,
      status: Status,
      description: Description,
    };
    axios
      .post("http://localhost:5000/moviecast/insertcastfileupload", value)
      .then((res) => {
        alert("success");
        setCrid("");
        setFileupload("");
        setStatus("");
        setDescription("");
      });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Side Navigation */}
        <div className="col-3 ">
          <SideNav />
        </div>
        <div className="col-9 ">
          <h1 style={{ textAlign: "center" }}>Add castfileupload</h1>
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
      </div>
    </div>
  );
};
export default Addcastfileupload;
