import PropTypes from 'prop-types';
import './ErrorMessage.css';

const ErrorMessage = ({ errorMessage }) => {
	return <p className='error'>{errorMessage}</p>;
};

ErrorMessage.propTypes = {
	errorMessage: PropTypes.string.isRequired,
};

export default ErrorMessage;
