// 获取首页相关方法
var indexDataview180315 = _getIndexAboutMethods(); // isObj
/**
 * 图表配置
 */
var chartsConfig = {
  // 今日出入金
  todayInOut: {
    name: 'todayInOut',
    url: '/merchantAndBankInfo',
    initEle: '.today_in_out_chart',
    loadingEle: '.today_in_out_loading'
  },
  // 历史出入金
  historyInOut: {
    name: 'historyInOut',
    url: '/historyInAndOutMoney',
    initEle: '.history_in_out_chart',
    loadingEle: '.history_in_out_loading'
  },
  // 商户出入金
  userInOut: {
    name: 'userInOut',
    url: '/merchantInAndOutMoney',
    initEle: '.user_in_out_chart',
    loadingEle: '.user_in_out_loading'
  },
  // 汇总
  statistics: {
    name: 'statistics',
    url: '/historyInAndOutOfPayWay',
    initEle: '.statistics_chart',
    loadingEle: '.statistics_loading'
  }
};

/**
 * 数据汇总配置
 */
var collectConfig = {
  url: '/dataSummary',
  initEle: '.collect',
  order: [
    'total_in_money',
    'total_out_money',
    'total_charge_money',
    'left_money',
    'today_in_moneyCount',
    'today_out_moneyCount',
    '',
    ''
  ]
};

/**
 * 待办事项
 */
var backlogConfig = {
  url: '/backlog',
  initEle: '.backlog'
};

/**
 * 设置请求的公共路径 First
 */
indexDataview180315._setBaseUrl({
  // baseUrl: window.location.origin + '/Bestpay/IndexChart' // 【pro】
  baseUrl: 'http://paypay.com/Bestpay/IndexChart' // 【dev】
});

/**
 * 数据汇总+待办事项 Second
 */
indexDataview180315._collectUnit.init(collectConfig);
indexDataview180315._backlog.init(backlogConfig);

/**
 * 接收图表数据并处理 Third
 */
for (var k in chartsConfig) {
  indexDataview180315._getChartData.init(chartsConfig[k]); // 【pro】
}
// todayInOut historyInOut userInOut statistics 【bak】

/**
 * 初始化交互按钮 Fourth
 */
// chart_category_menu 含有使用权限
// 获取图例是否隐藏的判断条件
// var isShow = window.parent.document.querySelector('#shadow').value; // '1' '0'
if (false) {
  // 权限不够
  document.querySelector('.chart_category_menu').style.display = 'none';
  indexDataview180315._chartMenu.init({
    eleName: '.chart_cycle_menu'
  });
} else {
  indexDataview180315._chartMenu.init({
    eleName: '.chart_menu'
  });
}

