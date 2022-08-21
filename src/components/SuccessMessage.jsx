import PropTypes from 'prop-types';

const SuccessMessage = ({ successMessage }) => {
	return (
		<p
			style={{
				color: 'green',
				border: '1px solid green',
				padding: '10px',
				backgroundColor: 'gainsboro',
			}}
		>
			{successMessage}
		</p>
	);
};

SuccessMessage.propTypes = {
	successMessage: PropTypes.string.isRequired,
};

export default SuccessMessage;
