import axios from "axios";
import { useState, useEffect } from "react";
import SideNav from "./Sidenav";

const ChatScreen = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [chatData, setChatData] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Logged-in user ID
  const loggedInUserId = window.localStorage.getItem("i");

  // Fetch users for dropdown
  useEffect(() => {
    axios
      .post("http://localhost:5000/moviecast/viewusersdetailsid", {
        id: loggedInUserId,
      })
      .then((res) => {
        setUsers(res.data);
      });
  }, []);

  // Fetch chat data when a user is selected
  const fetchChat = (userId) => {
    setSelectedUser(userId);
    axios
      .post("http://localhost:5000/moviecast/viewchatwithuserid", {
        fromid: loggedInUserId,
        id: userId,
      })
      .then((res) => {
        setChatData(res.data);
      });
  };

  // Handle sending a new message
  const sendMessage = () => {
    if (newMessage.trim() === "") {
      alert("Message cannot be empty");
      return;
    }
    axios
      .post("http://localhost:5000/moviecast/insertchatwithuser", {
        fromuser: loggedInUserId,
        touser: selectedUser,
        chat: newMessage,
      })
      .then(() => {
        fetchChat(selectedUser); // Refresh chat
        setNewMessage("");
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Side Navigation */}
        <div className="col-3">
          <SideNav />
        </div>

        {/* Chat Section */}
        <div className="col-9">
          <h3 className="text-center mt-4">Chat Screen</h3>

          {/* Dropdown to Select User */}
          <div className="my-3">
            <select
              className="form-select"
              value={selectedUser}
              onChange={(e) => fetchChat(e.target.value)}
            >
              <option value="">Select a User</option>
              {users.map((user) => (
                <option key={user[0]} value={user[0]}>
                  {user[0]} {user[1]} ({user[3]})
                  <span class="badge rounded-pill bg-danger">{user[9]}</span>
                </option>
              ))}
            </select>
          </div>

          {/* Chat Display */}
          <div
            className="chat-box border p-3"
            style={{ height: "400px", overflowY: "scroll" }}
          >
            {chatData.length > 0 ? (
              chatData.map((chat, index) => {
                return (
                  <div
                    key={index}
                    className={`p-2 mb-2 ${
                      String(chat[1]) === String(loggedInUserId)
                        ? "text-end"
                        : "text-start"
                    }`}
                  >
                    <h1>{}</h1>
                    <span
                      className={`badge ${
                        String(chat[1]) === String(loggedInUserId)
                          ? "bg-primary"
                          : "bg-secondary"
                      }`}
                    >
                      {chat[3]}
                    </span>
                    <br />
                    <small className="text-muted">
                      {chat[4] || "Just now"}
                    </small>
                  </div>
                );
              })
            ) : (
              <p className="text-muted text-center">No messages found</p>
            )}
          </div>

          {/* Input to Send New Message */}
          {selectedUser && (
            <div className="input-group mt-3">
              <input
                type="text"
                className="form-control"
                placeholder="Type your message here..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
              />
              <button className="btn btn-primary" onClick={sendMessage}>
                Send
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
