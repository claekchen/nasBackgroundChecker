import * as menuAction from './page/action/menus'
const funcIntervalQuery = (dispatch, resp, refresh) => {
  window.fetch('https://mainnet.nebulas.io/v1/user/getTransactionReceipt', {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({'hash': resp.txhash}),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then(res => {
      if (res.result.status === 1) {
        menuAction.toggleLoading(dispatch, false)
        refresh()
        clearInterval(window.intervalQuery)
      } else if (res.result.status !== 2) {
        clearInterval(window.intervalQuery)
        window.alert('提交失败！')
        window.history.go(0)
      }
    })
}

export function cbPush (dispatch, refresh) {
  return (resp) => {
    console.log(resp)
    window.intervalQuery = setInterval(function () {
      funcIntervalQuery(dispatch, resp, refresh)
    }, 5000)
  }
}

