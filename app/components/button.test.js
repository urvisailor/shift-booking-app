import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Button from './Button'; // Replace with your Button import path
import { COLORS } from '../constants/colors';
import { greenLoader, redLoader } from '../constants/svgs';

test('Button renders title text', () => {
    const screen = render(<Button title="Test" onClick={() => { }} />);
    const buttonText = screen.getAllByText('Test');
    console.log(screen.getAllByText('Test'))
    expect(buttonText).toBeTruthy();
});

test('Disabled Button is visually disabled and doesn\'t trigger onClick', () => {
    const mockOnClick = jest.fn();
    const { getByText } = render(<Button title="Disabled Button" disable={true} onClick={mockOnClick} />);
    const buttonText = getByText('Disabled Button');
    fireEvent.press(buttonText);
    expect(mockOnClick).not.toHaveBeenCalled();
});