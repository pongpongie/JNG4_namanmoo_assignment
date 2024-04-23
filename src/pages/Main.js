import "../assets/Main.css";
import { useNavigate, useLocation } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/SignUp"; // Signup 컴포넌트를 임포트합니다.

export default function Container(props) {
  console.log(props);
  return (
    <div className="main">
      <div className="container">
        <ContainerLeft />
        <ContainerRight />
      </div>
    </div>
  );
}

function ContainerLeft() {
  return (
    <div className="containerLeft">
      <h1>Jungle Board</h1>
    </div>
  );
}

function ContainerRight(props) {
  const location = useLocation();
  return (
    <div className="containerRight">
      {location.pathname === "/signup" ? <Signup /> : <Login />}
    </div>
  );
}
