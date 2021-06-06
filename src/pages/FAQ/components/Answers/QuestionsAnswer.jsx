import React, {Component} from 'react';
import {ResponsiveGrid} from '@alifd/next';

import './index.scss';
import TopJumper from "./TopJumper";

const {Cell} = ResponsiveGrid;

class QuestionsAnswer extends Component {
    render() {
        return (
            <ResponsiveGrid gap={20} columns={1}>
                <TopJumper/>
                <Cell className="grid-1 section_item" colSpan={1}>
                    <a name="question1"></a>
                    <div className={'question'}>
                        <div className={'avatar'}></div>
                        <div className={'dialog_box'}>
                            <span className={'bubble'}></span>
                            What is Option Panda?
                        </div>
                    </div>
                    <div className={'answer'}>
                        <div className={'avatar'}></div>
                        <div className={'dialog_box'}>
                            <span className={'bubble'}></span>
                            Option Panda is a decentralized options underwriting & trading exchange, which supports Ethereum, Binance Smart Chain etc. Its similar peers are Hegic and Binance Option, semi-decentralized and centralized in nature respectively. If you’re not familiar with option and its benefit, try learn some basics from here.
                        </div>
                    </div>
                </Cell>

                <Cell className="grid-1 section_item" colSpan={1}>
                    <a name="question2"></a>
                    <div className={'question'}>
                        <div className={'avatar'}></div>
                        <div className={'dialog_box'}>
                            <span className={'bubble'}></span>
                            What is the roadmap of Option Panda?
                        </div>
                    </div>
                    <div className={'answer'}>
                        <div className={'avatar'}></div>
                        <div className={'dialog_box'}>
                            <span className={'bubble'}></span>
                            <p>At its initial launch, Option Panda will focus on providing traditional cryptocurrency (BTCB/ETH/BNB etc.) option trading on Binance Smart Chain, with gradual listing of more underlying assets. In 2021, we’ll add CBBC(Callable Bull/Bear Contracts), which is a variant of options, to expand the product line. </p>
                            <p>It’s also a work in progress to support Ethereum Optimistic Rollup network, Algorand etc., for users of those public chains to trade options. Integration and combination with other decentralized asset trading platforms or protocols are also under rigorous consideration. Option Panda is gonna evolve to a composable exotic derivatives trading platform. We will listen to the community’s opinion and let the community vote to decide the future direction of Option Panda.</p>
                        </div>
                    </div>
                </Cell>

                <Cell className="grid-1 section_item" colSpan={1}>
                    <a name="question3"></a>
                    <div className={'question'}>
                        <div className={'avatar'}></div>
                        <div className={'dialog_box'}>
                            <span className={'bubble'}></span>
                            Why choosing Option Panda?
                        </div>
                    </div>
                    <div className={'answer'}>
                        <div className={'avatar'}></div>
                        <div className={'dialog_box'}>
                            <span className={'bubble'}></span>
                            <p>Option Panda has many advantages against other option trading platforms.</p>
                            <p>◆ <b>Scalable:</b> Option Panda is a decentralized exchange which enables crypto asset traders to trade against each others’ price trend perspective regarding a certain underlying asset. Option Panda is scalable both in terms of crypto asset classes and expiry dates. Three underlying assets (BTCB, ETH, BNB) are listed for option offerings at the initial launch, with five available expiry durations, 5 minutes, 15 minutes, 30 minutes, 45 minutes, 1 hour, respectively. On Option Panda, actually it’s quite simple to offer options for a new underlying asset, with any expiry duration. The power of deciding whether more assets or expiry durations should be provided is owned by Option Panda Community. We’ll later announce our new asset listing and governance rules.</p>
                            <p>◆ <b>Convenient: </b> Option Panda automatically settles expiring options and updates new option offerings according to transparent rules(refer to “10. What is Option Panda’s option underwriting mechanism?”). Option holders don’t have to tower-watch and manually exercise their holdings through smart contract interaction. Option buyers simply buy a call/put option on the platform, waiting for its settlement for prospective profit; option sellers simply deposit underlying asset to a pool to participate in a pooled option underwriting, collecting premiums paid by option buyers.</p>
                            <p>◆ <b>Transparent & Fair Pricing: </b> Option Panda adopts a transparent option pricing mechanism. As there is no scientifically accurate pricing model for options, it’s unfair to claim that any pricing mechanism is fair to everyone. One can only claim that the price is accepted and willingly taken by someone. However, Option Panda strives to do its best to create a technically fair option pricing mechanism. Please refer to “11. How the price that I have to pay to buy an option is determined by Option Panda?” for more information. </p>
                            <p>◆ <b>Dynamic Sigma Adjustment: </b> Option Panda employs a novel dynamic adjustment mechanism based on market supply/demand to achieve a relatively frequent update of the implied volatility in the option pricing formula, which we call it Dynamic Sigma Adjustment. It is designed this way so that the frequent, market oriented Sigma(volatility) adjustment could reflect the market supply/demand trend and achieve a practically fair option pricing for both the buy and sell parties. Please refer to “13. What is Dynamic Sigma Adjustment?” for more information.</p>
                            <p>◆ <b>Community Driven: </b> Option Panda plans to gradually transfer the governance ownership to the community, and let platform tokens holders to decide it’s roadmap. That means Option Panda will have a decentralized governance mechanism.</p>
                        </div>
                    </div>
                </Cell>

                <Cell className="grid-1 section_item" colSpan={1}>
                    <a name="question4"></a>
                    <div className={'question'}>
                        <div className={'avatar'}></div>
                        <div className={'dialog_box'}>
                            <span className={'bubble'}></span>
                            What is the difference between Option Panda and centralized option exchanges?
                        </div>
                    </div>
                    <div className={'answer'}>
                        <div className={'avatar'}></div>
                        <div className={'dialog_box'}>
                            <span className={'bubble'}></span>
                            <p>
                                First, Option Panda is fully decentralized, no human intervention at all. Option traders could enjoy a fair trading space on Option Panda. On the contrary, when you buy or sell an option on centralized exchanges, you never know whether your trading counter-parties are real or if your counter-party has posted enough physical collateral for underwriting the option. Trading on centralized exchanges bears a lot of inherent risks, especially moral risk. Cryptocurrency traders have experienced a lot of hazardous and painful cases before.
                            </p>
                            <p>
                                Second, Option Panda’s option pricing mechanism is transparent and strictly following the Black-Scholes formula. Nobody can manipulate the option price on Option Panda as it’s calculated by smart contract according to specified rules. On the contrary, non-professional traders never know how the option price on centralized exchanges are calculated and offered. It’s a black box.
                            </p>
                        </div>
                    </div>
                </Cell>

                <Cell className="grid-1 section_item" colSpan={1}>
                    <a name="question5"></a>
                    <div className={'question'}>
                        <div className={'avatar'}></div>
                        <div className={'dialog_box'}>
                            <span className={'bubble'}></span>
                            What is the difference between Option Panda and Hegic?
                        </div>
                    </div>
                    <div className={'answer'}>
                        <div className={'avatar'}></div>
                        <div className={'dialog_box'}>
                            <span className={'bubble'}></span>
                            <p>In design philosophy, not much difference. However, Option Panda is a fully decentralized option trading platform and has many user beneficial features.</p>
                            <table cellSpacing={0}>
                                <tbody>
                                    <tr className={'tb_head'}><td></td><td>Option Panda</td><td>Hegic</td></tr>
                                    <tr>
                                        <td className={'title'}>Option Issue</td>
                                        <td>
                                            Option Panda limits the amount of options with a certain expiry date that could be generated from the underwriting pool, with a balanced distribution across different expiry dates, to contain the concentration risk exposed to option underwriters. Option Panda also sets up a 75% utilization ratio upper bound to contain liquidity risk for underwriters.
                                        </td>
                                        <td>
                                            Hegic let option buyers tailor the option strike price and expiry duration they desire. Buyers could buy options with any strike price with expiry duration ranging from 1 day to 28 days. It imposes potential risk to underwriters. If there is a sudden violent pump or dump of BTC or ETH price, it is likely that a large portion of the underwriting pool will be exhausted.
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className={'title'}>Freedom of Choice</td>
                                        <td>
                                            For each underlying asset, Option Panda has two option underwriting pools, one for Call and another one for Put. Underwriters have the freedom to express their market price trend prediction by entering either underwriting pool, no need to afford the lost of their counterparty underwriters if they make correct predictions.
                                        </td>
                                        <td>
                                            For each underlying asset, Hegic only has one option underwriting pool, which underwrites both Call and Put options. In a volatile cryptocurrency trading market, it is obvious that the pool will lose on either an up or down price movement. Underwriters has no freedom to choose. By entering Hegic underwriting pool, you have to afford the lost of other underwriters even if you have your own correct price trend prediction.
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className={'title'}>Option Pricing</td>
                                        <td>
                                            The Pricing formula adopted by Option Panda is financially solid, adopting Black-Scholes model, an academically proved and widely accepted work by Nobel Prize winner. Option Panda applies Dynamic Sigma Adjustment to frequently update Sigma to reflect the up to date market volatility, no human intervention as well.
                                        </td>
                                        <td>
                                            By examining Hegic&#39;s smart contract code, one can discover that the Pricing method is a simplified formula, P=sigma*t^0.5*S/K, which has not been academically proved and market tested. What’s more, Hegic owner manually updates Sigma every month. It’s thus subjected to manipulation, let alone too low an update frequency in a volatile market. Letting buyer’s tailor the option strike price while using one flat IV value for option pricing also introduce problem, as it neglects the well-know volatility smile curve.
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className={'title'}>
                                            Fiat Basis Vs Coin Basis
                                        </td>
                                        <td>
                                            Option Panda offers Fiat Basis option. The option premium paid by option buyers to any option underwriting pool on Option Panda is paid in USD stablecoin, and the profit from exercising an option is also received as underwriting pool’s asset denominated in USD. Therefore, option buyer and sellers’ P&L are calculated on the basis of fiat currency without any invisible losses. Using the same example in the right column, we can easily calculate that when ETH price reaches $50, the buyer would break even, without any invisible loss.
                                        </td>
                                        <td>
                                            Hegic basically offers Coin Basis option. Coin Basis introduces invisible loses to buyers who use their Coin to hedge the same Coin’s upside/downside risk against Fiat currency. Suppose a user purchased an ETH call option with four weeks to expiry and the current & strike price both are $500. If the option premium is $50, the user pays 0.1 ETH to Hegic ETH option underwriter pool. If ETH expires at $550 after four weeks, the user should’ve made a profit of $50. However, he will only get 50/550 = 0.091ETH from the Hegic option pool, which means that it’s not even enough to cover his cost of 0.1ETH.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={'title'}>Option Exercise & Profit Delivery</td>
                                        <td>
                                            Option Panda automatically exercises expiring options, cash settle and physical deliver profit to option buyers by smart contract. No user action needed.
                                        </td>
                                        <td>
                                            Hegic requires buyers to manually exercise their option holdings before expiry. If an option buyer fails or forgets to take actions before expiry, he loses all book profit even if his option holdings expires in the money.
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className={'title'}>Beneficiary rights Trading</td>
                                        <td>
                                            Liquidity is obtainable. For either option seller(underwriter) or buyer, he/she could transfer his/her beneficiary rights any time.
                                        </td>
                                        <td>
                                            Hegic doesn’t provide a mechanism for users to trade his/her beneficiary ownership.
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className={'title'}>Multi Blockchain Support</td>
                                        <td>
                                            Option Panda supports Ethereum, Binance Smart Chain, Huobi Eco Chain, Algorand etc.
                                        </td>
                                        <td>
                                            Hegic now only runs on Ethereum network.
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Cell>

                <Cell className="grid-1 section_item" colSpan={1}>
                    <a name="question6"></a>
                    <div className={'question'}>
                        <div className={'avatar'}></div>
                        <div className={'dialog_box'}>
                            <span className={'bubble'}></span>
                            What is an option’s intrinsic value and extrinsic value?
                        </div>
                    </div>
                    <div className={'answer'}>
                        <div className={'avatar'}></div>
                        <div className={'dialog_box'}>
                            <span className={'bubble'}></span>
                            <p>
                                An option value is composed of intrinsice value and extrinsic value.
                            </p>
                            <p><br/>OptionValue=IntrinsicValue+ExtrinsicValue <br/></p>
                            <p>
                                The intrinsic value of both call and put options is the difference between the underlying stock&#39;s price and the strike price. In the case of both call and put options, if the calculated value is negative, the intrinsic value is zero. In other words, intrinsic value only measures the profit as determined by the difference between the option&#39;s strike price and market price.
                            </p>
                            <p>Intrinsic_Value</p>
                            <table cellSpacing={0}>
                                <tbody>
                                <tr className={'tb_head'}><td></td><td>Call</td><td>Put</td></tr>
                                <tr><td className={'title'}>Current_Price &gt;= Strike_Price</td><td>Current_Price - Strike_Price</td><td>0</td></tr>
                                <tr><td className={'title'}>Current_Price &lt; Strike_Price </td><td>0</td><td>Strike_Price - Current_Price</td></tr>
                                </tbody>
                            </table>
                            <p>
                                Extrinsic value(aka. Time value) measures the difference between the market price of an option, called the <a href={'https://www.investopedia.com/terms/p/premium.asp'} target={'_blank'}>premium</a>, and its <a href={'https://www.investopedia.com/terms/i/intrinsicvalue.asp'} target={'_blank'}>intrinsic value</a>. Extrinsic value is also the portion of the worth that has been assigned to an option by factors other than the underlying asset&#39;s price. The opposite of extrinsic value is intrinsic value, which is the inherent worth of an option. Extrinsic value rises with increase in volatility in the market.
                            </p>
                            <p>Extrinsic_Value</p>
                            <table cellSpacing={0}>
                                <tbody>
                                <tr className={'tb_head'}><td></td><td>Call</td><td>Put</td></tr>
                                <tr><td className={'title'}>Current_Price &gt;= Strike_Price</td><td>Option_Price- Intrinsic_Value</td><td>Option_Price</td></tr>
                                <tr><td className={'title'}>Current_Price &lt; Strike_Price </td><td>Option_Price</td><td>Option_Price - Intrinsic_Value</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Cell>

                <Cell className="grid-1 section_item" colSpan={1}>
                    <a name="question7"></a>
                    <div className={'question'}>
                        <div className={'avatar'}></div>
                        <div className={'dialog_box'}>
                            <span className={'bubble'}></span>
                            What does At The Money, Out of The Money and In The Money mean?
                        </div>
                    </div>
                    <div className={'answer'}>
                        <div className={'avatar'}></div>
                        <div className={'dialog_box'}>
                            <span className={'bubble'}></span>
                            <p>At The Money is also known as ATM, meaning an option has no intrinsic value, only time value. A call or put option is ATM if the underlying’s price is the same as the strike price.</p>
                            <p>Out of The Money is also known as OTM, meaning an option has no intrinsic value, only extrinsic value. A call option is OTM if the underlying’s price is below the strike price. A put option is OTM if the underlying’s price is above the strike price.</p>
                            <p>In of The Money is also known as ITM, meaning an option has both intrinsic value and extrinsic value. A call option is ITM if the underlying’s price is above the strike price. A put option is ITM if the underlying’s price is below the strike price.</p>
                            <table cellSpacing={0}>
                                <tbody>
                                <tr className={'tb_head'}><td></td><td>ATM</td><td>OTM</td><td>OTM</td></tr>
                                <tr>
                                    <td className={'title'}>Call Option</td>
                                    <td>
                                        Current_Price
                                        =
                                        Strike_Price
                                    </td>
                                    <td>
                                        Current_Price
                                        &lt;
                                        Strike_Price
                                    </td>
                                    <td>
                                        Current_Price
                                        &gt;
                                        Strike_Price
                                    </td>
                                </tr>
                                <tr>
                                    <td className={'title'}>Put Option</td>
                                    <td>
                                        Current_Price
                                        =
                                        Strike_Price
                                    </td>
                                    <td>
                                        Current_Price
                                        &gt;
                                        Strike_Price
                                    </td>
                                    <td>
                                        Current_Price
                                        &lt;
                                        Strike_Price
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <p>For protection of option buyers, at this moment, Option Panda only issues ATM options.</p>
                        </div>
                    </div>
                </Cell>

            </ResponsiveGrid>
        );
    }
}

export default QuestionsAnswer;
