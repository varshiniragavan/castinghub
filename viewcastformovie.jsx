import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideNav from "./Sidenav";

const Viewcastformovie = () => {
  const nav = useNavigate();
  const [data, setData] = useState([]);
  const [value, setvalue] = useState([]);
  useEffect(() => {
    axios
      .post("http://localhost:5000/moviecast/viewcastformovie")
      .then((response) => {
        setData(response.data);
        setvalue(response.data);
      });
  }, []);
  const viewcastformovie = (e) => {
    nav("/updatecastformovie", { state: e });
  };
  const deletec = (e) => {
    axios
      .post("http://localhost:5000/moviecast/deletecastformovie", { id: e })
      .then((response) => {
        axios
          .post("http://localhost:5000/moviecast/viewcastformovie")
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
      <h3>castformovie</h3>
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
              <th>Cmid</th>
              <th>Moviename</th>
              <th>Movieimage</th>
              <th>Description</th>
              <th>Movieplanned</th>
              <th>Moviereleased</th>
              <th>Postdate</th>
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
                      onClick={() => viewcastformovie(d)}
                    >
                      {d[0]}
                    </button>
                  </td>
                  <td>{d[1]}</td>
                  <td>{d[2]}</td>
                  <td>{d[3]}</td>
                  <td>{d[4]}</td>
                  <td>{d[5]}</td>
                  <td>{d[6]}</td>
                  <td>{d[7]}</td>
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
export default Viewcastformovie;
