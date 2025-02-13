import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SideNav from "./Sidenav";

const Viewusersdetails = () => {
  const role = window.localStorage.getItem("role");
  const nav = useNavigate();
  const [data, setData] = useState([]);
  const [value, setValue] = useState([]);
  const getdata = () => {
    axios
      .post("http://localhost:5000/moviecast/viewusersdetails")
      .then((response) => {
        setData(response.data);
        setValue(response.data);
      });
  };
  useEffect(() => {
    getdata();
  }, []);

  const viewUsersDetails = (e) => {
    nav("/updateusersdetails", { state: e });
  };

  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .post("http://localhost:5000/moviecast/deleteusersdetails", { id })
        .then(() => {
          getdata();
        });
    }
  };
  const [img, setimg] = useState("");
  const [video, setvideo] = useState("");
  const [type, settype] = useState("");
  const searchData = (e) => {
    const query = e.target.value.toLowerCase();
    const filteredData = value.filter((row) =>
      row.some((field) => String(field).toLowerCase().includes(query))
    );
    setData(filteredData);
  };
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Side Navigation */}
        <div className="col-3 ">
          <SideNav />
        </div>
        <div className="col-9 ">
          <NavLink to="/addusersdetails">
            <button className="btn btn-success" style={{ float: "right" }}>
              Add
            </button>
          </NavLink>
          <h3 className="mt-4 text-center">User Details</h3>

          {/* Search Bar */}
          <div className="d-flex justify-content-end my-3">
            <input
              type="search"
              onChange={searchData}
              className="form-control w-25"
              placeholder="Search by any field"
            />
          </div>

          {/* Table */}
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>UID</th>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Approved</th>
                  {/* <th>Password</th> */}
                  <th>Profile Pic</th>
                  <th>Video Name</th>
                  {role === "admin" && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((d) => (
                    <tr key={d[0]}>
                      <td>{d[0]}</td>
                      <td>{d[1]}</td>
                      <td>{d[2]}</td>
                      <td>{d[3]}</td>
                      <td>{d[4]}</td>

                      <td>
                        {d[5] === 0 ? (
                          <>
                            <button
                              className="btn btn-success"
                              onClick={() => {
                                axios
                                  .post(
                                    "http://localhost:5000/moviecast/approve",
                                    { id: d[0], approve: 1 }
                                  )
                                  .then((response) => {
                                    getdata();
                                  });
                              }}
                            >
                              Approve
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                axios
                                  .post(
                                    "http://localhost:5000/moviecast/approve",
                                    { id: d[0], approve: -1 }
                                  )
                                  .then((response) => {
                                    getdata();
                                  });
                              }}
                            >
                              Reject
                            </button>
                          </>
                        ) : d[5] === 1 ? (
                          <>
                            <p>Approved</p>
                          </>
                        ) : (
                          <>
                            <p>Rejected</p>
                          </>
                        )}
                      </td>

                      {/* <td>{d[8]}</td> */}
                      <td>
                        <img
                          src={`http://127.0.0.1:5000/static/${d[6]}`}
                          alt="Profile"
                          style={{ width: "50px", height: "50px" }}
                          className="rounded-circle"
                          data-bs-toggle="modal"
                          data-bs-target="#myModal"
                          onClick={() => {
                            settype("img");
                            setimg(`http://127.0.0.1:5000/static/${d[6]}`);
                          }}
                        />
                      </td>
                      <td>
                        <video
                          style={{ width: "50px", height: "50px" }}
                          className="rounded-circle"
                          onClick={() => {
                            settype("video");
                            setvideo(`http://127.0.0.1:5000/static/${d[7]}`);
                          }}
                          data-bs-toggle="modal"
                          data-bs-target="#myModal"
                        >
                          <source
                            src={`http://127.0.0.1:5000/static/${d[7]}`}
                            type="video/mp4"
                          />
                          Not present
                        </video>
                      </td>
                      {role === "admin" && (
                        <td>
                          <button
                            className="btn btn-danger btn-sm me-2"
                            onClick={() => deleteUser(d[0])}
                          >
                            Delete
                          </button>
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => viewUsersDetails(d)}
                          >
                            Update
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center">
                      No user data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="modal" id="myModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Modal Heading</h4>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            {type === "img" ? (
              <img
                src={img}
                alt="Profile"
                style={{ width: "100%", height: "250px" }}
              />
            ) : (
              <video
                style={{ width: "100%", height: "250px" }}
                controls
                autoPlay
                muted
                onError={() => console.error("Video failed to load or play")}
                src={video}
              ></video>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewusersdetails;
