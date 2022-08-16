import React, {useEffect} from "react";
import { PropTypes } from "prop-types";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { getLists } from "../../actions/list";

const Landing = ({ getLists, auth, list }) => {
  useEffect(() => {
    getLists();
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
  getLists: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  list: state.list,
});

export default connect(mapStateToProps, { getLists })(Landing);
