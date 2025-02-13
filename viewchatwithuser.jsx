import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideNav from "./Sidenav";

const Viewchatwithuser = () => {
  const nav = useNavigate();
  const [data, setData] = useState([]);
  const [value, setvalue] = useState([]);
  useEffect(() => {
    axios
      .post("http://localhost:5000/moviecast/viewchatwithuser")
      .then((response) => {
        setData(response.data);
        setvalue(response.data);
      });
  }, []);
  const viewchatwithuser = (e) => {
    nav("/updatechatwithuser", { state: e });
  };
  const deletec = (e) => {
    axios
      .post("http://localhost:5000/moviecast/deletechatwithuser", { id: e })
      .then((response) => {
        axios
          .post("http://localhost:5000/moviecast/viewchatwithuser")
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
    <div className="container-fluid">
      <div className="row">
        {/* Side Navigation */}
        <div className="col-2 ">
          <SideNav />
        </div>
        <div className="col-10 ">
          <h3 className="mt-4 text-center">User Details</h3>

          {/* Search Bar */}
          <div className="d-flex justify-content-end my-3">
            <input
              type="search"
              onChange={searchdata}
              className="form-control w-25"
              placeholder="Search by any field"
            />
          </div>

          {/* Table */}
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Cuid</th>
                  <th>Fromuser</th>
                  <th>Touser</th>
                  <th>Chat</th>
                  <th>Messagedate</th>
                </tr>
              </thead>
              <tbody>
                {data.map((d) => {
                  return (
                    <tr key={d[0]}>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => viewchatwithuser(d)}
                        >
                          {d[0]}
                        </button>
                      </td>
                      <td>{d[1]}</td>
                      <td>{d[2]}</td>
                      <td>{d[3]}</td>
                      <td>{d[4]}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => deletec(d[0])}
                        >
                          delete
                        </button>
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
export default Viewchatwithuser;
