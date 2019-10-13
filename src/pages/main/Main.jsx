import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import debounce from '../../utils/debounce'
import InputSearch from '../../components/input-search'
import LoadMore from '../../components/load-more'
import model from '../../models/main'
import styles from './Main.module.css'

class Main extends Component {
  static propTypes = {
    appList: PropTypes.object,
    recomend: PropTypes.object,
    getAppList: PropTypes.func,
    getRecomend: PropTypes.func
  }

  state = {
    searchKey: ''
  }

  componentDidMount() {
    this.getAppList()
    this.getRecomend()
  }

  getAppList = (current = 1) => {
    if (this.props.appList.loading) {
      return
    }
    this.props.getAppList({
      url: 'appListData.json',
      current,
      pageSize: 10,
      searchKey: this.state.searchKey
    })
  }

  getRecomend = () => {
    if (this.props.recomend.loading) {
      return
    }
    this.props.getRecomend({
      url: 'recomendData.json',
      searchKey: this.state.searchKey
    })
  }

  handleChangeSearchInput = value => {
    this.setState({ searchKey: value })
    const that = this
    debounce(function() {
      that.getAppList()
      that.getRecomend()
    }, 2000)()
  }

  render() {
    const { appList, recomend } = this.props
    let status
    if (appList.loading) {
      status = 'loading'
    } else {
      if (appList.list.length) {
        if (appList.list.length === appList.total) {
          status = 'isAll'
        } else {
          status = 'next'
        }
      } else {
        status = 'noData'
      }
    }
    return (
      <div className={styles.wrap}>
        <InputSearch
          style={{
            position: 'fixed',
            top: 0
          }}
          value={this.state.searchKey}
          onChange={this.handleChangeSearchInput}
        />
        {recomend.list.length === 0 ? null : (
          <div className={styles.recomend}>
            <h1 className={styles.title}>推介</h1>
            <ul>
              {recomend.list.map(item => (
                <li
                  className={styles.recomendItem}
                  key={item.id.attributes['im:id']}
                >
                  <img src={item['im:image'][1].label} alt="" />
                  <p className={styles.name}>{item['im:name'].label}</p>
                  <p className={styles.category}>
                    {item.category.attributes.label}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
        <ul className={styles.appList}>
          {appList.list.map((item, index) => {
            return (
              <li key={item.id.attributes['im:id']}>
                <div className={styles.appListItem}>
                  <em>{index + 1}</em>
                  <img
                    className={
                      index % 2 === 0 ? styles.appIconOdd : styles.appIconEven
                    }
                    src={item['im:image'][1].label}
                    alt=""
                  />
                  <div className={styles.appListInfo}>
                    <p className={styles.name}>{item['im:name'].label}</p>
                    <p className={styles.category}>
                      {item.category.attributes.label}
                    </p>
                    <p className={styles.comment}>
                      {new Array(item.starNum).fill(0).map((_, index) => (
                        <i
                          className={styles.star}
                          style={{ color: '#ff0' }}
                          key={index}
                        >
                          &#9733;
                        </i>
                      ))}
                      {new Array(5 - item.starNum).fill(0).map((_, index) => (
                        <i
                          className={styles.star}
                          style={{ color: '#ccc' }}
                          key={index}
                        >
                          &#9733;
                        </i>
                      ))}
                      {`(${item.commentNum})`}
                    </p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
        <LoadMore
          loadMoreFn={() => this.getAppList(appList.current + 1)}
          status={status}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    appList: state.main.appList,
    recomend: state.main.recomend
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAppList: payload => {
      dispatch(model.actions.getAppList(payload))
    },
    getRecomend: payload => {
      dispatch(model.actions.getRecomend(payload))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
