import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import Alert from '../layout/Alert';

const EditProfile = ({
    profile: { profile, loading },
    createProfile,
    getCurrentProfile,
    history,
}) => {
    const [formData, setFormData] = useState({
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: '',
    });

    const [displaySocialInputs, toggleSocialInputs] = useState(false);

    useEffect(() => {
        getCurrentProfile();

        setFormData({
            company: loading || !profile.company ? '' : profile.company,
            website: loading || !profile.website ? '' : profile.website,
            location: loading || !profile.location ? '' : profile.location,
            status: loading || !profile.status ? '' : profile.status,
            skills: loading || !profile.skills ? '' : profile.skills.join(', '),
            githubusername:
                loading || !profile.githubusername
                    ? ''
                    : profile.githubusername,
            bio: loading || !profile.bio ? '' : profile.bio,
            twitter: loading || !profile.social ? '' : profile.twitter,
            facebook: loading || !profile.social ? '' : profile.facebook,
            linkedin: loading || !profile.social ? '' : profile.linkedin,
            youtube: loading || !profile.social ? '' : profile.youtube,
            instagram: loading || !profile.social ? '' : profile.instagram,
        });
    }, [loading]);

    const {
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram,
    } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        createProfile(formData, history, true);
    };
    return (
        <Fragment>
            <section className="container">
                <Alert />
                <h1 className="large text-primary">Create your profile</h1>
                <p className="lead">
                    <i className="fas fa-user"> </i> Let's get some information
                    to make your profile stand out
                </p>
                <small>* = required fields</small>
                <form className="form" onSubmit={(e) => onSubmit(e)}>
                    <div className="form-group">
                        <select
                            name="status"
                            value={status}
                            onChange={(e) => onChange(e)}
                        >
                            <option value="0">
                                * Select Profession status
                            </option>
                            <option value="Developer">Developer</option>
                            <option value="Junior Developer">
                                Junior Developer
                            </option>
                            <option value="Senior Developer">
                                Senior Developer
                            </option>
                            <option value="Manager">Manager</option>
                            <option value="Student or Learning">
                                Student or learning
                            </option>
                            <option value="Instructor">Instructor</option>
                            <option value="Intern">Intern</option>
                            <option value="Other">Other</option>
                        </select>
                        <small className="form-text">
                            Give us an idea of where you are in your career
                        </small>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="company"
                            placeholder="Company"
                            value={company}
                            onChange={(e) => onChange(e)}
                        />
                        <small className="form-text">
                            Could be your own company or one you work for
                        </small>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="website"
                            placeholder="Website"
                            value={website}
                            onChange={(e) => onChange(e)}
                        />
                        <small className="form-text">
                            Could be your own or a company website
                        </small>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            value={location}
                            onChange={(e) => onChange(e)}
                        />
                        <small className="form-text">
                            City & state suggested (eg. Boston, MA)
                        </small>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="skills"
                            placeholder="* Skills"
                            value={skills}
                            onChange={(e) => onChange(e)}
                        />
                        <small className="form-text">
                            Please use comma seperated values (eg. HTML, CSS,
                            JavaScript, PHP)
                        </small>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="githubusername"
                            placeholder="Github Username"
                            value={githubusername}
                            onChange={(e) => onChange(e)}
                        />
                        <small className="form-text">
                            If you want your latest repos and a Github link,
                            include your username
                        </small>
                    </div>
                    <div className="form-group">
                        <textarea
                            name="bio"
                            placeholder="A short bio of yourself"
                            value={bio}
                            onChange={(e) => onChange(e)}
                        ></textarea>
                        <small className="form-text">
                            Tell us about yourself
                        </small>
                    </div>

                    <div className="my-2">
                        <button
                            onClick={() =>
                                toggleSocialInputs(!displaySocialInputs)
                            }
                            type="button"
                            className="btn btn-light"
                        >
                            Add Social Network Links
                        </button>
                        <span>
                            <small>Optional</small>
                        </span>
                    </div>
                    {displaySocialInputs && (
                        <Fragment>
                            <div className="form-group social-input">
                                <i className="fab fa-twitter fa-2x"></i>
                                <input
                                    type="text"
                                    name="twitter"
                                    placeholder="Twitter url"
                                    value={twitter}
                                    onChange={(e) => onChange(e)}
                                />
                            </div>
                            <div className="form-group social-input">
                                <i className="fab fa-facebook fa-2x"></i>
                                <input
                                    type="text"
                                    name="facebook"
                                    placeholder="Facebook url"
                                    value={facebook}
                                    onChange={(e) => onChange(e)}
                                />
                            </div>
                            <div className="form-group social-input">
                                <i className="fab fa-youtube fa-2x"></i>
                                <input
                                    type="text"
                                    name="youtube"
                                    placeholder="Youtube url"
                                    value={youtube}
                                    onChange={(e) => onChange(e)}
                                />
                            </div>
                            <div className="form-group social-input">
                                <i className="fab fa-linkedin fa-2x"></i>
                                <input
                                    type="text"
                                    name="linkedin"
                                    placeholder="Linkedin url"
                                    value={linkedin}
                                    onChange={(e) => onChange(e)}
                                />
                            </div>
                            <div className="form-group social-input">
                                <i className="fab fa-instagram fa-2x"></i>
                                <input
                                    type="text"
                                    name="instagram"
                                    placeholder="Instagram url"
                                    value={instagram}
                                    onChange={(e) => onChange(e)}
                                />
                            </div>
                        </Fragment>
                    )}

                    <input type="submit" className="btn btn-primary my-1" />
                    <Link to="/dashboard" className="btn btn-light my-1">
                        Go back
                    </Link>
                </form>
            </section>
        </Fragment>
    );
};

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
    EditProfile
);
