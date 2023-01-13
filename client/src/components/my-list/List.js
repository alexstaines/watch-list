import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ToggleVisibility from "./ToggleVisibility";
import ListItem from "./ListItem";
import AddListItem from "./AddListItem";

const List = ({list}) => {
  useEffect(() => {
  }, [list]);
  console.log("render started");
  return (
    <div className="container-md mt-5">
      <div className="row">
        <div className="col">
          <h2>My Watch List</h2>
        </div>
        <div className="col">
          <ToggleVisibility />
        </div>
      </div>
    
      <ListItem />
      <AddListItem />
    </div>
  );
};

List.propTypes = {
  auth: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  list: state.list,
});

export default connect(mapStateToProps)(List);
