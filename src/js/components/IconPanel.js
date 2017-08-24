import React from 'react';
import PropTypes from 'prop-types';

import './IconPanel.scss';

const IconPanel = ({options, selectedId, onChange, disabled}) => {

	const createChangeHandler = (option) => () => {
		if (!disabled && !selectedId) {
			onChange(option.id);
		}
	};

	const createIcon = (option) => {
		// I usually use 'classnames' library that provides a lot more flexibility when working with react classNames,
		// I opted out for string interpolation to avoid additional dependency
		const optionClassName = `icon ${ option.image } ${ option.id === selectedId ? 'selected' : ''}`;
		return <div key={ option.id } className={optionClassName} onClick={createChangeHandler(option)}/>;
	};

	return (
		<div className={ `iconPanel ${ disabled ? 'disabled' : ''}` }>
			{options.map(option => createIcon(option))}
		</div>
	);
};

IconPanel.propTypes = {
	options: PropTypes.array.isRequired,
	onChange: PropTypes.func.isRequired,
	selectedId: PropTypes.number,
	disabled: PropTypes.bool
};

export default IconPanel;
