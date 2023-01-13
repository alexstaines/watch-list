import React, { useEffect, useState } from "react";
import Select from 'react-select';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addListItem } from "../../actions/list";

const AddListItem = ({ addListItem }) => {
  useEffect(() => {
  }, []);
  const [isDisabledStarted, setIsDisabledStarted] = useState(true);
  const [isDisabledFinished, setIsDisabledFinished] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    averageRating: '',
    synopsis: '',
    numberOfEps: '',
    subtype: '',
    posterImage: '',
    watched: '',
    dateStarted: '',
    dateFinished: '',
    watchedEps: '',
    personalRating: '',
    notes: '',
    position: '',
  });

  const {
    title,
    averageRating,
    synopsis,
    numberOfEps,
    subtype,
    posterImage,
    watched,
    dateStarted,
    dateFinished,
    watchedEps,
    personalRating,
    notes,
    position,
  } = formData;

  const onChangeSelect = (selectValue) => {
    setFormData({...formData, watched: selectValue.value});
    if (selectValue.value === "Started") {
      setIsDisabledStarted(false);
      setIsDisabledFinished(true);
      setFormData({...formData,
        dateFinished: '',
        personalRating: '',
      });
    } else if (selectValue.value === "Complete") {
      setIsDisabledStarted(false);
      setIsDisabledFinished(false);
    } else {
      setIsDisabledStarted(true);
      setIsDisabledFinished(true);
      setFormData({...formData,
        dateStarted: '',
        dateFinished: '',
        personalRating: '',
      });
    }
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    addListItem({
      title,
      averageRating,
      synopsis,
      numberOfEps,
      subtype,
      posterImage,
      watched,
      dateStarted,
      dateFinished,
      watchedEps,
      personalRating,
      notes,
      position,
    });

    setFormData({
      title: '',
      averageRating: '',
      synopsis: '',
      numberOfEps: '',
      subtype: '',
      posterImage: '',
      watched: '',
      dateStarted: '',
      dateFinished: '',
      watchedEps: '',
      personalRating: '',
      notes: '',
      position: '',
    });
  };

  const options = [
    {value: 'Not Started', label: 'Not Started'},
    {value: 'Started', label: 'Started'},
    {value: 'Complete', label: 'Complete'},
  ];

  const styles = {
    control: (base) => ({
      ...base,
      fontSize: '.875rem',
      minHeight: '.25rem',
    }),
    menu: (base) => ({
      ...base,
      fontSize: '.875rem',
    }),
    valueContainer: (base) => ({
      ...base,
      paddingTop: '0',
      paddingBottom: '0',
    }),
    dropdownIndicator: (base) => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0,
    }),
    clearIndicator: (base) => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0,
    }),
  }

  return (
    <>
      <form className="form row g-2 my-3" onSubmit={onSubmit}>
        <div className="col-5 my-auto">
          <div className="input-group input-group-sm">
            <input className="form-control" type="text" placeholder="Title" name="title" value={title || ''} onChange={onChange} required />
          </div>
        </div>
        <div className="col-2 my-auto">
          <Select className="" styles={styles} name="watched" defaultValue={options[0]} options={options} onChange={onChangeSelect} />
        </div>
        <div className="col-2 my-auto">
          <div className="input-group input-group-sm">
            <input className="form-control text-center" type="text" placeholder="Started" onBlur={(e) => e.target.type = 'text'} onFocus={(e) => e.target.type = 'date'} name="dateStarted" value={dateStarted || ""} onChange={onChange}  disabled={isDisabledStarted} />
            <input className="form-control text-center" type="text" placeholder="Finished" onBlur={(e) => e.target.type = 'text'} onFocus={(e) => e.target.type = 'date'} name="dateFinished" value={dateFinished || ""} onChange={onChange} disabled={isDisabledFinished} />
          </div>
        </div>
        <div className="col-1 ps-0 my-auto">
          <div className="input-group input-group-sm">
            <input className="form-control text-center" type="number" min="0" max="10" placeholder="Rate" name="personalRating" value={personalRating} onChange={onChange} disabled={isDisabledFinished} />
          </div>
        </div>
        <div className="col-1 my-auto">
          <button type="submit" className="btn btn-sm btn-primary"><i className="fa-solid fa-check"></i></button>
        </div>
      </form>
    </>
  );
};

AddListItem.propTypes = {
  addListItem: PropTypes.func.isRequired,
};

// const mapStateToProps = (state) => ({
//   list: state.list,
// });

export default connect(null, { addListItem })(AddListItem);
