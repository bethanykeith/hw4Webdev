
//import {useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div>
      <nav className="homepage"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/logobistro.png)`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        height: "100vh"
      }}>
        <div className="nav-left">
          <Link to="/">HOME</Link>
         <Link to="/about">ABOUT</Link>
        </div>
        <div className="nav-right">
         <Link to="/menu">MENU</Link>
        <Link to="/contact">CONTACT</Link>
        </div>
      </nav>
    </div>
  );
}

export default Home;