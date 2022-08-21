const BlogForm = ({
	addBlog,
	title,
	setTitle,
	author,
	setAuthor,
	url,
	setUrl,
}) => {
	return (
		<div>
			<h1>create new</h1>
			<form onSubmit={addBlog} data-testid='blogForm' id='blogForm'>
				<div>
					title
					<input
						id="title"
						type='text'
						value={title}
						name='Title'
						onChange={(e) => setTitle(e.target.value)}
						required
						placeholder='title here'
					/>
				</div>
				<div>
					author
					<input
						id="author"
						type='text'
						value={author}
						name='author'
						required
						onChange={(e) => setAuthor(e.target.value)}
						placeholder='author here'
					/>
				</div>
				<div>
					url
					<input
						id="url"
						type='text'
						value={url}
						name='url'
						onChange={(e) => setUrl(e.target.value)}
						required
						placeholder='url here'
					/>
				</div>
				<button id="create-button" type='submit'>create</button>
			</form>
		</div>
	);
};

export default BlogForm;
