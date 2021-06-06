import './index.scss';

const coinIconMap = {
    OPA:'coin_icon_opa',
    BTCB:'coin_icon_btc',
    ETH:'coin_icon_eth',
    BNB:'coin_icon_bnb',
    USDT:'coin_icon_usdt'
};

const getCoinIcon = (assetName) => {
    return coinIconMap[assetName] || '';
};

export default getCoinIcon;
