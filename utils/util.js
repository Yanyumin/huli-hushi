const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 获取当前日期
const formatHour = () => {
  const date = new Date()
  const hour = date.getHours()
  const minute = date.getMinutes()


  return [hour, minute].map(formatNumber).join(':')
}
// 获取当前时间
const formatDate = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return [year, month, day].map(formatNumber).join('-')
}

// 身份证验证
const checkIDCard = (idcode) => {
  // 加权因子
  var weightFactor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  // 校验码
  var checkCode = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']

  var code = idcode + ''
  // 最后一位
  var last = idcode[17]

  var seventeen = code.substring(0, 17)

  // ISO 7064:1983.MOD 11-2
  // 判断最后一位校验码是否正确
  var arr = seventeen.split('')
  var len = arr.length
  var num = 0
  for (var i = 0; i < len; i++) {
    num = num + arr[i] * weightFactor[i]
  }

  // 获取余数
  var resisue = num % 11
  var lastNo = checkCode[resisue]

  // 格式的正则
  // 正则思路 
  /*
  第一位不可能是0
  第二位到第六位可以是0-9
  第七位到第十位是年份，所以七八位为19或者20
  十一位和十二位是月份，这两位是01-12之间的数值
  十三位和十四位是日期，是从01-31之间的数值
  十五，十六，十七都是数字0-9
  十八位可能是数字0-9，也可能是X
  */
  var idcardPatter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/

  // 判断格式是否正确
  var format = idcardPatter.test(idcode)

  // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
  return !!(last === lastNo && format)
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  checkIDCard: checkIDCard,
  formatHour: formatHour
}