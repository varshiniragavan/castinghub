import React, { useState } from "react";
import axios from "axios";
import SideNav from "./Sidenav";

const Searchrole = () => {
  const [input, setInput] = useState(""); // Input for the search
  const [results, setResults] = useState([]); // Results from the backend

  // Function to handle search
  const handleSearch = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/moviecast/searchusersdetails", // Update port if necessary
        { query: input }
      );
      setResults(response.data); // Update results with backend response
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="row">
        {/* Side Navigation */}
        <div className="col-2">
          <SideNav />
        </div>
        {/* Main Content */}
        <div className="col-10">
          <div className="container mt-3">
            <h3>Search Users by Role</h3>
            <input
              type="text"
              className="form-control"
              placeholder="Enter description..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="btn btn-primary mt-2" onClick={handleSearch}>
              Search
            </button>
            <div className="mt-3">
              {results.length > 0 ? (
                <ul className="list-group">
                  {results.map((user, index) => (
                    <li className="list-group-item" key={index}>
                      <strong>Name:</strong> {user[0]} <br />
                      <strong>Role:</strong> {user[1]}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No matching users found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Searchrole;
