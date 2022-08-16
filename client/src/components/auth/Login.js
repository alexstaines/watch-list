import React, { useState, Fragment } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login({ username, password });
  };

  // redirect if logged in
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Fragment>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input type="text" name="username" placeholder="Username" value={username} onChange={onChange}></input>
        </div>
        <div className="form-group">
          <input type="password" name="password" placeholder="Password" value={password} onChange={onChange}></input>
        </div>
        <input type="submit" value="Login" />
      </form>
      <p>
        Click <Link to="/register">here</Link> to register.
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
