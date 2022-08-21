import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import SuccessMessage from './components/SuccessMessage';
import ErrorMessage from './components/ErrorMessage';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const [successMessage, setSuccessMessage] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');

	const addBlog = async (e) => {
		e.preventDefault();

		try {
			const newBlog = await blogService.create({
				author,
				url,
				title,
			});
			setBlogs(blogs.concat(newBlog));
			setSuccessMessage(`a new blog ${title} by ${author} added`);
			setTitle('');
			setAuthor('');
			setUrl('');

			setTimeout(() => {
				setSuccessMessage(null);
			}, 5000);
		} catch (exception) {
			setErrorMessage('Something Wrong');
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const user = await loginService.login({
				username,
				password,
			});

			window.localStorage.setItem(
				'loggedBlogappUser',
				JSON.stringify(user)
			);

			blogService.setToken(user.token);
			setSuccessMessage(
				`user : ${user.username} logged in this application`
			);
			setUser(user);
			setUsername('');
			setPassword('');
			setTimeout(() => {
				setSuccessMessage(null);
			}, 5000);
		} catch (exception) {
			setErrorMessage('Wrong username or password');
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};

	const handleLogout = () => {
		window.localStorage.clear();
		setUser(null);
	};

	const handleLikes = async (id, likes) => {
		await blogService.like(id, { likes });
	};

	const handleRemove = async (deleteBlog) => {
		if (
			window.confirm(
				`Remove ${deleteBlog.title} by ${deleteBlog.author}`
			)
		) {
			try {
				await blogService.remove(deleteBlog.id);
				setSuccessMessage(`Message deleted successfully`);
				setTimeout(() => {
					setSuccessMessage(null);
				}, 5000);
				setBlogs(blogs.filter((blog) => blog.id !== deleteBlog.id));
			} catch (exception) {
				setErrorMessage('You can delete only your blog');
				setTimeout(() => {
					setErrorMessage(null);
				}, 5000);
			}
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			const blogs = await blogService.getAll();
			blogs.sort((a, b) => b.likes - a.likes);
			setBlogs(blogs);
		};
		fetchData();
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem(
			'loggedBlogappUser'
		);

		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	return (
		<div>
			<h2>blogs</h2>
			{successMessage && (
				<SuccessMessage successMessage={successMessage} />
			)}
			{errorMessage && <ErrorMessage errorMessage={errorMessage} />}

			{user === null ? (
				<LoginForm
					username={username}
					setUsername={setUsername}
					password={password}
					setPassword={setPassword}
					handleLogin={handleLogin}
				/>
			) : (
				<>
					{user.username} logged in{' '}
					<button onClick={handleLogout}>logout</button>
					<Togglable buttonLabel='new blog'>
						<BlogForm
							addBlog={addBlog}
							title={title}
							setTitle={setTitle}
							author={author}
							setAuthor={setAuthor}
							url={url}
							setUrl={setUrl}
						/>
					</Togglable>
					{blogs.map((blog) => (
						<Blog
							key={blog.id}
							blog={blog}
							setBlogs={setBlogs}
							handleLikes={handleLikes}
							handleRemove={handleRemove}
						/>
					))}
				</>
			)}
		</div>
	);
};

export default App;
