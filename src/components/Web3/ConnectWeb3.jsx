import getWeb3 from './GetWeb3';

const connectWeb3 = async () => {
    if (getWeb3()) {
        await window.ethereum.enable();
    }
};

export default connectWeb3;
