'use strict'

// TODO: change personInfo and companyInfo to Map from Array 
class Person {
  constructor (text) {
    let obj = text ? JSON.parse(text) : {}
    this.token = obj.token
    this.name = obj.name
    this.id = obj.id
    this.ava = obj.ava
    this.companyInfo = obj.companyInfo ? obj.companyInfo : []
  }

  toString () {
    return JSON.stringify(this)
  }
}

class CompanyHistory {
  constructor (text) {
    let obj = text ? JSON.parse(text) : {}
    this.token = obj.token
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
    this.personInfo = []
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

  updatePerson (personInfo) {
    let aPerson = new Person(personInfo)
    if (!this.personList.includes(personInfo.token)) {
      this.personList.push(personInfo.token)
      this.person.put(personInfo.token, aPerson)
    } else {
      aPerson.companyInfo = this.person.get(personInfo.token).companyInfo
      this.person.set(personInfo.token, aPerson)
    }
    return true
  }

  updateCompany (companyInfo) {
    let aCompany = new Person(companyInfo)
    if (!this.companyList.includes(companyInfo.token)) {
      this.companyList.push(companyInfo.token)
      this.company.put(companyInfo.token, aCompany)
    } else {
      aCompany.personInfo = this.company.get(companyInfo.token).personInfo
      this.company.set(companyInfo.token, aCompany)
    }
    return true
  }

  addCompanyHistoryToPerson (token, companyHistory) {
    let aPerson = this.person.get(token)
    let aHistory = new CompanyHistory(companyHistory)
    let aCompany = this.company.get(companyHistory.token)
    let aWaiting = {
      token: token,
      name: aPerson.name,
      id: aPerson.id,
      title: companyHistory.title,
      action: companyHistory.action,
      date: companyHistory.date
    }
    aWaiting = new PersonWaiting(aWaiting)
    aPerson.companyInfo.push(aHistory)
    this.person.set(token, aPerson)
    aCompany.personInfo.push(aWaiting)
    this.company.set(companyHistory.token, aCompany)
    return true
  }

  approveOrRejectHistory (tokenOfCompany, tokenOfPerson, result) {
    let aCompany = this.company.get(tokenOfCompany)
    let aPerson = this.person.get(tokenOfPerson)
  }
  getByToken (token) {
    let aPerson = this.person.get(token)
    return aPerson
  }
}
module.exports = BackgroundContract
