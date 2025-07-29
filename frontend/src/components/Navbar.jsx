import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await login(); // login sets user
    navigate("/user"); // go to favorites after login
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand" style={{marginTop: "-0.6%" }}>
        <Link to="/">🐊MovieGator
        <p style={{marginLeft: "6%" }}>Your Movie Navigator</p>
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">
        <h4 style={{fontSize: "110%"}}>🏠︎</h4>
        </Link>
        <Link to="/favorites" className="nav-link">
        <h4 style={{ color: "red", fontSize: "110%"}}>❤︎</h4>
        </Link>
        <Link to="/purpose" className="nav-link">
          About
        </Link>
        <div className="auth-section">
          {user ? (
            <>
              <Link
                className="nav-link"
                style={{ color: "yellow", marginRight: "8px" }}
                to="/user"
              >
                {user.displayName}
              </Link>
              <button className="nav-link" onClick={logout}>
                ✗
              </button>
            </>
          ) : (
            <button className="nav-link" onClick={handleLogin}>
              <h2>G</h2>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
