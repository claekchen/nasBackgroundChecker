'use strict'

// TODO: change personInfo and companyInfo to Map from Array

class Person {
  constructor (text) {
    let obj = text ? JSON.parse(text) : {}
    this.token = obj.token
    this.name = obj.name
    this.id = obj.id
    this.ava = obj.ava
    this.companyInfo = obj.companyInfo ? obj.companyInfo : new Map()
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
    this.personInfo = obj.personInfo ? obj.personInfo : new Map()
  }

  toString () {
    return JSON.stringify(this)
  }
}

class PersonWaiting {
  constructor (text) {
    let obj = text ? JSON.parse(text) : {}
    this.token = obj.token
    this.name = obj.name
    this.id = obj.id
    this.title = obj.title
    this.action = obj.action
    this.date = obj.date
  }
  toString () {
    return JSON.stringify(this)
  }
}
class BackgroundContract {
  constructor () {
    LocalContractStorage.defineProperty(this, 'companyList')
    LocalContractStorage.defineMapProperty(this, 'companyNameMap')
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
    aPerson.token = token
    aPerson.name = name
    aPerson.id = id
    aPerson.ava = ava
    if (!this.personList.includes(aPerson.token)) {
      let aList = this.personList
      aList.push(aPerson.token)
      this.personList = aList
      aPerson.companyInfo = new Map()
      this.person.put(aPerson.token, aPerson)
    } else {
      aPerson.companyInfo = this.person.get(aPerson.token).companyInfo
      this.person.set(aPerson.token, aPerson)
    }
    return true
  }

  updateCompany (token, name, location, ava) {
    let aCompany = new Person()
    aCompany.token = token
    aCompany.name = name
    aCompany.location = location
    aCompany.ava = ava
    if (!this.companyList.includes(aCompany.token)) {
      let aList = this.companyList
      aList.push(aCompany.token)
      this.companyList = aList
      this.companyNameMap.set(aCompany.token, name)
      aCompany.personInfo = new Map()
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
    aHistory.token = tokenOfCompany
    aHistory.name = this.companyNameMap.get(tokenOfCompany)
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
      date: aHistory.date
    }
    aWaiting = new PersonWaiting(aWaiting)
    aPerson.companyInfo.put(aHistory.token, aHistory)
    this.person.set(token, aPerson)
    aCompany.personInfo.put(token, aWaiting)
    this.company.set(aHistory.token, aCompany)
    return true
  }

  approveOrRejectHistory (tokenOfCompany, tokenOfPerson, result) {
    let aCompany = this.company.get(tokenOfCompany)
    let aPerson = this.person.get(tokenOfPerson)
    let aCompanyHistory = aPerson.companyInfo.get(tokenOfCompany)
    aCompany.personInfo.delete(tokenOfPerson)
    this.company.set(tokenOfCompany, aCompany)
    aCompanyHistory.isVeri = result
    aPerson.companyInfo.set(tokenOfCompany, aCompanyHistory)
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
}
module.exports = BackgroundContract
