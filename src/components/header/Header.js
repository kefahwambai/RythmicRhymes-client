import "./header.css";
import header from "../../Assets/header.jpeg"

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">Rythmic</span>
        <span className="headerTitleLg">Ryhmes</span>
      </div>
      <img
        className="headerImg"
        src= {header}
        alt=""
      />
    </div>
  );
}