/**
 * @author wayraki
 * @description inputSearch组件
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styles from './InputSearch.module.css'
import searchIcon from '../../assets/search.png'
import closeIcon from '../../assets/close.png'

class InputSearch extends PureComponent {
  static propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    style: PropTypes.object,
    onChange: PropTypes.func
  }

  static defaultProps = {
    value: '',
    placeholder: '',
    style: {}
  }

  state = {
    focus: false
  }

  handleCancel() {
    this.setState({ focus: false })
  }

  render() {
    const { focus } = this.state
    const { value, placeholder, style } = this.props
    return (
      <div className={styles.searchBar} style={style}>
        <div
          className={styles.inputBox}
          style={focus ? { width: '73vmin' } : { width: '86vmin' }}
        >
          <i
            className={styles.searchIcon}
            style={{ backgroundImage: 'url(' + searchIcon + ')' }}
          />
          <input
            ref={this.searchInput}
            type="search"
            maxLength={20}
            value={value}
            placeholder={placeholder}
            onFocus={e => this.setState({ focus: true })}
            onChange={e => this.props.onChange(e.target.value)}
          />
          {value.length > 0 ? (
            <i
              className={styles.crossIcon}
              style={{ backgroundImage: 'url(' + closeIcon + ')' }}
              onClick={() => this.props.onChange('')}
            />
          ) : null}
        </div>
        <span
          className={styles.cancelBtn}
          style={{
            opacity: focus ? '1' : '0'
          }}
          onClick={() => this.handleCancel()}
        >
          取消
        </span>
      </div>
    )
  }
}

export default InputSearch
