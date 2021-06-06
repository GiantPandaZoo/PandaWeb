import React from 'react';
import './index.scss';
import './font/iconfont.css';

import Logo from "../../../../components/Logo";

export default () => {
    let today = new Date();
    let year = today.getFullYear();
    return (
        <div className="footer_container">
            <div className="section f_section">
                <div className={'section_container footer_item_container'}>
                    <div className={'f_i_c_l'}>
                        <Logo/>
                        <div className="f_copyright">{year} © Option Panda. </div>
                    </div>
                    <div className={'f_i_c_m'}>
                        <a href="https://github.com/GiantPandaZoo/docs/blob/main/SlowMist%20Audit%20Report%20-%20OptionPanda.pdf" className={'slow_mist'} target={'_blank'}></a>
                    </div>
                    <div className={'f_i_c_r'}>
                        <a href="mailto:optionpanda@protonmail.com" className={'f_link'}>
                            <span className="iconfont icon-email-fill"></span>
                        </a>
                        <a
                            href="https://t.me/opandaofficial"
                            target={'_blank'}
                            className={'f_link'}
                        >
                            <span className="iconfont icon-telegram-original"></span>
                        </a>
                        <a
                            href="https://twitter.com/option_panda"
                            target={'_blank'}
                            className={'f_link'}
                        >
                            <span className="iconfont icon-twitter"></span>
                        </a>
                        <a
                            href="https://discord.gg/SdjEj49ePa"
                            target={'_blank'}
                            className={'f_link'}
                        >
                            <span className="iconfont icon-discord"></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
