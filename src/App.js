import "./assets/App.css";
import Main from "./pages/Main";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
// import CreatePage from "./pages/CreatePage";
// import UpdatePage from "./pages/UpdatePage";
// import WritePage from "./pages/WritePage";
import Board from "./pages/Board";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
          <Route path="/board" element={<Board />}>
            <Route path="/board/welcome" element={<Board />} />
            <Route path="/board/create" element={<Board />} />
            <Route path="/board/read/:id" element={<Board />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
