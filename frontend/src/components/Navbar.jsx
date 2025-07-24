import { Link, useNavigate} from "react-router-dom";
import "../css/Navbar.css"
import {useAuth} from "../contexts/AuthContext"
import {FaGoogle} from "react-icons/fa"

function Navbar() {

  const {user, login, logout} = useAuth();
  const navigate = useNavigate();

   const handleLogin = async () => {
    await login();              // login sets user
    navigate("/user");     // go to favorites after login
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Moviegator</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/favorites" className="nav-link">
          Favorites
        </Link>
        <Link to="/purpose" className="nav-link">
          Purpose
        </Link>
      <div className="auth-section">
        {user ? (
          <>
            <Link to="/user">{user.displayName}</Link>
            <button onClick={logout}>⍈</button>
          </>
        ) : (
          <button onClick={handleLogin}><FaGoogle/></button>
        )}
      </div>
      </div>
    </nav>
  );
}

export default Navbar;
