import log from '../../../../components/Log';
import OptionTradingConfig from '../../../../etherscan/OptionTradingConfig';
import currentAccountStorage from "../../../../components/Web3/CurrentAccountStorage";
import DialogBoxVO from "../../../../components/DialogBox/DialogBoxVO";

class ListOptionsDAO {

    updateOptionPool(pool){
        DialogBoxVO.confirm();

        let coinName = pool.asset;
        let optionType = pool.optionType;

        log.debug(`updateOptionPool [coinName=${coinName},optionType=${optionType}] ...`);

        if(!OptionTradingConfig.contractConfig[coinName] || !OptionTradingConfig.contractConfig[coinName][optionType] || !OptionTradingConfig.contractConfig[coinName][optionType].address()){
            return;
        }

        let optionPoolContractConfig = OptionTradingConfig.contractConfig[coinName][optionType];
        let optionPoolContractAddress = optionPoolContractConfig.address();
        let optionPoolContractAbi = optionPoolContractConfig.abi;
        let optionPoolContract = new window.web3.eth.Contract(optionPoolContractAbi, optionPoolContractAddress);

        optionPoolContract.methods
            .update()
            .send({
                from: currentAccountStorage.account,
            })
            .on('error', function(error){
                DialogBoxVO.failed();
                DialogBoxVO.setContent(error.message);
            })
            .then((result) => {
                DialogBoxVO.success();
            });
    }

}

export default new ListOptionsDAO();
