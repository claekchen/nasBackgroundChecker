const CONTRACT_ADDRESS = 'n1vHAAo7aSNuEYCTHYarZLAQpzX3JocX9nn'

class SmartContractApi {
  constructor (contractAdress) {
    var NebPay = require('./dist/nebpay')
    this.nebPay = new NebPay()
    this._contractAdress = contractAdress || CONTRACT_ADDRESS
  }

  getContractAddress () {
    return this.contractAdress
  }

  _simulateCall ({ value = '0', callArgs = '[]', callFunction, listener }) {
    this.nebPay.simulateCall(this._contractAdress, value, callFunction, callArgs, {
      listener: listener
    })
  }

  _call ({ value = '0', callArgs = '[]', callFunction, listener }) {
    this.nebPay.call(this._contractAdress, value, callFunction, callArgs, {
      listener: listener
    })
  }
}

class BackgroundContractApi extends SmartContractApi {
  updatePerson (personInfo, cb) {
    this._call({
      callArgs: `[${personInfo}]`,
      callFunction: 'updatePerson',
      listener: cb
    })
  }
  updateCompany (companyInfo, cb) {
    this._call({
      callArgs: `[${companyInfo}]`,
      callFunction: 'updateCompany',
      listener: cb
    })
  }
  addCompanyHistoryToPerson (token, companyHistory, cb) {
    this._call({
      callArgs: `["${token}", ${companyHistory}]`,
      callFunction: 'addCompanyHistoryToPerson',
      listener: cb
    })
  }
  approveOrRejectHistory (tokenOfCompany, tokenOfPerson, result, cb) {
    this._call({
      callArgs: `["${tokenOfCompany}", "${tokenOfPerson}", ${result}]`,
      callFunction: 'approveOrRejectHistory',
      listener: cb
    })
  }
  getByToken (token, cb) {
    this._simulateCall({
      callArgs: `["${token}"]`,
      callFunction: 'getByToken',
      listener: cb
    })
  }
}

export default BackgroundContractApi
