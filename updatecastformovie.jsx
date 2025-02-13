import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SideNav from "./Sidenav";
const Updatecastformovie = () => {
  var rx = 0;
  const { state } = useLocation();
  const nav = useNavigate();
  const [Cmid, setCmid] = useState(state[rx++]);
  const [Moviename, setMoviename] = useState(state[rx++]);
  const [Movieimage, setMovieimage] = useState(state[rx++]);
  const [Description, setDescription] = useState(state[rx++]);
  const [Movieplanned, setMovieplanned] = useState(state[rx++]);
  const [Moviereleased, setMoviereleased] = useState(state[rx++]);
  const [Postdate, setPostdate] = useState(state[rx++]);
  const [Status, setStatus] = useState(state[rx++]);
  const submitdata = () => {
    const value = {
      cmid: Cmid,
      moviename: Moviename,
      movieimage: Movieimage,
      description: Description,
      movieplanned: Movieplanned,
      moviereleased: Moviereleased,
      postdate: Postdate,
      status: Status,
    };
    axios
      .post("http://localhost:5000/moviecast/updatecastformovie", value)
      .then((response) => {
        nav("/viewcastformovie");
      });
  };
  return (
    <div>
      <SideNav />
      <h1>Add castformovie</h1>
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
  );
};
export default Updatecastformovie;
