import React, { useState, useEffect } from "react";
import axios from "axios";
import SideNav from "./Sidenav";
import AddRecordModal from "./AddRecordModal";
import { useNavigate } from "react-router-dom";

const Yourpost = () => {
  const [posts, setPosts] = useState([]); // To store existing posts
  const [filterposts, setfilterPosts] = useState([]); // To store existing posts
  const [pro, setpor] = useState("add");
  const userid = window.localStorage.getItem("i");
  const [casts, setCasts] = useState([
    { castname: "", role: "", totalnoofuser: "" },
  ]);
  const nav = useNavigate();
  const role = window.localStorage.getItem("role");
  console.log(role);
  // Handle changes for dynamic cast entries
  const handleCastChange = (index, e) => {
    const { name, value } = e.target;
    const newCasts = [...casts];
    newCasts[index][name] = value;
    setCasts(newCasts);
  };

  // Add a new cast row
  const addCastRow = () => {
    setCasts([...casts, { castname: "", role: "", totalnoofuser: "" }]);
  };

  // Remove a cast row
  const removeCastRow = (index) => {
    const newCasts = casts.filter((_, i) => i !== index);
    setCasts(newCasts);
  };
  const [formData, setFormData] = useState({
    moviename: "",
    description: "",
    movieplanned: new Date(),
    moviereleased: new Date(),
    postdate: "",
    status: "planned",
    castname: "",
    role: "",
    totalnoofuser: "",
    userid: userid,
  });
  const [file, setFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const fetchPosts = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/moviecast/viewcastformovie"
      ); /// Replace with your API endpoint
      if (window.localStorage.getItem("role") === "Director") {
        var x = response.data.filter((d) => {
          return d.userid === parseInt(userid);
        });
        setPosts(x);
        setfilterPosts(x);
      } else {
        setPosts(response.data);
        setfilterPosts(response.data);
      }
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  const [crid, setcrid] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (file) data.append("movieimage", file);
    data.append("castdetails", JSON.stringify(casts));

    try {
      const endpoint =
        pro === "add"
          ? "http://127.0.0.1:5000/moviecast/insertcastformovie"
          : "http://127.0.0.1:5000/moviecast/updatecastformovie";
      const response = await axios.post(endpoint, data);
      alert(response.data.message);
      fetchPosts();
      setShowModal(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit the form.");
    }
  };

  const handleFormSubmit = (formData) => {
    fetch("http://127.0.0.1:5000/moviecast/insertcastfileupload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Record added successfully!");
          // Optionally refresh data or close the modal
        } else {
          alert("Error: " + data.error);
        }
      })
      .catch((err) => console.error("Error:", err));
  };
  const checking = (c) => {
    var i = false;
    for (var e of c.castapplied) {
      if (e.userid === parseInt(userid)) {
        i = true;
      }
    }

    return i;
  };

  const searchData = (e) => {
    const query = e.target.value.toLowerCase(); // Get the search query

    // Filter posts based on the query
    const filteredPosts = filterposts.filter((row) => {
      // Check if the query matches any relevant fields
      return (
        row.moviename.toLowerCase().includes(query) ||
        row.description.toLowerCase().includes(query) ||
        row.status.toLowerCase().includes(query) ||
        row.castrequired.some((cast) =>
          cast.castname.toLowerCase().includes(query)
        )
      );
    });

    // Update the posts (or a separate filteredPosts state if needed)
    setPosts(filteredPosts); // Update the state with the filtered posts
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {/* Side Navigation */}
          <div className="col-3 ">
            <SideNav />
          </div>
          <div className="col-9 ">
            <div className="container mt-5">
              <h2 className="text-center mb-4">Movie Cast Management</h2>
              <div className="d-flex justify-content-end my-3">
                <input
                  type="search"
                  onChange={searchData}
                  className="form-control w-75"
                  placeholder="Search by Character"
                />
              </div>
              {(role === "admin" || role === "Director") && (
                <button
                  className="btn btn-primary"
                  onClick={() => setShowModal(true)}
                >
                  Add Post
                </button>
              )}
              {/* View Posts Section */}
              <div className="mb-4">
                <h3>View Posts</h3>
                <div className="row">
                  {posts.map((post) => (
                    <div key={post.cmid} className="col-12">
                      <div className="card mb-4">
                        <img
                          src={`http://127.0.0.1:5000/static/${post.movieimage}`} // Adjust if your API sends a relative path
                          alt={post.moviename}
                          className="card-img-top"
                          style={{ height: "200px", objectFit: "cover" }}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{post.moviename}</h5>
                          <p className="card-text">{post.description}</p>
                          <p>
                            <strong>Status:</strong> {post.status}
                          </p>
                          <p>
                            <strong>Planned:</strong> {post.movieplanned}
                          </p>
                          <p>
                            <strong>Postdate:</strong> {post.postdate}
                          </p>
                          <p>
                            <strong>Released:</strong> {post.moviereleased}
                          </p>
                          <p>
                            <strong>User</strong> {post.userid}
                          </p>

                          <h5>Crew Required information</h5>
                          {post.castrequired.map((c) => {
                            return (
                              <>
                                <p>
                                  <strong>Castname:</strong> {c.castname}
                                </p>
                                <p>
                                  <strong>Description:</strong> {c.role}
                                </p>
                                <p>
                                  <strong>Status:</strong> {c.status}
                                </p>
                                <p>
                                  <strong>Count:</strong> {c.totalnoofuser}
                                </p>
                                {parseInt(userid) === post.userid && (
                                  <>
                                    <p>
                                      <strong>Total applied:</strong>{" "}
                                      {c.castapplied.length}
                                    </p>
                                  </>
                                )}
                                {role !== "admin" && role !== "Director" && (
                                  <>
                                    {!checking(c) && (
                                      <button
                                        className="btn btn-primary"
                                        type="button"
                                        onClick={() => {
                                          setcrid(c.crid);
                                          setShowModal1(true);
                                        }}
                                      >
                                        Apply
                                      </button>
                                    )}
                                    {checking(c) && (
                                      <button
                                        className="btn btn-danger"
                                        onClick={() => {
                                          axios
                                            .post(
                                              "http://127.0.0.1:5000/moviecast/deletecastfileupload",
                                              {
                                                id: c.crid,
                                                userid: userid,
                                              }
                                            )
                                            .then((res) => {
                                              fetchPosts();
                                            });
                                        }}
                                      >
                                        Revoke
                                      </button>
                                    )}
                                  </>
                                )}
                              </>
                            );
                          })}
                          <br />
                          <br />

                          {parseInt(userid) === post.userid && (
                            <>
                              <button
                                className="btn btn-danger"
                                onClick={() => {
                                  axios
                                    .post(
                                      "http://127.0.0.1:5000/moviecast/deletecastformovie",
                                      { id: post.cmid }
                                    )
                                    .then((res) => {
                                      fetchPosts();
                                    });
                                }}
                              >
                                Delete
                              </button>
                              <button
                                className="btn btn-success"
                                onClick={() => {
                                  setpor("edit");
                                  setCasts(post.castrequired);
                                  setFormData(post);
                                  setShowModal(true);
                                }}
                              >
                                Edit
                              </button>
                            </>
                          )}
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              nav("/viewcastfileupload");
                            }}
                          >
                            View post
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="App">
                <AddRecordModal
                  onSubmit={handleFormSubmit}
                  crid={crid}
                  showModal1={showModal1}
                  setShowModal1={setShowModal1}
                />
              </div>

              {showModal && (
                <div
                  className="modal show d-block"
                  tabIndex="-1"
                  role="dialog"
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Add New Post</h5>
                        <button
                          type="button"
                          className="btn-close"
                          aria-label="Close"
                          onClick={() => setShowModal(false)}
                        ></button>
                      </div>
                      <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                          <div className="mb-3">
                            <label className="form-label">Movie Name</label>
                            <input
                              type="text"
                              className="form-control"
                              name="moviename"
                              onChange={handleChange}
                              value={formData.moviename}
                              required
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                              className="form-control"
                              name="description"
                              onChange={handleChange}
                              value={formData.description}
                              required
                            ></textarea>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Planned Date</label>
                            <input
                              type="date"
                              className="form-control"
                              name="movieplanned"
                              onChange={handleChange}
                              value={
                                new Date(formData.movieplanned)
                                  .toISOString()
                                  .split("T")[0]
                              }
                              required
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Released Date</label>
                            <input
                              type="date"
                              className="form-control"
                              name="moviereleased"
                              onChange={handleChange}
                              value={
                                new Date(formData.moviereleased)
                                  .toISOString()
                                  .split("T")[0]
                              }
                              required
                            />
                          </div>
                          {/* <div className="mb-3">
                            <label className="form-label">Post Date</label>
                            <input
                              type="date"
                              className="form-control"
                              name="postdate"
                              onChange={handleChange}
                              required
                            />
                          </div> */}
                          <div className="mb-3">
                            <label className="form-label">Status</label>
                            <select
                              className="form-control"
                              name="status"
                              onChange={handleChange}
                              value={formData.status}
                              required
                            >
                              <option value="">Select Status</option>
                              <option value="planned">Planned</option>
                              <option value="Released">Ongoing</option>
                            </select>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Cast Details</label>
                            {casts.map((cast, index) => (
                              <div key={index} className="mb-2">
                                <input
                                  type="text"
                                  className="form-control mb-1"
                                  name="castname"
                                  placeholder="Cast Name"
                                  value={cast.castname}
                                  onChange={(e) => handleCastChange(index, e)}
                                  required
                                />
                                <input
                                  type="text"
                                  className="form-control mb-1"
                                  name="role"
                                  placeholder="Role"
                                  value={cast.role}
                                  onChange={(e) => handleCastChange(index, e)}
                                  required
                                />
                                <input
                                  type="number"
                                  className="form-control mb-1"
                                  name="totalnoofuser"
                                  placeholder="Total No. of Users"
                                  value={cast.totalnoofuser}
                                  onChange={(e) => handleCastChange(index, e)}
                                  required
                                />
                                {index > 0 && (
                                  <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    onClick={() => removeCastRow(index)}
                                  >
                                    Remove
                                  </button>
                                )}
                              </div>
                            ))}
                            <button
                              type="button"
                              className="btn btn-secondary btn-sm"
                              onClick={addCastRow}
                            >
                              Add More Cast
                            </button>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Movie Image</label>
                            <input
                              type="file"
                              className="form-control"
                              onChange={handleFileChange}
                            />
                          </div>
                          <button type="submit" className="btn btn-primary">
                            Submit
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Yourpost;
