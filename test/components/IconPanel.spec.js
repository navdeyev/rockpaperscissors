import React from 'react';
import sinon from 'sinon';
import {assert} from 'chai';
import {shallow} from 'enzyme';

import settings from '../../src/js/settings';
import IconPanel from '../../src/js/components/IconPanel';

describe('IconPanel', () => {

	let props, onChange = sinon.spy();
	beforeEach(() => {
		props = {
			options: settings,
			onChange
		};
	});

	afterEach(() => {
		onChange.reset();
	});

	it('renders an icon for every item in the settings', () => {
		const wrapper = shallow(<IconPanel {...props} />);
		const icons = wrapper.find('.icon');

		assert.equal(icons.length, settings.length);
	});

	it('marks one of the icons as selected if selectedId is provided', () => {
		const noItemsSelectedWrapper = shallow(<IconPanel {...props} />);
		let selectedIcon = noItemsSelectedWrapper.find('.icon.selected');
		assert.isFalse(selectedIcon.exists());

		props.selectedId = 1;

		const hasSelectedItemWrapper = shallow(<IconPanel {...props} />);
		selectedIcon = hasSelectedItemWrapper.find('.icon.selected');
		assert.isTrue(selectedIcon.exists());

		const selectedSetting = settings.find(setting => setting.id === props.selectedId);
		assert.isTrue(selectedIcon.hasClass(selectedSetting.image));
	});

	it('executes onChange if the component is not disabled and no selectedId is provided', () => {
		const wrapper = shallow(<IconPanel {...props} />);

		const firstIcon = wrapper.find(`.${settings[0].image}`);
		firstIcon.simulate('click');

		assert.isTrue(props.onChange.calledWith(settings[0].id));
	});

	it('prevents execution of onChange if component is disabled', () => {
		props.disabled = true;
		const wrapper = shallow(<IconPanel {...props} />);

		const firstIcon = wrapper.find(`.${settings[0].image}`);
		firstIcon.simulate('click');

		assert.isFalse(props.onChange.called);
	});

	it('prevents execution of onChange if selectedId is provided', () => {
		props.selectedId = 1;
		const wrapper = shallow(<IconPanel {...props} />);

		const firstIcon = wrapper.find(`.${settings[0].image}`);
		firstIcon.simulate('click');

		assert.isFalse(props.onChange.called);
	});

	it('adds \'disabled\' class name if component is disabled', () => {
		const enabledWrapper = shallow(<IconPanel {...props} />);
		assert.isFalse(enabledWrapper.find('.iconPanel').hasClass('disabled'));

		props.disabled = true;

		const disabledWrapper = shallow(<IconPanel {...props} />);
		assert.isTrue(disabledWrapper.find('.iconPanel').hasClass('disabled'));
	});

});
