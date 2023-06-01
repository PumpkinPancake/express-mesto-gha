import logo from "../images/logo.svg";
import { Link } from "react-router-dom";

export default function Header(props) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />
      <div className="header__nav">
        <p className="header__user-email">{props.email}</p>
        <Link
          to={props.route}
          className="header__link"
          type="button"
          onClick={props.onClick}
        >
          {props.title}
        </Link>
      </div>
    </header>
  );
}
