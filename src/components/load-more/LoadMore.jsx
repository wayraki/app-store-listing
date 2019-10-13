/**
 * @author wayraki
 * @description loadMore组件
 */

/* eslint-disable no-useless-computed-key */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import loading from '../../assets/loading.gif'

class LoadMore extends Component {
  static propTypes = {
    loadMoreFn: PropTypes.func,
    status: PropTypes.oneOf(['loading', 'next', 'isAll', 'noData'])
  }
  constructor(props) {
    super(props)
    this.wrapper = React.createRef()
  }
  componentDidMount() {
    const windowHeight = window.screen.height
    const callback = () => {
      // wrapper位置
      const top = this.wrapper.current.getBoundingClientRect().top
      if (top && top < windowHeight - 12) {
        // 当wrapper已经被滚动到页面可视范围之内触发
        console.log('loading more...')
        this.props.loadMoreFn && this.props.loadMoreFn()
      }
    }

    // 滚动事件
    let timer
    window.addEventListener('scroll', () => {
      if (this.props.status !== 'next') {
        return
      }
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(callback, 50)
    })
  }

  render() {
    let dom = {
      ['loading']: (
        <img src={loading} alt="loading" style={{ width: '32px' }} />
      ),
      ['next']: '加载更多',
      ['isAll']: '我是有底线的',
      ['noData']: '暂无数据'
    }
    return (
      <div
        ref={this.wrapper}
        style={{
          height: 32,
          margin: '0 auto',
          textAlign: 'center',
          lineHeight: '32px',
          fontSize: 12,
          color: '#666'
        }}
      >
        {dom[this.props.status]}
      </div>
    )
  }
}

export default LoadMore
