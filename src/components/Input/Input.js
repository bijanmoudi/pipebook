import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './index.scss';

const Input = React.forwardRef(
	(
		{
			value,
			className,
			autoFocus,
			hasReset,
			onChange,
			onSubmit,
			onValidate,
			onStopTyping,
			stopTypingThreshold,
			validateOnStart,
			containerClassName,
			...restProps
		},
		ref
	) => {
		const [text, setText] = useState(value);
		const [errors, setError] = useState([]);
		const [typingTimeout, setTypingTimeout] = useState(null);
		const handleChange = val => {
			setText(val);
			onChange(val, ref.current);
			typingTimeout && clearTimeout(typingTimeout);
			setTypingTimeout(
				setTimeout(() => onStopTyping(val, ref.current), stopTypingThreshold)
			);
		};
		const handleValidation = input => {
			let errors = [];
			const isValid = input.checkValidity();
			if (!isValid) {
				errors.push(input.validationMessage);
			}
			setError(errors);
			onValidate(errors);
		};
		const handleSubmit = e => {
			e.key === 'Enter' &&
				document.activeElement === ref.current &&
				errors.length === 0 &&
				onSubmit(ref.current);
		};
		const handleReset = () => {
			handleChange('');
			ref.current.focus();
		};
		useEffect(() => {
			setText(value);
		}, [value]);
		useEffect(() => {
			ref.current && handleValidation(ref.current);
			// eslint-disable-next-line
		}, [text]);
		useEffect(() => {
			validateOnStart && handleValidation(ref.current);
			autoFocus && ref.current && ref.current.focus();
			// eslint-disable-next-line
		}, [ref.current]);
		useEffect(() => {
			window.addEventListener('keyup', handleSubmit);
			return () => {
				window.removeEventListener('keyup', handleSubmit);
			};
		});
		return (
			<div
				className={classnames('input', {
					[containerClassName]: containerClassName
				})}
			>
				<input
					ref={ref}
					value={text}
					onChange={e => handleChange(e.target.value)}
					className={classnames('input__element', {
						[className]: className
					})}
					{...restProps}
				/>
				{hasReset && text.length ? (
					<div className="input__reset-container">
						<button
							className="input__reset"
							title="Reset"
							onClick={handleReset}
						>
							<span className="visuallyhidden">Reset</span>
						</button>
					</div>
				) : null}
				{errors.length ? (
					<div className="input__tip" role="alert">
						<ul>
							{errors.map((error, key) => (
								<li key={`__error${key}`} className="input__tip-item">
									{error}
								</li>
							))}
						</ul>
					</div>
				) : null}
			</div>
		);
	}
);

Input.propTypes = {
	value: PropTypes.string,
	spellCheck: PropTypes.oneOf(['true', 'false', true, false]),
	autoCapitalize: PropTypes.oneOf(['on', 'off']),
	autoCorrect: PropTypes.oneOf(['on', 'off']),
	autoComplete: PropTypes.oneOf(['on', 'off']),
	autoFocus: PropTypes.bool,
	hasReset: PropTypes.bool,
	onChange: PropTypes.func,
	onSubmit: PropTypes.func,
	onValidate: PropTypes.func,
	onStopTyping: PropTypes.func,
	stopTypingThreshold: PropTypes.number,
	validateOnStart: PropTypes.bool,
	containerClassName: PropTypes.oneOfType([() => null, PropTypes.string])
};

Input.defaultProps = {
	value: '',
	spellCheck: 'false',
	autoCapitalize: 'off',
	autoCorrect: 'off',
	autoComplete: 'off',
	autoFocus: false,
	hasReset: true,
	onChange: () => {},
	onSubmit: () => {},
	onValidate: () => {},
	onStopTyping: () => {},
	stopTypingThreshold: 500,
	validateOnStart: false,
	containerClassName: null
};

export default Input;
