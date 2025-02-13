import axios from "axios";
import { useState } from "react";
import SideNav from "./Sidenav";
const Addchatwithuser = () => {
  const [Fromuser, setFromuser] = useState("");
  const [Touser, setTouser] = useState("");
  const [Chat, setChat] = useState("");
  const [Messagedate, setMessagedate] = useState("");
  const submitdata = () => {
    const value = {
      fromuser: Fromuser,
      touser: Touser,
      chat: Chat,
      messagedate: Messagedate,
    };
    axios
      .post("http://localhost:5000/moviecast/insertchatwithuser", value)
      .then((res) => {
        alert("success");
        setFromuser("");
        setTouser("");
        setChat("");
        setMessagedate("");
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
          <h1 style={{ textAlign: "center" }}>Add chatwithuser</h1>
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
      </div>
    </div>
  );
};
export default Addchatwithuser;
