import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMyList } from "../../actions/list";

const List = ({ getMyList, auth, list }) => {
  useEffect(() => {
    getMyList();
  }, []);

  return (
    <div>
      <h2>Amine</h2>
    </div>
  );
};

List.propTypes = {
  getMyList: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  list: state.list,
});

export default connect(mapStateToProps, { getMyList })(List);
