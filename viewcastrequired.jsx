import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideNav from "./Sidenav";

const Viewcastrequired = () => {
  const nav = useNavigate();
  const [data, setData] = useState([]);
  const [value, setvalue] = useState([]);
  useEffect(() => {
    axios
      .post("http://localhost:5000/moviecast/viewcastrequired")
      .then((response) => {
        setData(response.data);
        setvalue(response.data);
      });
  }, []);
  const viewcastrequired = (e) => {
    nav("/updatecastrequired", { state: e });
  };
  const deletec = (e) => {
    axios
      .post("http://localhost:5000/moviecast/deletecastrequired", { id: e })
      .then((response) => {
        axios
          .post("http://localhost:5000/moviecast/viewcastrequired")
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
      <SideNav />
      <h3>castrequired</h3>
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
              <th>Crid</th>
              <th>Castname</th>
              <th>Role</th>
              <th>Totalnoofuser</th>
              <th>Cmid</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => {
              return (
                <tr key={d[0]}>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => viewcastrequired(d)}
                    >
                      {d[0]}
                    </button>
                  </td>
                  <td>{d[1]}</td>
                  <td>{d[2]}</td>
                  <td>{d[3]}</td>
                  <td>{d[4]}</td>
                  <td>{d[5]}</td>
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
  );
};
export default Viewcastrequired;
