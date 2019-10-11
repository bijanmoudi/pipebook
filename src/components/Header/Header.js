import React from 'react';
import classnames from 'classnames';
import { Logo } from '../../components';
import './index.scss';

const Header = ({ className, ...restProps }) => {
	return (
		<header
			className={classnames('header', { [className]: className })}
			{...restProps}
		>
			<div className="wrapper">
				<div className="header__inner">
					<div className="header__column">
						<a
							href="//pipedrive.com"
							target="_blank"
							rel="noopener noreferrer nofollow"
							className="header__logo"
							itemScope="itemscope"
							itemType="https://schema.org/Organization"
						>
							<Logo id="header-logo" />
						</a>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
