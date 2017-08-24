import React from 'react';
import {assert} from 'chai';
import { shallow } from 'enzyme';

import Header from '../../src/js/components/Header';

describe('Header', () => {

	it('displays all the elements of a game ', () => {
		const wrapper = shallow(<Header />);
		assert.isTrue(wrapper.find('.header').exists());
		assert.isNotNull(wrapper.find('.header').text());
	});

});
