import axios from "axios";
import { useState } from "react";
import SideNav from "./Sidenav";
const Addcastformovie = () => {
  const [Moviename, setMoviename] = useState("");
  const [Movieimage, setMovieimage] = useState("");
  const [Description, setDescription] = useState("");
  const [Movieplanned, setMovieplanned] = useState("");
  const [Moviereleased, setMoviereleased] = useState("");
  const [Postdate, setPostdate] = useState("");
  const [Status, setStatus] = useState("");
  const submitdata = () => {
    const value = {
      moviename: Moviename,
      movieimage: Movieimage,
      description: Description,
      movieplanned: Movieplanned,
      moviereleased: Moviereleased,
      postdate: Postdate,
      status: Status,
    };
    axios
      .post("http://localhost:5000/moviecast/insertcastformovie", value)
      .then((res) => {
        alert("success");
        setMoviename("");
        setMovieimage("");
        setDescription("");
        setMovieplanned("");
        setMoviereleased("");
        setPostdate("");
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
          <h1 style={{ textAlign: "center" }}>Add castformovie</h1>
          <div className="form-floating mb-3 mt-3">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setMoviename(e.target.value)}
              value={Moviename}
              placeholder="Enter Moviename"
            />
            <label htmlFor="Moviename">Moviename</label>
          </div>

          <div className="form-floating mb-3 mt-3">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setMovieimage(e.target.value)}
              value={Movieimage}
              placeholder="Enter Movieimage"
            />
            <label htmlFor="Movieimage">Movieimage</label>
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

          <div className="form-floating mb-3 mt-3">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setMovieplanned(e.target.value)}
              value={Movieplanned}
              placeholder="Enter Movieplanned"
            />
            <label htmlFor="Movieplanned">Movieplanned</label>
          </div>

          <div className="form-floating mb-3 mt-3">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setMoviereleased(e.target.value)}
              value={Moviereleased}
              placeholder="Enter Moviereleased"
            />
            <label htmlFor="Moviereleased">Moviereleased</label>
          </div>

          <div className="form-floating mb-3 mt-3">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setPostdate(e.target.value)}
              value={Postdate}
              placeholder="Enter Postdate"
            />
            <label htmlFor="Postdate">Postdate</label>
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
export default Addcastformovie;
