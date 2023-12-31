import React, { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';
import Alert from '../layout/Alert';

const AddExperience = ({ addExperience }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: '',
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const { company, title, location, from, to, current, description } =
        formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    return (
        <Fragment>
            <section className="container">
                <Alert />
                <h1 className="large text-primary">Add An Experiance</h1>
                <p className="lead">
                    <i className="fas fa-code-branch"></i> Add any
                    developer/programming positions that you have had in the
                    past
                </p>
                <small>* = required fields</small>
                <form
                    className="form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        addExperience(formData).then(() =>
                            navigate('/dashboard')
                        );
                    }}
                >
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="* Job title"
                            name="title"
                            value={title}
                            onChange={(e) => onChange(e)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="* Company"
                            name="company"
                            value={company}
                            onChange={(e) => onChange(e)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Location"
                            value={location}
                            onChange={(e) => onChange(e)}
                            name="location"
                        />
                    </div>
                    <div className="form-group">
                        <h4>From Date</h4>
                        <input
                            type="date"
                            name="from"
                            value={from}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <p>
                            <input
                                type="checkbox"
                                name="current"
                                checked={current}
                                value={current}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        current: !current,
                                    });
                                    toggleDisabled(!toDateDisabled);
                                }}
                            />{' '}
                            Current Job
                        </p>
                    </div>
                    <div className="form-group">
                        <h4>To Date</h4>
                        <input
                            type="date"
                            name="to"
                            value={to}
                            onChange={(e) => onChange(e)}
                            disabled={toDateDisabled ? 'disabled' : ''}
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            name="description"
                            cols="30"
                            rows="5"
                            placeholder="job Description"
                            value={description}
                            onChange={(e) => onChange(e)}
                        ></textarea>
                    </div>
                    <input type="submit" className="btn btn-primary my-1" />
                    <a href="dashboard.html" className="btn my-1">
                        Go back
                    </a>
                </form>
            </section>
        </Fragment>
    );
};

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(AddExperience);
