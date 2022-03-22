import React, { AllHTMLAttributes, forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FaChevronUp } from 'react-icons/fa';

export interface AsScrollToTopProps extends AllHTMLAttributes<HTMLElement> {
  /**
   * A string of all className you want applied to the component.
   */
  className?: string;
  /**
   * A string of all className you want applied to the component icon.
   */
  iconClassName?: string;
}

export const AsScrollToTop = forwardRef<HTMLAnchorElement, AsScrollToTopProps>(
  ({ children, className, iconClassName, ...rest }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const classNameInner = classNames(
      `scroll-to-top group fixed right-5 bottom-5 flex items-center justify-center w-12 h-12 text 
      no-underline bg-black/[.7] rounded-full transition-all duration-300 ease-in-out cursor-pointer
      hover:bg-black/[.9] shadow-lg`,
      className
    );
    const iconClassNameInner = classNames(
      'scroll-to-top-icon group-hover:-translate-y-2.5 text-white transition-all duration-300 ease-in-out',
      iconClassName
    );

    // Show button when page is scorlled upto given distance
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Set the top cordinate to 0
    // make scrolling smooth
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    useEffect(() => {
      window.addEventListener('scroll', toggleVisibility);
    }, []);

    return (
      // eslint-disable-next-line react/jsx-no-useless-fragment
      <>
        {isVisible && (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
          <a onClick={scrollToTop} className={classNameInner} ref={ref} {...rest}>
            <div className={iconClassNameInner}>
              <FaChevronUp size="1.2rem" />
            </div>
          </a>
        )}
      </>
    );
  }
);

AsScrollToTop.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  iconClassName: PropTypes.string,
};

AsScrollToTop.displayName = 'AsScrollToTop';
