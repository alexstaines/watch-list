import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleVisibility } from "../../actions/auth";

const ToggleVisibility = ({
  toggleVisibility,
  auth
}) => {useEffect(() => {}, [auth.user.visibility]);
  return (
    // <button onClick={toggleVisibility}>List Visibility: {visibility ? "Public" : "Private"}</button>
  <div className="form-check form-switch">
    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Public (Will display on All Lists)</label>
    <input onClick={toggleVisibility} className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" defaultChecked={auth.user.visibility ? "checked" : ""}/>
  </div>

  );
};

ToggleVisibility.propTypes = {
  toggleVisibility: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { toggleVisibility })(ToggleVisibility);
