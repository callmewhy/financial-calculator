exports.breakevenPrice = function (values, currentTab) {
  // 检查 NaN
  const nans = values.filter((v) => {
    return isNaN(v)
  })
  if (nans.length > 0) {
    return NaN
  }
  // currentTab: 0: 沪A, 1: 沪B, 2: 深A, 3: 深B
  const [buying, volume, commissionRateP, stampTaxP, transferRate] = values

  const commissionRate = commissionRateP / 100
  const stampTax = stampTaxP / 100

  function cost(selling) {
    const commissionMin = [5, 1, 5, 5][currentTab]
    const transferMin = [1, 0, 0, 0][currentTab]
    // 过户费
    let transferPrice = 0
    switch (currentTab) {
      case (0):
        transferPrice = Math.max(transferMin, volume / 1000 * transferRate) +
          Math.max(transferMin, volume / 1000 * transferRate)
        break
      case 1:
        transferPrice = Math.max(transferMin, buying * volume * transferRate / 100) +
          Math.max(transferMin, selling * volume * transferRate / 100)
        break
      case 2:
        transferPrice = 0
        break
      case 3:
        transferPrice = Math.min(500, Math.max(transferMin, buying * volume * transferRate / 100)) +
          Math.min(500, Math.max(transferMin, selling * volume * transferRate / 100))
        break
      default:
        break
    }
    return (
      buying * volume + // 成本价
      selling * volume * stampTax + // 印花税,卖出收取
      Math.max(commissionMin, buying * volume * commissionRate) +  // 买入的佣金费
      Math.max(commissionMin, selling * volume * commissionRate) + // 卖出的佣金费
      transferPrice // 过户费
    )
  }

  // 二分查找保本卖出价
  let high = buying * 1000
  let low = 0.001
  const limit = 0.0001
  let sell = (high - low) / 2
  while (high - low > limit) {
    if (sell * volume > cost(sell)) {
      high = sell
    } else {
      low = sell
    }
    sell = (high + low) / 2
  }
  if (buying * 1000 - sell < limit) {
    return null
  }
  return Math.abs(sell.toFixed(2))
}
