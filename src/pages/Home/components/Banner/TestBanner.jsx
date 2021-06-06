/* eslint-disable new-cap */
import React from 'react';
import {Button, ResponsiveGrid} from '@alifd/next';

import './index.scss';
import CDFData_abi from './abi/CDFData_abi';
import ETHCallOptionPool_abi from './abi/ETHCallOptionPool_abi';

const {Cell} = ResponsiveGrid;

const ds = ['desktop', 'tablet', 'phone'];

const handleClick = async () => {
    const accounts = await window.web3.eth.getAccounts();
    alert(`Metamask account: ${accounts[0]}`);
};

const getBalance = async () => {
    const accounts = await window.web3.eth.getAccounts();
    window.web3.eth.getBalance(accounts[0]).then((result) => {
        alert(`balance:${result}`);
    });
};

const readContractTest = async () => {
    let CDFData_Contract_Address = '0xf6b0A53b25DB52944D4144DD8A8Da3c6021CBFcC';

    //     const accounts = await window.web3.eth.getAccounts();
    //     const currentAccount = accounts;

    let myContract = new window.web3.eth.Contract(CDFData_abi, CDFData_Contract_Address);

    await myContract.methods
        .Amplifier()
        .call()
        .then((result) => {
            alert(result);
        });

    await myContract.methods
        .Durations(5)
        .call()
        .then((result) => {
            alert(result);
        });
};

const writeContractTest = async () => {
    let ETHCallOptionPool_Contract_Address = '0xD4ab939838D7AC56e6cef22048b4D51a13f213C2';

    let accounts = await window.web3.eth.getAccounts();
    //     const currentAccount = accounts;

    let myContract = new window.web3.eth.Contract(ETHCallOptionPool_abi, ETHCallOptionPool_Contract_Address);

    //https://ethereum.stackexchange.com/questions/59122/web3-js-1-0-is-throwing-big-number-error-while-transfering-tokens
    let tokens = window.web3.utils.toWei('0.01', 'ether');

    await myContract.methods
        .depositETH()
        .send({
            from: accounts[0],
            value: tokens,
            gas: '3000000',
        })
        .then(() => {
            alert('success！');
        });
};

const Banner = () => {
    return (
        <section id="J_banner" className="section b_container">
            <div className="section_container">
                <ResponsiveGrid gap={10}>
                    <Cell className="grid-6 section_item intro" colSpan={6}>
                        <div className="content"/>
                    </Cell>
                    <Cell className="grid-6 section_item wallet" colSpan={6}>
                        <Button type="primary" size="large" onClick={handleClick} className="submitBtn">
                            connect
                        </Button>
                        <Button type="primary" size="large" onClick={getBalance} className="submitBtn">
                            balance
                        </Button>
                        <Button type="primary" size="large" onClick={readContractTest} className="submitBtn">
                            Read
                        </Button>
                        <Button type="primary" size="large" onClick={writeContractTest} className="submitBtn">
                            Write
                        </Button>
                    </Cell>
                </ResponsiveGrid>
            </div>
        </section>
    );
};

export default Banner;
