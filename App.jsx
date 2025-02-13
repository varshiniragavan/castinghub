import { Routes, Route } from "react-router-dom";
import Updatecastfileupload from "./updatecastfileupload";
import Viewcastfileupload from "./viewcastfileupload";
import Addcastfileupload from "./addcastfileupload";
import Updatecastformovie from "./updatecastformovie";
import Viewcastformovie from "./viewcastformovie";
import Addcastformovie from "./addcastformovie";
import Updatecastrequired from "./updatecastrequired";
import Viewcastrequired from "./viewcastrequired";
import Addcastrequired from "./addcastrequired";
import Updatechatwithuser from "./updatechatwithuser";
import Viewchatwithuser from "./viewchatwithuser";
import Addchatwithuser from "./addchatwithuser";
import Updateusersdetails from "./updateusersdetails";
import Viewusersdetails from "./viewusersdetails";
import Addusersdetails from "./addusersdetails";
import Login from "./Login";
import Register from "./Register";
import ChatScreen from "./Chatscreen";
import YourPost from "./Yourpost";
import Updateliveaudition from "./updateliveaudition";
import Viewliveaudition from "./viewliveaudition";
import Searchrole from "./Searchrole";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reg" element={<Register />} />
        <Route
          path="/updatecastfileupload"
          element={<Updatecastfileupload />}
        />
        <Route path="/chat" element={<ChatScreen />} />
        <Route path="/viewcastfileupload" element={<Viewcastfileupload />} />
        <Route path="/addcastfileupload" element={<Addcastfileupload />} />
        <Route path="/updatecastformovie" element={<Updatecastformovie />} />
        <Route path="/viewcastformovie" element={<Viewcastformovie />} />
        <Route path="/addcastformovie" element={<Addcastformovie />} />
        <Route path="/updatecastrequired" element={<Updatecastrequired />} />
        <Route path="/viewcastrequired" element={<Viewcastrequired />} />
        <Route path="/addcastrequired" element={<Addcastrequired />} />
        <Route path="/updatechatwithuser" element={<Updatechatwithuser />} />
        <Route path="/viewchatwithuser" element={<Viewchatwithuser />} />
        <Route path="/addchatwithuser" element={<Addchatwithuser />} />
        <Route path="/updateusersdetails" element={<Updateusersdetails />} />
        <Route path="/viewusersdetails" element={<Viewusersdetails />} />
        <Route path="/addusersdetails" element={<Addusersdetails />} />
        <Route path="/yourpost" element={<YourPost />} />
        <Route path="/searchrole" element={<Searchrole />} />
      </Routes>
    </>
  );
};

export default App;
