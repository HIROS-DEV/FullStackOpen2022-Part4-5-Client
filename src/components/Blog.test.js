import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';
import BlogForm from './BlogForm';

describe('<Blog /> component test (Exercises 5.13.-5.16.)', () => {
	const blog = {
		url: 'http://dummyblog.com',
		title: 'Test',
		author: 'test user',
		user: 'test user',
		likes: 10,
	};

	test('display a blog title and author, but does not render url and likes (5.13: Blog list tests, step1)', () => {
		const { container } = render(<Blog blog={blog} />);

		const div = container.querySelector('.blog');
		const beforeView = container.querySelector('.beforeView');
		const afterView = container.querySelector('.afterView');

		expect(div).toHaveTextContent('Test');
		expect(div).toHaveTextContent('test user');
		expect(beforeView).not.toHaveStyle('display: none');
		expect(afterView).toHaveStyle('display: none');
	});

	test('a blog url and number of likes show when the button clicked (5.14: Blog list tests, step2)', async () => {
		const { container } = render(<Blog blog={blog} />);

		const div = container.querySelector('.blog');
		const beforeView = container.querySelector('.beforeView');
		const afterView = container.querySelector('.afterView');

		const user = userEvent.setup();
		const button = screen.getByText('view');
		await user.click(button);

		expect(div).toHaveTextContent('http://dummyblog.com');
		expect(div).toHaveTextContent(10);
		expect(beforeView).toHaveStyle('display: none');
		expect(afterView).not.toHaveStyle('display: none');
	});

	test('if the like button is clicked twice, event handler calls twice (5.15: Blog list tests, step3)', async () => {
		const handleLikes = jest.fn();

		const { container } = render(
			<Blog blog={blog} handleLikes={handleLikes} />
		);

		const div = container.querySelector('.blog');
		const user = userEvent.setup();
		const button = screen.getByText('like');
		await user.click(button);
		await user.click(button);

		expect(div).toHaveTextContent(12);
		expect(handleLikes.mock.calls).toHaveLength(2);
	});

	test('<BlogForm /> create new blog correctly when calls onSubmit (5.16: Blog list tests, step4)', async () => {
		const title = 'This is new blog';
		const url = 'http://dummyblog.com';
		const author = 'Test User';
		const addBlog = jest.fn();
		const setTitle = jest.fn();
		const setUrl = jest.fn();
		const setAuthor = jest.fn();

		render(
			<BlogForm
				addBlog={addBlog}
				title={title}
				url={url}
				author={author}
				setTitle={setTitle}
				setUrl={setUrl}
				setAuthor={setAuthor}
			/>
		);

		const titleInput = screen.getByPlaceholderText('title here');
		const authorInput = screen.getByPlaceholderText('author here');
		const urlInput = screen.getByPlaceholderText('url here');
		const user = userEvent.setup();
		const button = screen.getByText('create');

		await user.type(titleInput, 'This is new blog');
		await user.type(authorInput, 'Test User');
		await user.type(urlInput, 'http://dummyblog.com');
		await user.click(button);

		expect(addBlog.mock.calls).toHaveLength(1);
	});
});
