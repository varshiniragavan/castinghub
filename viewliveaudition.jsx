import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Viewliveaudition = ({ userid, cid, dmy }) => {
  console.log(userid, cid);
  const role = window.localStorage.getItem("role");
  const nav = useNavigate();
  const [data, setData] = useState([]);
  const [value, setvalue] = useState([]);
  useEffect(() => {
    axios
      .post("http://localhost:5000/moviecast/viewliveaudition", {
        userid: userid,
        cid: cid,
      })
      .then((response) => {
        setData(response.data);
        setvalue(response.data);
      });
  }, [userid, cid]);
  const viewliveaudition = (e) => {
    nav("/updateliveaudition", { state: e });
  };
  const deletec = (e) => {
    axios
      .post("http://localhost:5000/moviecast/deleteliveaudition", { id: e })
      .then((response) => {
        axios
          .post("http://localhost:5000/moviecast/viewliveaudition")
          .then((response) => {
            setData(response.data);
            setvalue(response.data);
          });
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

  return (
    <div>
      <h3>liveaudition</h3>
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
              <th>Lid</th>
              <th>Userid</th>
              <th>Crid</th>
              <th>Starttime</th>
              <th>Enddate</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => {
              return (
                <tr key={d[0]}>
                  <td>{d[0]}</td>
                  <td>{d[1]}</td>
                  <td>{d[2]}</td>
                  <td>{d[3]}</td>
                  <td>{d[4]}</td>
                  <td>{d[5]}</td>
                  {d[5] === "booked" || d[5] === "change requested" ? (
                    <td>
                      {role === "Actor" || role === "Actress" ? (
                        <>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              axios
                                .post(
                                  "http://localhost:5000/moviecast/acceptliveaudition",
                                  {
                                    status: "Accepted",
                                    lid: d[0],
                                  }
                                )
                                .then((response) => {
                                  window.location.reload();
                                });
                            }}
                          >
                            Accept
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              dmy(d);
                            }}
                          >
                            Reschedule
                          </button>
                        </>
                      ) : role === "Director" ? (
                        <>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              axios
                                .post(
                                  "http://localhost:5000/moviecast/acceptliveaudition",
                                  {
                                    status: "booked",
                                    lid: d[0],
                                  }
                                )
                                .then((response) => {
                                  window.location.reload();
                                });
                            }}
                          >
                            Accept
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              dmy(d);
                            }}
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <></>
                      )}
                    </td>
                  ) : (
                    <td></td>
                  )}

                  <td>
                    {role === "admin" || role === "Director" ? (
                      <button
                        className="btn btn-primary"
                        onClick={() => deletec(d[0])}
                      >
                        delete
                      </button>
                    ) : (
                      <></>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Viewliveaudition;
