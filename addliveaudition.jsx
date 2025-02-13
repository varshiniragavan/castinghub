import axios from "axios";
import { useState } from "react";
const Addliveaudition = ({ userid, cid }) => {
  const [Userid, setUserid] = useState(userid);
  const [Crid, setCrid] = useState(cid);
  const [Starttime, setStarttime] = useState("");
  const [Enddate, setEnddate] = useState("");
  const [address, setaddress] = useState("");

  const submitdata = () => {
    const value = {
      userid: Userid,
      crid: Crid,
      starttime: Starttime,
      enddate: Enddate,
      address: address,
    };
    axios
      .post("http://localhost:5000/moviecast/insertliveaudition", value)
      .then((res) => {
        alert("success");
        setUserid("");
        setCrid("");
        setStarttime("");
        setEnddate("");
        setaddress("");
      });
  };
  return (
    <div>
      <h1>Add liveaudition</h1>
      <div className="form-floating mb-3 mt-3">
        <input
          type="text"
          className="form-control"
          onChange={(e) => setUserid(e.target.value)}
          value={Userid}
          placeholder="Enter Userid"
          readOnly
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
          readOnly
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
      <div className="form-floating mb-3 mt-3">
        <input
          type="text"
          className="form-control"
          onChange={(e) => setaddress(e.target.value)}
          value={address}
          placeholder="Enter address"
        />
        <label htmlFor="address">address</label>
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
export default Addliveaudition;
