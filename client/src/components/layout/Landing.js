import React, {useEffect} from "react";
import { PropTypes } from "prop-types";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { getUsers } from "../../actions/list";

const Landing = ({ getUsers, auth, list }) => {
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <section>
        <h1>List</h1>
      </section>
    </>
  );
};

Landing.propTypes = {
  getUsers: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  list: state.list,
});

export default connect(mapStateToProps, { getUsers })(Landing);
