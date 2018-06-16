const CONTRACT_ADDRESS = 'n1sggDsuZ9uthox6ygxMnMqgxNaECiY4mt2'

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
  updatePerson (token, name, id, ava, cb) {
    this._call({
      callArgs: `["${token}", "${name}", "${id}", "${ava}"]`,
      callFunction: 'updatePerson',
      listener: cb
    })
  }
  updateCompany (token, name, location, ava, cb) {
    this._call({
      callArgs: `["${token}", "${name}", "${location}", "${ava}"]`,
      callFunction: 'updateCompany',
      listener: cb
    })
  }
  addCompanyHistoryToPerson (token, tokenOfCompany, title, action, date, isVeri, cb) {
    this._call({
      callArgs: `["${token}", "${tokenOfCompany}", "${title}", "${action}", "${date}", "${isVeri}"]`,
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
  getPersonByToken (token, cb) {
    this._simulateCall({
      callArgs: `["${token}"]`,
      callFunction: 'getPersonByToken',
      listener: cb
    })
  }
  getCompanyByToken (token, cb) {
    this._simulateCall({
      callArgs: `["${token}"]`,
      callFunction: 'getCompanyByToken',
      listener: cb
    })
  }
  verify (cb) {
    this._simulateCall({
      callArgs: `[]`,
      callFunction: 'verify',
      listener: cb
    })
  }
}

export default BackgroundContractApi
