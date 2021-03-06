import React from 'react';

import { render, cleanup, getByTestId, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';

import Checkbox from '../Checkbox';

afterEach(cleanup);

describe('Checkbox tests', function () {
    describe('Basic Checkbox usage', function () {
        it('should behave as a checkbox', function () {
            const handleChange = jest.fn();
            const { container } = render(<Checkbox id="foo" onChange={handleChange} />);

            expect(getByTestId(container, 'pcr-input')).toHaveAttribute('type', 'checkbox');

            fireEvent.click(getByTestId(container, 'pcr-input'));

            expect(handleChange).toHaveBeenCalled();
            expect(handleChange).toHaveBeenCalledTimes(1);
            expect(getByTestId(container, 'pcr-input').checked).toBe(true);

            fireEvent.click(getByTestId(container, 'pcr-input'));

            expect(handleChange).toHaveBeenCalledTimes(2);
            expect(getByTestId(container, 'pcr-input').checked).toBe(false);
        });

        it('should render icons with the correct classNames', function () {
            let c1 = render(<Checkbox icon={<i className="mdi mdi-check" />}>Hello there.</Checkbox>).container;
            let c2 = render(<Checkbox svg={<i className="mdi mdi-check" />}>Hello there.</Checkbox>).container;
            let c3 = render(<Checkbox image={<i className="mdi mdi-check" />}>Hello there.</Checkbox>).container;

            expect(getByTestId(c1, 'pcr-wrapper')).toHaveClass('p-icon');
            expect(getByTestId(c2, 'pcr-wrapper')).toHaveClass('p-svg');
            expect(getByTestId(c3, 'pcr-wrapper')).toHaveClass('p-image');
        });
    });

    describe('Checkbox errors', function () {
        it('should throw when using an unsupported animation', function () {
            expect(() => render(<Checkbox animation="tada">Hello there.</Checkbox>)).toThrow();
        });
    });

    describe('Checkbox indeterminate', function () {
        it('should provide style hooks when checkbox is an indeterminate', function () {
            const { container } = render(<Checkbox indeterminate>Hello there.</Checkbox>);

            expect(getByTestId(container, 'pcr-wrapper')).toHaveClass('p-has-indeterminate');
        });
    });
});
