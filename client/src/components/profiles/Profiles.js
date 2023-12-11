import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';

const Profiles = ({
    getProfiles,
    profile: { profiles, totalPages, currentPage, loading },
}) => {
    const [localPage, setLocalPage] = useState(currentPage);

    useEffect(() => {
        getProfiles(localPage);
    }, [getProfiles, localPage]);

    const incrementPage = () => {
        if (localPage < totalPages) {
            setLocalPage(localPage + 1);
        }
    };

    const decrementPage = () => {
        if (localPage > 1) {
            setLocalPage(localPage - 1);
        }
    };

    return (
        <section className="container">
            {loading ? (
                <Spinner />
            ) : (
                <Fragment>
                    <h1 className="large text-primary">Developers</h1>
                    <p className="lead">
                        <i className="fab fa-connectdevelop" /> Browse and
                        connect with developers
                    </p>
                    <div className="profiles">
                        {profiles.length > 0 ? (
                            profiles.map((profile) => (
                                <ProfileItem
                                    key={profile._id}
                                    profile={profile}
                                />
                            ))
                        ) : (
                            <h4>No profiles found...</h4>
                        )}
                    </div>
                    <div className="buttons">
                        <button
                            className="btn btn-light"
                            onClick={() => decrementPage()}
                        >
                            Previous
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={() => incrementPage()}
                        >
                            Next
                        </button>
                    </div>
                </Fragment>
            )}
        </section>
    );
};

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.shape({
        profiles: PropTypes.array.isRequired,
        totalPages: PropTypes.number,
        currentPage: PropTypes.number,
        loading: PropTypes.bool.isRequired,
    }).isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
