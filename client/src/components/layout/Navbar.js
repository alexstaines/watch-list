import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <>
      <li className="nav-item">
        <Link to="/list" className="nav-link">
          My List
        </Link>
      </li>
      <li className="nav-item">
        <a onClick={logout} href="#!" className="nav-link">
          <i className="fas fa-sign-out-alt"></i> Logout
        </a>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li className="nav-item">
        <Link to="/register" className="nav-link">
          Register
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </li>
    </>
  );

  return (
    <nav className="navbar navbar-expand shadow-sm">
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="navbar-brand">
              All Lists
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav d-flex">
          {!loading && <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
        </ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
