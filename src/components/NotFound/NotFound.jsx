import React, {Component} from 'react';
import './index.scss';
import intl from 'react-intl-universal';

export default class NotFound extends Component {
    render() {
        return (
            <div className={'error_400_container'}>
                <div className={'content'}>
                    <div className={'err_bg'}></div>
                    <div className={'tips'}>
                        <div className={'title'}>{intl.get('page.error.404.tips.title')}</div>
                        <div className={'tip'}>{intl.get('page.error.404.tips.tip')}</div>
                    </div>
                    <div className={'buttons'}>
                        <div
                            className={`btn`}
                            onClick={() => {
                                window.location.replace(window.location.origin + process.env.PUBLIC_URL);
                            }}
                        >
                            {intl.get('page.error.404.tips.btn')}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
