import { useNavigate } from "react-router-dom";

export default function CreateButton() {
  const navigate = useNavigate();
  return (
    <button
      className="contextButtons"
      onClick={(event) => {
        event.preventDefault();
        navigate("/board/create");
      }}
    >
      글 작성하기
    </button>
  );
}
