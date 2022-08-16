import React, { useState, Fragment } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password2: "",
  });

  const { username, password, password2 } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      const newUser = {
        username,
        password,
      };
      register(newUser);
    }
  };

  // redirect if logged in
  if (isAuthenticated) {
    return <Navigate to="/" />
  }

  return (
    <Fragment>
      <h2>Create account</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={onChange}

          ></input>
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={onChange}

          ></input>
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password2"
            placeholder="Confirm password"
            value={password2}
            onChange={onChange}

          ></input>
        </div>
        <input type="submit" value="Register" />
      </form>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
