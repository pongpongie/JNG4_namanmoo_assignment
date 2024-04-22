export default function Header(props) {
  return (
    <header className="header">
      <h2 className="headerTitle">
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            props.onChangeMode("WELCOME");
          }}
        >
          {props.title}
        </a>
      </h2>
      <h2 className="myPage">My Page</h2>
    </header>
  );
}
