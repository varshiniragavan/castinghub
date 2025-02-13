import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideNav from "./Sidenav";
import Addliveaudition from "./addliveaudition";
import Viewliveaudition from "./viewliveaudition";
import Updateliveaudition from "./updateliveaudition";

const Viewcastfileupload = () => {
  const role = window.localStorage.getItem("role");
  const nav = useNavigate();
  const [data, setData] = useState([]);
  const [value, setvalue] = useState([]);
  const [type, settype] = useState("");
  const [cid, setcid] = useState();
  const [i, seti] = useState("");
  const [i1, seti1] = useState("");
  const getall = () => {
    axios
      .post("http://localhost:5000/moviecast/viewcastfileupload")
      .then((response) => {
        if (role === "Actress" || role == "Actor") {
          var d = response.data.filter((x) => {
            return x[5] === parseInt(window.localStorage.getItem("i"));
          });
          setData(d);
          setvalue(d);
        } else {
          setData(response.data);
          setvalue(response.data);
        }
      });
  };
  useEffect(() => {
    getall();
  }, []);
  const [video, setvideo] = useState("");

  const deletec = (e, approve) => {
    axios
      .post("http://localhost:5000/moviecast/changecastfileupload", {
        cfid: e,
        approve: approve,
      })
      .then((response) => {
        getall();
      });
  };
  const searchdata = (e) => {
    const r = [];

    for (var k of value) {
      var v = 0;

      for (var n of k) {
        n = "" + n;
        if (n.toLowerCase().indexOf(e) !== -1) {
          v = 1;
          break;
        }
      }
      if (v === 1) {
        r.push(k);
      }
    }
    setData(r);
  };
  const dmy = (k) => {
    settype("update");
    setcid(k);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Side Navigation */}
        <div className="col-3 ">
          <SideNav />
        </div>
        <div className="col-9 ">
          <h3>castfileupload</h3>
          <input
            type="search"
            onChange={(e) => searchdata(e.target.value)}
            className="form-select"
            placeholder="Search"
          />
          <div className="table-responsive">
            <table className="table table-bordered" id="table_id">
              <thead>
                <tr>
                  <th>Cfid</th>
                  <th>Crid</th>
                  <th>File</th>
                  <th>Status</th>
                  <th>Description</th>
                  <th>User Id</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.map((d) => {
                  return (
                    <tr key={d[0]}>
                      <td>{d[0]}</td>
                      <td>{d[1]}</td>
                      <td>
                        {" "}
                        <video
                          style={{ width: "50px", height: "50px" }}
                          className="rounded-circle"
                          onClick={() => {
                            setvideo(`http://127.0.0.1:5000/static/${d[2]}`);
                            settype("video");
                          }}
                          data-bs-toggle="modal"
                          data-bs-target="#myModal"
                        >
                          <source
                            src={`http://127.0.0.1:5000/static/${d[2]}`}
                            type="video/mp4"
                          />
                          Not present
                        </video>
                      </td>
                      <td>{d[3]}</td>
                      <td>{d[4]}</td>
                      <td>{d[5]}</td>
                      <td>
                        {role === "admin" || role === "Director" ? (
                          <>
                            <button
                              className="btn btn-primary"
                              onClick={() => deletec(d[0], "approve")}
                            >
                              Approve
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => deletec(d[0], "reject")}
                            >
                              Reject
                            </button>
                            <button
                              className="btn btn-success"
                              data-bs-toggle="modal"
                              data-bs-target="#myModal"
                              onClick={() => {
                                settype("live");
                                seti(d[5]);
                                seti1(d[1]);
                              }}
                            >
                              Add Live
                            </button>
                          </>
                        ) : (
                          <></>
                        )}
                        <button
                          className="btn btn-warning"
                          data-bs-toggle="modal"
                          data-bs-target="#myModal"
                          onClick={() => {
                            settype("viewlive");
                            seti(d[5]);
                            seti1(d[1]);
                          }}
                        >
                          View live
                        </button>
                        <div class="modal" id="myModal">
                          <div class="modal-dialog">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h4 class="modal-title">User Video</h4>
                                <button
                                  type="button"
                                  class="btn-close"
                                  data-bs-dismiss="modal"
                                ></button>
                              </div>

                              {type === "video" ? (
                                <video
                                  style={{ width: "100%", height: "250px" }}
                                  controls
                                  autoPlay
                                  muted
                                  onError={() =>
                                    console.error(
                                      "Video failed to load or play"
                                    )
                                  }
                                  src={video}
                                ></video>
                              ) : type === "live" ? (
                                <>
                                  <Addliveaudition userid={i} cid={i1} />
                                </>
                              ) : type === "update" ? (
                                <>
                                  <Updateliveaudition d={cid} />
                                </>
                              ) : (
                                <>
                                  <Viewliveaudition
                                    userid={i}
                                    cid={i1}
                                    dmy={dmy}
                                  />
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Viewcastfileupload;
