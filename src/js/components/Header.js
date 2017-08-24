import React from 'react';
import settings from '../settings';

import './Header.scss';

const Header = () => {
	const getTitle = () => {
		const labels = settings.map(item => item.image);
		return labels.join(' - ');
	};

	return <div className="header">{getTitle()}</div>;
};

export default Header;
