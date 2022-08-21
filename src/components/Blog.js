import { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, handleLikes, handleRemove }) => {
	const [blogVisible, setBlogVisible] = useState(false);
	const [likes, setLikes] = useState(blog.likes);

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	};

	const hideWhenVisible = { display: blogVisible ? 'none' : '' };
	const showWhenVisible = { display: blogVisible ? '' : 'none' };

	const handleLike = (blog) => {
		handleLikes(blog.id, likes + 1);
		setLikes(likes + 1);
	};

	const handleView = () => {
		setBlogVisible(!blogVisible);
	};

	return (
		<div style={blogStyle} className='blog'>
			<div style={hideWhenVisible} className='beforeView'>
				{blog.title} {blog.author}
				<button className='view' onClick={handleView}>view</button>
			</div>
			<div style={showWhenVisible} className='afterView'>
				<div>
					{blog.title} {blog.author}
					<button className='hide' onClick={handleView}>hide</button>
				</div>
				<ul style={{ listStyle: 'none' }}>
					<li>BLOG URL: {blog.url}</li>
					<li className='blog'>
						BLOG LIKES: {likes}{' '}
						<button id='like-button' onClick={() => handleLike(blog)}>like</button>
					</li>
					<li>BLOG USERNAME: {blog?.user?.username}</li>
					<li>
						<button onClick={() => handleRemove(blog)}>remove</button>
					</li>
				</ul>
			</div>
		</div>
	);
};

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	handleLikes: PropTypes.func.isRequired,
	handleRemove: PropTypes.func.isRequired,
};

export default Blog;
