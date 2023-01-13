import React, { useEffect } from "react";
import { PropTypes } from "prop-types";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { getUsers } from "../../actions/list";

const Landing = ({ getUsers, auth: { users }, list }) => {
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container-md mt-5">
      <section>
        <h3>User lists</h3>
        <div className="list-group">
          {users !== null ? (
            users.map((user) => (
              <a key={user._id} className="list-group-item list-group-item-action">{user.username}</a>
            ))
          ) : (
            <h4>Nothing to show</h4>
          )}
        </div>
      </section>
    </div>
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
