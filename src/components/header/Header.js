import "./header.css";
import header from "../../Assets/header.jpeg"

export default function Header() {
  return (
    <div className="header">    
      <img
        className="headerImg"
        src= {header}
        alt=""
      />
    </div>
  );
}