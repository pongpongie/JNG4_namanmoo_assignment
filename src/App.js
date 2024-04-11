import { useState } from "react";
import "./App.css";
import Main from "./Main";
import Board from "./Board";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

function App() {
  const [mode, setMode] = useState("LOGIN");
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Main mode={mode} onChange={setMode} />}
          ></Route>
          <Route path="/board" element={<Board />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
