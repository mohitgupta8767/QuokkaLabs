import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/login";
import MemberList from "./Components/Member/memberList";
import ProtectedRoute from "./Components/Common/protectedRoute";

const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />} ></Route>
          <Route
            path="/members"
            element={
              <ProtectedRoute>
                <MemberList />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Login />} ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
