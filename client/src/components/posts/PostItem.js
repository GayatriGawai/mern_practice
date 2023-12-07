import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike } from '../../actions/post';

const PostItem = ({
    addLike,
    removeLike,
    auth,
    post: { _id, user, text, name, avatar, likes, comments, date },
}) => {
    return (
        <div class="post bg-white my-1 p-1">
            <div>
                <a href="profile.html">
                    <img class="round-img my-1" src={avatar} alt="" />
                    <h4>{name}</h4>
                </a>
            </div>
            <div>
                <p class="my-1">{text}</p>
                <p class="post-date">
                    Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
                </p>
                <button onClick={(e) => addLike(_id)} class="btn">
                    <i class="fas fa-thumbs-up"></i>
                    {likes.length > 0 && <span> {likes.length}</span>}
                </button>
                <button onClick={(e) => removeLike(_id)} class="btn">
                    <i class="fas fa-thumbs-down"></i>
                </button>

                <Link to={`/post/${_id}`} class="btn btn-primary">
                    Discussion{' '}
                    {comments.length > 0 && (
                        <span className="comment-count">{comments.length}</span>
                    )}
                </Link>
                {!auth.loading && user === auth.user._id && (
                    <button type="button" class="btn btn-danger">
                        <i class="fas fa-times" />
                    </button>
                )}
            </div>
        </div>
    );
};

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps, { addLike, removeLike })(PostItem);
