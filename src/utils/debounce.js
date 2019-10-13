/**
 * @author wayraki
 * @description 防抖
 * @method debounce
 * @param function func 执行函数
 * @param wait number 延迟时间
 */

export default function debounce(func, wait) {
  let timeout
  return function() {
    let context = this
    let args = arguments
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(context, args)
    }, wait)
  }
}
