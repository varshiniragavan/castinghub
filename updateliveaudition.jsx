import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const Updateliveaudition = ({ d }) => {
  var rx = 0;
  const { state } = useLocation();
  const nav = useNavigate();
  const [Lid, setLid] = useState(d[rx++]);
  const [Userid, setUserid] = useState(d[rx++]);
  const [Crid, setCrid] = useState(d[rx++]);
  const [Starttime, setStarttime] = useState("");
  const [Enddate, setEnddate] = useState("");
  const [Status, setStatus] = useState("change requested");
  const submitdata = () => {
    const value = {
      lid: Lid,
      userid: Userid,
      crid: Crid,
      starttime: Starttime,
      enddate: Enddate,
      status: Status,
    };
    axios
      .post("http://localhost:5000/moviecast/updateliveaudition", value)
      .then((response) => {
        alert("updated");
        window.location.reload();
      });
  };
  return (
    <div>
      <h1>Add liveaudition</h1>
      <div className="form-floating mb-3 mt-3">
        <input
          type="text"
          className="form-control"
          onChange={(e) => setLid(e.target.value)}
          value={Lid}
          placeholder="Enter Lid"
        />
        <label htmlFor="Lid">Lid</label>
      </div>

      <div className="form-floating mb-3 mt-3">
        <input
          type="text"
          className="form-control"
          onChange={(e) => setUserid(e.target.value)}
          value={Userid}
          placeholder="Enter Userid"
        />
        <label htmlFor="Userid">Userid</label>
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
          type="datetime-local"
          className="form-control"
          onChange={(e) => setStarttime(e.target.value)}
          value={Starttime}
          placeholder="Enter Starttime"
        />
        <label htmlFor="Starttime">Starttime</label>
      </div>

      <div className="form-floating mb-3 mt-3">
        <input
          type="datetime-local"
          className="form-control"
          onChange={(e) => setEnddate(e.target.value)}
          value={Enddate}
          placeholder="Enter Enddate"
        />
        <label htmlFor="Enddate">Enddate</label>
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
export default Updateliveaudition;
