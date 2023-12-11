import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';
import Pagination from './Pagination';

const Profiles = ({
    getProfiles,
    profile: { profiles, totalPage, currentPage, loading },
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    useEffect(() => {
        getProfiles(localPage);
    }, [getProfiles, localPage]);

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
                    <Pagination
                        currentPage={currentPage}
                        totalPage={totalPage}
                        onPageChange={setLocalPage}
                    ></Pagination>
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
