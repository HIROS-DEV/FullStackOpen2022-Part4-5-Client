const LoginForm = ({
	username,
	setUsername,
	password,
	setPassword,
	handleLogin,
}) => {
	return (
		<div>
			<h1>log in to application</h1>
			<form action='' onSubmit={handleLogin}>
				<div>
					username
					<input
						id="username"
						type='text'
						value={username}
						name='Username'
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</div>
				<div>
					password
					<input
						id="password"
						type='password'
						value={password}
						name='Password'
						onChange={(e) => setPassword(e.target.value)}
						autoComplete='false'
						required
					/>
				</div>
				<button id="login-button" type='submit'>login</button>
			</form>
		</div>
	);
};
export default LoginForm;
