import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SideNav from "./Sidenav";
const Updatechatwithuser = () => {
  var rx = 0;
  const { state } = useLocation();
  const nav = useNavigate();
  const [Cuid, setCuid] = useState(state[rx++]);
  const [Fromuser, setFromuser] = useState(state[rx++]);
  const [Touser, setTouser] = useState(state[rx++]);
  const [Chat, setChat] = useState(state[rx++]);
  const [Messagedate, setMessagedate] = useState(state[rx++]);
  const submitdata = () => {
    const value = {
      cuid: Cuid,
      fromuser: Fromuser,
      touser: Touser,
      chat: Chat,
      messagedate: Messagedate,
    };
    axios
      .post("http://localhost:5000/moviecast/updatechatwithuser", value)
      .then((response) => {
        nav("/viewchatwithuser");
      });
  };
  return (
    <div>
      <SideNav />
      <h1>Add chatwithuser</h1>
      <div className="form-floating mb-3 mt-3">
        <input
          type="text"
          className="form-control"
          onChange={(e) => setCuid(e.target.value)}
          value={Cuid}
          placeholder="Enter Cuid"
        />
        <label htmlFor="Cuid">Cuid</label>
      </div>

      <div className="form-floating mb-3 mt-3">
        <input
          type="text"
          className="form-control"
          onChange={(e) => setFromuser(e.target.value)}
          value={Fromuser}
          placeholder="Enter Fromuser"
        />
        <label htmlFor="Fromuser">Fromuser</label>
      </div>

      <div className="form-floating mb-3 mt-3">
        <input
          type="text"
          className="form-control"
          onChange={(e) => setTouser(e.target.value)}
          value={Touser}
          placeholder="Enter Touser"
        />
        <label htmlFor="Touser">Touser</label>
      </div>

      <div className="form-floating mb-3 mt-3">
        <input
          type="text"
          className="form-control"
          onChange={(e) => setChat(e.target.value)}
          value={Chat}
          placeholder="Enter Chat"
        />
        <label htmlFor="Chat">Chat</label>
      </div>

      <div className="form-floating mb-3 mt-3">
        <input
          type="text"
          className="form-control"
          onChange={(e) => setMessagedate(e.target.value)}
          value={Messagedate}
          placeholder="Enter Messagedate"
        />
        <label htmlFor="Messagedate">Messagedate</label>
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
export default Updatechatwithuser;
