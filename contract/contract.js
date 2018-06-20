'use strict'

// TODO: change personInfo and companyInfo to Map from Array

class Person {
  constructor (text) {
    let obj = text ? JSON.parse(text) : {}
    this.token = obj.token
    this.name = obj.name
    this.id = obj.id
    this.ava = obj.ava
    this.companyInfo = obj.companyInfo ? obj.companyInfo : {}
  }

  toString () {
    return JSON.stringify(this)
  }
}

class CompanyHistory {
  constructor (text) {
    let obj = text ? JSON.parse(text) : {}
    this.token = obj.token
    this.name = obj.name
    this.title = obj.title
    this.action = obj.action
    this.date = obj.date
    this.isVeri = 0 // 0 未认证 1 已认证 -1 未通过认证
  }

  toString () {
    return JSON.stringify(this)
  }
}

class Company {
  constructor (text) {
    let obj = text ? JSON.parse(text) : {}
    this.token = obj.token
    this.name = obj.name
    this.location = obj.location
    this.ava = obj.ava
    this.personInfo = obj.personInfo ? obj.personInfo : {}
  }

  toString () {
    return JSON.stringify(this)
  }
}

class BackgroundContract {
  constructor () {
    LocalContractStorage.defineProperty(this, 'companyList')
    LocalContractStorage.defineProperty(this, 'companyNameMap')
    LocalContractStorage.defineProperty(this, 'personList')
    LocalContractStorage.defineMapProperty(this, 'company', {
      parse: function (companyInfo) {
        return new Company(companyInfo)
      },
      stringify: function (source) {
        return source.toString()
      }
    })
    LocalContractStorage.defineMapProperty(this, 'person', {
      parse: function (personInfo) {
        return new Person(personInfo)
      },
      stringify: function (source) {
        return source.toString()
      }
    })
  }
  init () {
    this.companyList = []
    this.personList = []
    this.companyNameMap = {}
    let aCompany = new Person()
    aCompany.token = '1'
    aCompany.name = '测试公司'
    aCompany.location = '中国'
    aCompany.ava = 'data:image/jpeg;base64,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'
    if (!this.companyList.includes(aCompany.token)) {
      let aList = this.companyList
      aList.push(aCompany.token)
      this.companyList = aList
      const aMap = this.companyNameMap
      aMap[aCompany.token] = aCompany.name
      this.companyNameMap = aMap
      aCompany.personInfo = {}
      this.company.put(aCompany.token, aCompany)
    } else {
      aCompany.personInfo = this.company.get(aCompany.token).personInfo
      this.company.set(aCompany.token, aCompany)
    }
  }
  verify () {
    const user_token = Blockchain.transaction.from
    const res = {}
    res.token = user_token
    if (this.personList.includes(user_token)) {
      res.type = 'person'
    } else if (this.companyList.includes(user_token)) {
      res.type = 'company'
    } else {
      res.type = 'none'
    }
    res.list = this.personList
    return res
  }
  updatePerson (token, name, id, ava) {
    let aPerson = new Person()
    // token = Blockchain.transaction.from
    aPerson.token = token
    aPerson.name = name
    aPerson.id = id
    aPerson.ava = ava
    if (!this.personList.includes(aPerson.token)) {
      let aList = this.personList
      aList.push(aPerson.token)
      this.personList = aList
      aPerson.companyInfo = {}
      this.person.put(aPerson.token, aPerson)
    } else {
      aPerson.companyInfo = this.person.get(aPerson.token).companyInfo
      this.person.set(aPerson.token, aPerson)
    }
    return true
  }

  updateCompany (token, name, location, ava) {
    let aCompany = new Person()
    // token = Blockchain.transaction.from
    aCompany.token = token
    aCompany.name = name
    aCompany.location = location
    aCompany.ava = ava
    if (!this.companyList.includes(aCompany.token)) {
      let aList = this.companyList
      aList.push(aCompany.token)
      this.companyList = aList
      const aMap = this.companyNameMap
      aMap[aCompany.token] = aCompany.name
      this.companyNameMap = aMap
      aCompany.personInfo = {}
      this.company.put(aCompany.token, aCompany)
    } else {
      aCompany.personInfo = this.company.get(aCompany.token).personInfo
      this.company.set(aCompany.token, aCompany)
    }
    return true
  }

  addCompanyHistoryToPerson (token, tokenOfCompany, title, action, date, isVeri) {
    let aPerson = this.person.get(token)
    let aHistory = new CompanyHistory()
    const aMap = this.companyNameMap
    // token = Blockchain.transaction.from
    aHistory.token = tokenOfCompany
    aHistory.name = aMap[tokenOfCompany]
    aHistory.title = title
    aHistory.action = action
    aHistory.date = date
    aHistory.isVeri = isVeri
    let aCompany = this.company.get(aHistory.token)
    let aWaiting = {
      token: token,
      name: aPerson.name,
      id: aPerson.id,
      title: aHistory.title,
      action: aHistory.action,
      date: aHistory.date,
      isVeri: 0
    }
    if (!aPerson.companyInfo[aHistory.token]) {
      aPerson.companyInfo[aHistory.token] = []
    }
    aHistory.count = aPerson.companyInfo[aHistory.token].length
    aWaiting.count = aPerson.companyInfo[aHistory.token].length
    aPerson.companyInfo[aHistory.token].push(aHistory)
    this.person.set(token, aPerson)
    aCompany.personInfo[`${token}${title}${action}${date}`] = aWaiting
    this.company.set(aHistory.token, aCompany)
    return true
  }

  approveOrRejectHistory (tokenOfCompany, tokenOfPerson, count, title, action, date, result) {
    // tokenOfCompany = Blockchain.transaction.from
    let aCompany = this.company.get(tokenOfCompany)
    let aPerson = this.person.get(tokenOfPerson)
    let aCompanyHistory = aPerson.companyInfo[tokenOfCompany][count]
    delete aCompany.personInfo[`${tokenOfPerson}${title}${action}${date}`]
    this.company.set(tokenOfCompany, aCompany)
    aCompanyHistory.isVeri = result
    aPerson.companyInfo[tokenOfCompany][count] = aCompanyHistory
    this.person.set(tokenOfPerson, aPerson)
    return true
  }
  getPersonByToken (token) {
    const aPerson = this.person.get(token)
    return aPerson
  }
  getCompanyByToken (token) {
    const aCompany = this.company.get(token)
    return aCompany
  }
  getCompanyList () {
    const aMap = this.companyNameMap
    return aMap
  }
}
module.exports = BackgroundContract
