import axios from "axios";
import React, { useEffect, useState } from "react";

function AddRecordModal({ onSubmit, crid, showModal1, setShowModal1 }) {
  const [formData, setFormData] = useState({
    crid: "",
    fileupload: null,
    status: "pending",
    description: "",
    userid: window.localStorage.getItem("i"),
  });

  // Update formData.crid whenever crid prop changes
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      crid: crid,
    }));
  }, [crid]); // Add crid as a dependency

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();

    // Append all form data fields
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    // Ensure file is appended if present
    if (formData.fileupload) {
      form.append("fileupload", formData.fileupload);
    }

    axios
      .post("http://127.0.0.1:5000/moviecast/insertcastfileupload", form)
      .then((res) => {
        alert("Allowed successfully");
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error:", err.response ? err.response.data : err.message);
      });
  };

  return (
    <>
      {showModal1 && (
        <div
          className="modal show d-block"
          id="addRecordModal"
          tabIndex="-1"
          aria-labelledby="addRecordModalLabel"
          aria-hidden="true"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addRecordModalLabel">
                  Add New Record
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowModal1(false);
                  }}
                  aria-label="Close"
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  {/* CRID */}
                  <div className="mb-3">
                    <label htmlFor="crid" className="form-label">
                      CRID
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="crid"
                      name="crid"
                      value={formData.crid}
                      onChange={handleChange}
                      placeholder="Enter CRID"
                      required
                      readOnly
                    />
                  </div>
                  {/* File Upload */}
                  <div className="mb-3">
                    <label htmlFor="fileupload" className="form-label">
                      File Upload
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="fileupload"
                      name="fileupload"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {/* Status */}
                  {/* <div className="mb-3">
                    <label htmlFor="status" className="form-label">
                      Status
                    </label>
                    <select
                      className="form-select"
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Select Status
                      </option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div> */}
                  {/* Description */}
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Enter Description"
                    ></textarea>
                  </div>
                  {/* User ID */}
                  <div className="mb-3">
                    <label htmlFor="userid" className="form-label">
                      User ID
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="userid"
                      name="userid"
                      value={formData.userid}
                      onChange={handleChange}
                      placeholder="Enter User ID"
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowModal1(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Add Record
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddRecordModal;
