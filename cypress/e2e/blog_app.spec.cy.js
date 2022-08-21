describe('Blog app', function () {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3003/api/testing/reset');

		const user = {
			name: 'root',
			username: 'root',
			password: 'secret',
		};

		cy.request('POST', 'http://localhost:3003/api/users/', user);
		cy.visit('http://localhost:3000');
	});

	it('Login form is shown', function () {
		cy.contains('log in to application');
	});

	describe('Login', function () {
		it('succeeds with correct credentials', function () {
			cy.contains('login').click();
			cy.get('#username').type('root');
			cy.get('#password').type('secret');
			cy.get('#login-button').click();
			cy.contains('user : root logged in this application');
		});

		it('fails with wrong credentials', function () {
			cy.contains('login').click();
			cy.get('#username').type('root');
			cy.get('#password').type('wrong');
			cy.get('#login-button').click();
			cy.get('.error')
				.should('contain', 'Wrong username or password')
				.and('have.css', 'color', 'rgb(255, 0, 0)')
				.and('have.css', 'border-style', 'solid');

			cy.get('html').should(
				'not.contain',
				'user : root logged in this application'
			);
		});
	});

	describe('when logged in', function () {
		beforeEach(function () {
			cy.login({ username: 'root', password: 'secret' });
		});

		it('A blog can be created', function () {
			cy.contains('new blog').click();
			cy.get('#title').type('New Blog Title');
			cy.get('#author').type('root');
			cy.get('#url').type('https://new-blog.com');
			cy.get('#create-button').click();
			cy.contains('New Blog Title');
		});

		describe('and a blog exists', function () {
			beforeEach(function () {
				cy.createBlog({
					title: 'first Blog',
					author: 'first author',
					url: 'https://first-blog.com',
					likes: 10,
				});
				cy.createBlog({
					title: 'second Blog',
					author: 'second author',
					url: 'https://second-blog.com',
					likes: 20,
				});
				cy.createBlog({
					title: 'third Blog',
					author: 'third author',
					url: 'https://third-blog.com',
					likes: 30,
				});
			});

			it('A blog can be added to the last line of existing blogs', function () {
				cy.createBlog({
					title: 'fourth Blog',
					author: 'fourth author',
					url: 'https://fourth-blog.com',
				});
				cy.contains('fourth Blog');
			});

			it('User can like a blog', function () {
				cy.contains('view').click();
				cy.contains('like').click();
				cy.contains('BLOG LIKES: 1');
			});

			it('User can delete blog', function () {
				cy.contains('view').click();
				cy.contains('remove').click();
				cy.contains('Message deleted successfully');
			});

			it(' the blogs are ordered according to likes with the blog', function () {
				cy.get('.view').eq(0).click();
				cy.contains('BLOG LIKES: 30');
				cy.get('.hide').eq(0).click();

				cy.get('.view').eq(1).click();
				cy.contains('BLOG LIKES: 20');
				cy.get('.hide').eq(1).click();

				cy.get('.view').eq(2).click();
				cy.contains('BLOG LIKES: 10');
				cy.get('.hide').eq(2).click();
			});
		});
	});
});
