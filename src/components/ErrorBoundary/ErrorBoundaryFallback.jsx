import React from 'react';
import './index.scss';
import intl from 'react-intl-universal';

const ErrorBoundaryFallback = ({componentStack, error}) => {
    return (
        <div className={'error_500_container'}>
            <div className={'content'}>
                <div className={'err_bg'}></div>
                <div className={'tips'}>
                    <div className={'title'}>{intl.get('page.error.500.tips.title')}</div>
                    <div className={'tip'}>{intl.get('page.error.500.tips.tip')}</div>
                </div>
                <div className={'buttons'}>
                    <div
                        className={`btn`}
                        onClick={() => {
                            window.location.replace(window.location.origin + process.env.PUBLIC_URL);
                        }}
                    >
                        {intl.get('page.error.500.tips.btn')}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorBoundaryFallback;
