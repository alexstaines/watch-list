import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMyList, deleteListItem } from "../../actions/list";
import { format, parse } from 'date-fns';

const ListItem = ({ getMyList, list: { listItems }, deleteListItem }) => {
  useEffect(() => {
    getMyList();
  }, [getMyList]);

  return (
    <div className="row g-2 table-responsive">
    <table className="table table-borderless table-striped">
      <thead>
        <tr>
          <th className="col-5 my-auto">Title</th>
          <th className="col-2 my-auto">Progress</th>
          <th className="col-1 my-auto">Started</th>
          <th className="col-1 my-auto">Finished</th>
          <th className="col-1 my-auto ps-0 text-center">Rating</th>
        </tr>
      </thead>
      <tbody>
      {listItems !== null ? (
        listItems.map((item) => (
          <tr className="align-middle" key={item._id}>
            <td className="col-5 mb-4 my-auto text-break">
              {/* <img src="#" alt={item._title + " image"} width="110" height="156" /> */}
              <img className="me-2" src="https://media.kitsu.io/anime/poster_images/13529/tiny.jpg" style={{width:'83px', height:'117px', backgroundColor:'#555'}}></img>
              <small className="">{item.title}</small>
            </td>
            <td className="col-2 mb-4 my-auto"><small className="">{item.watched}</small></td>
            <td className="col-1 mb-4 me-0 my-auto"><small className="">{(item.dateStarted) ? format(Date.parse(item.dateStarted), 'dd/MM/yyyy') : ""}</small></td>
            <td className="col-1 mb-4 ms-0 my-auto"><small className="">{(item.dateFinished) ? format(Date.parse(item.dateFinished), 'dd/MM/yyyy') : ""}</small></td>
            <td className="col-1 mb-4 ps-0 my-auto text-center"><small className="">{item.personalRating}</small></td>
            <td className="col-1 mb-4 my-auto">
              <button className="btn btn-sm btn-light" onClick={() => deleteListItem(item._id)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </td>
          </tr>
        ))
      ) : (
        <h4>Nothing to show</h4>
      )}
      </tbody>
    </table>
    </div>
  );
};

ListItem.propTypes = {
  getMyList: PropTypes.func.isRequired,
  deleteListItem: PropTypes.func.isRequired,
  list: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  list: state.list,
});

export default connect(mapStateToProps, { getMyList, deleteListItem })(ListItem);
