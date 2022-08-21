import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
	token = `bearer ${newToken}`;
};

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};

const create = async (newObject) => {
	const config = {
		headers: { Authorization: token },
	};

	const response = await axios.post(baseUrl, newObject, config);
	return response.data;
};

const like = async (blogId, newObject) => {
	const config = {
		headers: { Authorization: token },
	};

	const response = await axios.put(
		`${baseUrl}/${blogId}`,
		newObject,
		config
	);

	return response.data;
};

const remove = async (blogId) => {
	const config = {
		headers: { Authorization: token },
	};

	const response = await axios.delete(`${baseUrl}/${blogId}`, config);
	return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, like, setToken, remove };
