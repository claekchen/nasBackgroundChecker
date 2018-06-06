"use strict"
class Anouncement {
  constructor (text) {
    let obj = text ? JSON.parse(text) : {}
    this.date = obj.date
    this.text = obj.text
    this.name = obj.name
  }

  toString () {
    return JSON.stringify(this)
  }
}

class AnouncementContract {
  constructor () {
    LocalContractStorage.defineProperty(this, "count")
    LocalContractStorage.defineMapProperty(this, "userAnouncement")
    LocalContractStorage.defineMapProperty(this, "anouncement", {
      parse: function (name, text) {
        return new Anouncement(name, text)
      },
      stringify: function (source) {
        return source.toString()
      }
    })
  }
  init () {
    this.count = new BigNumber(1)
  }

  add (name, text, date) {
    let aAnouncement = new Anouncement()
    let count = this.count
    let userAnouncement = this.userAnouncement.get(name) || []
    aAnouncement.name = name
    aAnouncement.text = text
    aAnouncement.date = date
    userAnouncement.push(count)
    this.userAnouncement.put(name, userAnouncement)
    this.anouncement.put(count, aAnouncement)
    this.count = new BigNumber(count).plus(1)
  }

  getByName (name) {
    let aAnouncementID = this.userAnouncement.get(name)
    let res = []
    for (const index of aAnouncementID) {
      res.push(this.anouncement.get(index))
    }
    return res
  }
}
module.exports = AnouncementContract;