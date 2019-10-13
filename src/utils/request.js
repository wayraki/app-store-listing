/**
 * @author wayraki
 * @description 请求方法，模拟接口通过参数返回对应数据
 * @method request
 * @param object postData 请求参数
 */

import axios from 'axios'

export default function request(postData) {
  return new Promise((resolve, reject) => {
    const { url, searchKey } = postData
    function fetch() {
      axios
        .get(url)
        .then(function(response) {
          let data = response.data.feed.entry
          if (searchKey) {
            data = data.filter(item => {
              return (
                item['im:name'].label.includes(searchKey) ||
                item['category'].attributes.label.includes(searchKey) ||
                item['im:artist'].label.includes(searchKey) ||
                item['summary'].label.includes(searchKey)
              )
            })
          }
          if (url === 'appListData.json') {
            const { current, pageSize } = postData
            let list = data.slice((current - 1) * pageSize, current * pageSize)
            list.forEach(item => {
              item.starNum = Math.floor(Math.random() * 5) + 1
              item.commentNum = Math.floor(Math.random() * 1000)
            })
            resolve({
              list,
              current,
              pageSize,
              total: data.length
            })
          } else {
            let list = data.slice(0, 10)
            resolve({
              list
            })
          }
        })
        .catch(function(error) {
          reject(error)
        })
    }
    // 模拟网络延迟
    setTimeout(fetch, 1000)
  })
}
