/**
 * 首页数据可视化 180315
 */
var _getIndexAboutMethods = function() {
  /**
   * 绘制图表对象
   */
  var _chartsObj = {
    // 初始化
    init: function(param) {
      // param isObj 接收处理完毕的数据以及要绘制的图表配置信息
      // 根据name进行绘制方法筛选
      // 初始化元素绑定至_chartsObj对象中
      // this.echartsDom[param.name] 指向图表实例
      this.echartsDom[param.name] = echarts.init(
        document.querySelector(param.initEle)
      );
      // 图表绘制
      var chartsOption = {
        // 今日出入金
        todayInOut: function(param) {
          var data = param.data,
            xAxisData = data.xAxisData,
            hourData = data.hourData,
            effectScatter30 = data.effectScatter30,
            effectScatter28 = data.effectScatter28,
            effectScatter26 = data.effectScatter26,
            hourInMoneyData = data.hourInMoneyData,
            totalData = data.totalData,
            selectList = data.selectList; // isObj

          // 初始化下拉列表
          _selectList.init({
            eleName: '#select_user',
            selectList
          });

          // 初始化日期插件按钮
          _dateMenu.init({
            eleName: '.today_in_out_dateMenu'
          });

          return {
            tooltip: {
              // position: 'top',
              confine: true,
              formatter: function(params) {
                var result = '';
                if (params.seriesType === 'effectScatter') {
                  var dataIndex = params.dataIndex, // x轴哪一项 totalData[dataIndex]
                    seriesIndex = params.seriesIndex, // 指哪个总量 totalData[dataIndex][seriesIndex]
                    total = totalData[dataIndex][seriesIndex]; // 总量
                  total = _tools.moneyComma(total); // 逗号处理
                  if (seriesIndex === 0) {
                    result += '单日入金 ' + total + '￥';
                  } else if (seriesIndex === 1) {
                    result += '单日出金 ' + total + '￥';
                  } else {
                    result += '单日入金 ' + total + '笔';
                  }
                } else {
                  // [0, 0, level]
                  var index = params.data[0],
                    hourDataIndex = params.data[1],
                    inMoney = _tools.moneyComma(
                      hourInMoneyData[index][hourDataIndex]
                    );
                  result += hourDataIndex + ':00 <br>';
                  result += '入金 ' + inMoney + '￥';
                }
                return result;
              }
            },
            grid: {
              top: '11%',
              right: '2%',
              bottom: '8%',
              left: '6%'
            },
            dataZoom: {
              type: 'inside',
              start: 0,
              end: 100
            },
            xAxis: {
              type: 'category',
              data: xAxisData,
              boundaryGap: true,
              splitLine: {
                show: true,
                lineStyle: {
                  color: '#999',
                  type: 'dashed'
                }
              },
              axisLabel: {
                color: '#535761',
                fontSize: 10,
                interval: 0
                // rotate: -30
              }
            },
            yAxis: {
              type: 'category',
              data: [
                '0',
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '10',
                '11',
                '12',
                '13',
                '14',
                '15',
                '16',
                '17',
                '18',
                '19',
                '20',
                '21',
                '22',
                '23',
                '',
                '',
                '订单数',
                '',
                '付款额',
                '',
                '收款额'
              ],
              splitLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                margin: 15
              }
            },
            // 26 28 30
            series: [
              // 收款额
              {
                type: 'effectScatter',
                symbolSize: 18,
                showEffectOn: 'emphasis',
                itemStyle: {
                  color: '#5CA1DA'
                },
                data: effectScatter30
              },
              // 付款额
              {
                type: 'effectScatter',
                symbolSize: 18,
                showEffectOn: 'emphasis',
                itemStyle: {
                  color: '#E85C5C'
                },
                data: effectScatter28
              },
              // 订单数
              {
                type: 'effectScatter',
                symbolSize: 18,
                showEffectOn: 'emphasis',
                itemStyle: {
                  color: '#F4BB44'
                },
                data: effectScatter26
              },
              // 小时
              {
                name: 'scatter',
                type: 'scatter',
                symbolSize: function(val) {
                  return val[2] * 2;
                },
                data: hourData,
                animationDelay: function(idx) {
                  return idx * 5;
                },
                itemStyle: {
                  color: '#3BB9D1'
                }
              }
            ]
          };
        },
        // 历史出入金
        historyInOut: function(param) {
          var allData = param.data, // 可直接用于绘制的数据
            xAxis = allData.xAxis, // x轴数据
            in_money = allData.series.in_money, // series 入金
            out_money = allData.series.out_money; // series 出金
          return {
            backgroundColor: '#fff',
            grid: {
              top: '15%',
              right: '7%',
              bottom: '25%',
              left: '8%'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                crossStyle: {
                  color: '#999'
                }
              }
            },
            dataZoom: {
              type: 'inside',
              start: 0,
              end: 100
            },
            yAxis: [
              {
                name: '金额(万元)',
                nameTextStyle: {
                  color: '#535761',
                  fontSize: 10
                },
                type: 'value',
                // max: function(value) {
                //   return value.max;
                // },
                // 分割线
                splitLine: {
                  show: false
                },
                // 范围分割
                splitArea: {
                  show: false
                },
                // 刻度线显示隐藏
                axisTick: {
                  show: false
                },
                // y轴轴线
                axisLine: {
                  lineStyle: {
                    color: '#ccc',
                    width: 2
                  }
                },
                // y轴文本
                axisLabel: {
                  formatter: function(value, index) {
                    return value / 10000;
                  },
                  color: '#535761',
                  fontSize: 10,
                  margin: 4
                }
              },
              {
                show: false,
                name: '订单数(个)',
                nameTextStyle: {
                  color: '#535761',
                  fontSize: 10
                },
                type: 'value',
                max: function(value) {
                  return value.max;
                },
                // 坐标轴刻度文本样式
                axisLabel: {
                  // 保留小数
                  formatter: function(value, index) {
                    return value.toFixed(2);
                  }
                  // margin: 4
                },
                // 分割线
                splitLine: {
                  show: false
                },
                // 范围分割
                splitArea: {
                  show: false
                },
                // 刻度线显示隐藏
                axisTick: {
                  show: false
                },
                // y轴轴线
                axisLine: {
                  lineStyle: {
                    color: '#ccc',
                    width: 2
                  }
                },
                // y轴文本
                axisLabel: {
                  color: '#535761',
                  fontSize: 10
                }
              }
            ],
            xAxis: {
              // name: '周期',
              type: 'category',
              boundaryGap: false,
              // 刻度线显示隐藏
              axisTick: {
                show: true
              },
              // 轴线
              axisLine: {
                lineStyle: {
                  color: '#ccc',
                  width: 2
                }
              },
              // 文本
              axisLabel: {
                color: '#535761',
                fontSize: 10
              },
              data: xAxis,
              axisLabel: {
                // interval: 0,
                // rotate: -30
              }
            },
            legend: {
              // data: ['收款额', '付款额', '订单数'],
              data: ['收款额', '付款额'],
              bottom: '14',
              left: '14',
              // orient: 'horizontal',
              x: 'left'
            },
            series: [
              {
                name: '收款额',
                type: 'line',
                smooth: true,
                // symbol: 'rect',
                symbolSize: 1,
                sampling: 'average',
                itemStyle: {
                  normal: {
                    color: '#32B5CB'
                  }
                },
                data: in_money
              },
              {
                name: '付款额',
                type: 'line',
                smooth: true,
                symbolSize: 1,
                sampling: 'average',
                itemStyle: {
                  normal: {
                    color: '#E85C5C'
                  }
                },
                data: out_money
              }
              // {
              //   name: '订单数',
              //   type: 'line',
              //   yAxisIndex: 1, // 使用右侧y轴
              //   smooth: true,
              //   symbolSize: 1,
              //   sampling: 'average',
              //   itemStyle: {
              //     normal: {
              //       color: '#F4BB44'
              //     }
              //   },
              //   data: [6, 7, 8, 5, 4, 3, 6]
              // }
            ]
          };
        },
        // 商户出入金
        userInOut: function(param) {
          var allData = param.data,
            xAxis = allData.xAxis,
            in_money = allData.series['in_money'],
            out_money = allData.series['out_money'];
          return {
            backgroundColor: '#fff',
            grid: {
              top: '15%',
              right: '7%',
              bottom: '25%',
              left: '8%'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                crossStyle: {
                  color: '#999'
                }
              }
            },
            dataZoom: {
              type: 'inside',
              start: 0,
              end: 100
            },
            yAxis: {
              name: '金额(万元)',
              nameTextStyle: {
                color: '#535761',
                fontSize: 10
              },
              type: 'value',
              boundaryGap: false,
              // 刻度线显示隐藏
              axisTick: {
                show: false
              },
              // 轴线
              axisLine: {
                lineStyle: {
                  color: '#ccc',
                  width: 2
                }
              },
              // 文本
              axisLabel: {
                formatter: function(value, index) {
                  return value / 10000;
                },
                color: '#535761',
                fontSize: 10
              },
              // 分割线
              splitLine: {
                show: false
              }
            },
            xAxis: {
              type: 'category',
              axisPointer: {
                type: 'shadow'
              },
              // 轴线
              axisLine: {
                lineStyle: {
                  color: '#ccc',
                  width: 2
                }
              },
              // 文本
              axisLabel: {
                color: '#535761',
                fontSize: 10,
                interval: 0,
                rotate: -30
              },
              data: xAxis
            },
            legend: {
              data: ['收款额', '付款额'],
              bottom: '14',
              left: '14',
              orient: 'horizontal',
              x: 'left'
            },
            series: [
              //
              {
                name: '收款额',
                type: 'bar',
                itemStyle: {
                  color: '#32B5CB',
                  opacity: 1
                },
                data: in_money
              },
              {
                name: '付款额',
                type: 'bar',
                itemStyle: {
                  color: '#E85C5C',
                  opacity: 1
                },
                data: out_money
              }
            ]
          };
        },
        // 汇总
        statistics: function(param) {
          var allData = param.data,
            xAxis = allData.xAxis,
            xAxis0 = xAxis['first'],
            xAxis1 = xAxis['second'],
            series = allData.series,
            payStyle = series['payStyle'],
            bankTopTen = series['bankTopTen'];
          return {
            backgroundColor: '#fff',
            grid: {
              top: '15%',
              right: '7%',
              bottom: '25%',
              left: '8%'
            },
            tooltip: {
              trigger: 'axis'
            },
            dataZoom: {
              type: 'inside',
              start: 0,
              end: 100
            },
            yAxis: {
              name: '金额(万元)',
              nameTextStyle: {
                color: '#535761',
                fontSize: 10
              },
              type: 'value',
              boundaryGap: false,
              // 刻度线显示隐藏
              axisTick: {
                show: false
              },
              // 轴线
              axisLine: {
                lineStyle: {
                  color: '#ccc',
                  width: 2
                }
              },
              // 文本
              axisLabel: {
                formatter: function(value, index) {
                  return value / 10000;
                },
                color: '#535761',
                fontSize: 10
              },
              // 分割线
              splitLine: {
                show: false
              }
            },
            xAxis: [
              //
              {
                type: 'category',
                axisPointer: {
                  type: 'shadow'
                },
                // 轴线
                axisLine: {
                  lineStyle: {
                    color: '#ccc',
                    width: 2
                  }
                },
                // 文本
                axisLabel: {
                  color: '#535761',
                  fontSize: 10,
                  interval: 0,
                  rotate: -30
                },
                data: xAxis0
              },
              {
                type: 'category',
                axisPointer: {
                  type: 'shadow'
                },
                // 轴线
                axisLine: {
                  lineStyle: {
                    color: '#ccc',
                    width: 2
                  }
                },
                // 文本
                axisLabel: {
                  color: '#535761',
                  fontSize: 10,
                  interval: 0,
                  rotate: 30
                },
                data: xAxis1
              }
            ],
            legend: {
              data: ['收款额', 'BANK'],
              bottom: '14',
              left: '14',
              // orient: 'horizontal',
              x: 'left'
            },
            series: [
              {
                name: '收款额',
                type: 'bar',
                itemStyle: {
                  color: '#32B5CB',
                  opacity: 1
                },
                data: payStyle
              },
              {
                name: 'BANK',
                type: 'line',
                xAxisIndex: 1,
                smooth: true,
                // symbol: 'rect',
                symbolSize: 6,
                sampling: 'average',
                itemStyle: {
                  normal: {
                    color: '#E85C5C'
                  }
                },
                data: bankTopTen
              }
            ]
          };
        }
      };

      // 获取图表配置
      var option = chartsOption[param.name](param);
      // 绘制图表
      this.echartsDom[param.name].setOption(option);

      // 隐藏loading
      this.loadingDom[param.name] = document.querySelector(param.loadingEle);
      this.loadingDom[param.name].style.display = 'none';

      // 规避按钮错误
      if (param.name === 'todayInOut') {
        _avoidMenuError.todayInOutHide(); // 隐藏方法
      } else {
        _avoidMenuError.historyInOutHide();
      }
    },
    // 更新
    echartsDom: {},
    update: function(param) {
      // 图表数据更新
      var chartsOption = {
        // 今日出入金
        todayInOut: function(param) {
          var data = param.data,
            xAxisData = data.xAxisData,
            yAxisData = data.yAxisData,
            hourData = data.hourData,
            effectScatter30 = data.effectScatter30,
            effectScatter28 = data.effectScatter28,
            effectScatter26 = data.effectScatter26,
            hourInMoneyData = data.hourInMoneyData,
            totalData = data.totalData,
            selectList = data.selectList, // isObj
            type = selectList.type,
            fromTo = data.fromTo;

          // 下拉列表内容修改 ↓↓↓
          if (_selectList.updateState) {
            var rawData = selectList.data, // 下拉列表数据
              selectListDom = _selectList.dom,
              childList = '';
            selectListDom.innerHTML = '';
            // 设置首选项
            if (type === 'merchant_row') {
              selectListDom.innerHTML = '<option value="0">全部商户</option>';
              // 拼接选项
              for (var i = 0, l = rawData.length; i < l; i++) {
                // rawData[i] -> {client: "xxx", userid: "10"}
                childList +=
                  '<option value="' +
                  rawData[i]['userid'] +
                  '">' +
                  rawData[i]['client'] +
                  '</option>';
              }
            } else {
              selectListDom.innerHTML = '<option value="0">全部通道</option>';
              // 拼接选项
              for (var i = 0, l = rawData.length; i < l; i++) {
                // rawData[i] -> {client: "xxx", userid: "10"}
                childList +=
                  '<option value="' +
                  rawData[i] +
                  '">' +
                  rawData[i] +
                  '</option>';
              }
            }
            _selectList.option = '0'; // 重置
            // 将选项插入下拉元素
            selectListDom.innerHTML += childList;

            _selectList.updateState = false; // 关闭入口
          }
          // 下拉列表内容修改 ↑↑↑

          var series = null;
          if (fromTo === 'bank_row') {
            series = [
              {
                type: 'effectScatter',
                data: effectScatter26
              },
              {
                type: 'effectScatter',
                data: []
              },
              {
                type: 'effectScatter',
                data: []
              },
              {
                type: 'scatter',
                data: hourData
              }
            ];
          } else {
            series = [
              // 收款额
              {
                type: 'effectScatter',
                data: effectScatter30
              },
              // 付款额
              {
                type: 'effectScatter',
                data: effectScatter28
              },
              // 订单数
              {
                type: 'effectScatter',
                data: effectScatter26
              },
              // 小时
              {
                type: 'scatter',
                data: hourData
              }
            ];
          }

          return {
            tooltip: {
              // position: 'top',
              confine: true,
              formatter: function(params) {
                var result = '';
                if (params.seriesType === 'effectScatter') {
                  var dataIndex = params.dataIndex, // x轴哪一项 totalData[dataIndex]
                    seriesIndex = params.seriesIndex, // 指哪个总量 totalData[dataIndex][seriesIndex]
                    total = totalData[dataIndex][seriesIndex]; // 总量
                  total = _tools.moneyComma(total); // 逗号处理
                  if (seriesIndex === 0) {
                    result += '单日入金 ' + total + '￥';
                  } else if (seriesIndex === 1) {
                    result += '单日出金 ' + total + '￥';
                  } else {
                    result += '单日入金 ' + total + '笔';
                  }
                } else {
                  // [0, 0, level]
                  var index = params.data[0],
                    hourDataIndex = params.data[1],
                    inMoney = _tools.moneyComma(
                      hourInMoneyData[index][hourDataIndex]
                    );
                  // result += xAxisData[index] + '<br>';
                  result += hourDataIndex + ':00 <br>';
                  result += '入金 ' + inMoney + '￥';
                }
                return result;
              }
            },
            xAxis: {
              data: xAxisData
            },
            yAxis: {
              data: yAxisData
            },
            series
          };
        },
        // 历史出入金
        historyInOut: function(param) {
          var allData = param.data, // 可直接用于绘制的数据
            xAxis = allData.xAxis, // x轴数据
            in_money = allData.series.in_money, // series 入金
            out_money = allData.series.out_money; // series 出金
          return {
            xAxis: {
              data: xAxis
            },
            series: [
              {
                name: '收款额',
                data: in_money
              },
              {
                name: '付款额',
                data: out_money
              }
            ]
          };
        },
        // 商户出入金
        userInOut: function(param) {
          var allData = param.data,
            xAxis = allData.xAxis,
            in_money = allData.series['in_money'],
            out_money = allData.series['out_money'];
          return {
            xAxis: {
              data: xAxis
            },
            series: [
              {
                name: '收款额',
                data: in_money
              },
              {
                name: '付款额',
                data: out_money
              }
            ]
          };
        },
        // 汇总
        statistics: function(param) {
          var allData = param.data,
            xAxis = allData.xAxis,
            xAxis0 = xAxis['first'],
            xAxis1 = xAxis['second'],
            series = allData.series,
            payStyle = series['payStyle'],
            bankTopTen = series['bankTopTen'];
          return {
            xAxis: [
              {
                data: xAxis0
              },
              {
                data: xAxis1
              }
            ],
            series: [
              {
                name: '收款额',
                data: payStyle
              },
              {
                name: 'BANK',
                data: bankTopTen
              }
            ]
          };
        }
      };
      // 获取图表配置
      var option = chartsOption[param.name](param);

      // 绘制图表
      this.echartsDom[param.name].setOption(option);

      // 隐藏loading
      this.loadingDom[param.name] = document.querySelector(param.loadingEle);
      this.loadingDom[param.name].style.display = 'none';
    },
    // loading
    loadingDom: {}
  };

  /**
   * 图表数据请求方法
   */
  var _getChartData = {
    baseUrl: '',
    ajax: function(param) {
      var url = this.baseUrl + param.url + param.sendData, // 请求路径
        chartName = param.name; // 图表名称
      drawType = param.type; // 绘制类型 【init or update】

      $.ajax({
        url,
        type: 'GET',
        dataType: 'JSONP',
        jsonp: 'jsonpCallback',
        success: function(data) {
          var formatData = _formatDataFn[chartName](data); // 将请求回的数据以及相关配置信息传递给处理方法，返回处理后的数据，可直接用于图表绘制
          var _param = Object.assign(
            {},
            {
              data: formatData
            },
            param
          );
          // 实际情况中绘制图表有两种情况，一种是初始化，另一种是切换更新
          _chartsObj[drawType](_param); // 根据处理后的数据直接绘制
        }
      });
    },
    init: function(param) {
      var sendData = null;
      // 默认参数
      if (param.name === 'todayInOut') {
        var date = _tools.formatDate(new Date().getTime(), 'yyyy-MM-dd');
        sendData = '?date=' + date + '&merchant=merchant';
      } else {
        sendData = '?tag=week';
      }
      var param = Object.assign(
        {},
        {
          type: 'init',
          sendData
        },
        param
      );
      this.ajax(param);
    },
    update: function(param) {
      // 请求参数处理
      if (param.name === 'todayInOut') {
        if (param.sendData.fromTo === 'merchant_row') {
          // 拼接请求参数
          param.sendData =
            '?merchant=merchant&date=' +
            param.sendData.date +
            '&user_id=' +
            param.sendData.option;
        } else {
          // 拼接请求参数
          param.sendData =
            '?merchant=bank&date=' +
            param.sendData.date +
            '&bank=' +
            param.sendData.option;
        }
      } else {
        param.sendData = '?tag=' + param.sendData;
      }
      var param = Object.assign(
        {},
        {
          type: 'update'
        },
        param
      );
      this.ajax(param);
    }
  };

  /**
   * 算法工具
   */
  var _tools = {
    // 金额用逗号分隔
    moneyComma: function(money) {
      var money = typeof money === 'string' ? money : money + '',
        result = [],
        counter = 0,
        num_array = money.split('.'),
        num = num_array[0],
        newstr = '';
      for (var i = num.length - 1; i >= 0; i--) {
        counter++;
        result.unshift(num[i]);
        if (!(counter % 3) && i != 0) {
          result.unshift(',');
        }
      }
      if (num_array.length > 1) {
        newstr = result.join('');
        newstr += '.' + num_array[1];
        return newstr;
      } else {
        return result.join('');
      }
    },
    // 时间格式化工具
    formatDate: function(date, fmt) {
      var date = date == undefined ? new Date() : date;
      date = typeof date == 'number' ? new Date(date) : date;
      var fmt = fmt || 'yyyy-MM-dd HH:mm:ss';
      var obj = {
        y: date.getFullYear(), // 年份，注意必须用getFullYear
        M: date.getMonth() + 1, // 月份，注意是从0-11
        d: date.getDate(), // 日期
        q: Math.floor((date.getMonth() + 3) / 3), // 季度
        w: date.getDay(), // 星期，注意是0-6
        H: date.getHours(), // 24小时制
        h: date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, // 12小时制
        m: date.getMinutes(), // 分钟
        s: date.getSeconds(), // 秒
        S: date.getMilliseconds() // 毫秒
      };
      var week = ['天', '一', '二', '三', '四', '五', '六'];
      for (var i in obj) {
        fmt = fmt.replace(new RegExp(i + '+', 'g'), function(m) {
          var val = obj[i] + '';
          if (i == 'w') return (m.length > 2 ? '星期' : '周') + week[val];
          for (var j = 0, len = val.length; j < m.length - len; j++)
            val = '0' + val;
          return m.length == 1 ? val : val.substring(val.length - m.length);
        });
      }
      return fmt;
    },
    // 入金级别
    inMoneyLevel: function(money) {
      var money = typeof money === 'number' ? money : money * 1;
      var level = null; // 级别
      if (money > 100 * 10000) {
        level = 9;
      } else if (80 * 10000 < money && money <= 100 * 10000) {
        level = 8.5;
      } else if (50 * 10000 < money && money <= 80 * 10000) {
        level = 8;
      } else if (30 * 10000 < money && money <= 50 * 10000) {
        level = 7.5;
      } else if (20 * 10000 < money && money <= 30 * 10000) {
        level = 7;
      } else if (15 * 10000 < money && money <= 20 * 10000) {
        level = 6.5;
      } else if (10 * 10000 < money && money <= 15 * 10000) {
        level = 6;
      } else if (6 * 10000 < money && money <= 10 * 10000) {
        level = 5;
      } else if (3 * 10000 < money && money <= 6 * 10000) {
        level = 4;
      } else if (1 * 10000 < money && money <= 3 * 10000) {
        level = 3;
      } else if (5000 < money && money <= 10000) {
        level = 2;
      } else if (0 < money && money <= 5000) {
        level = 1;
      } else {
        level = 0;
      }
      return level;
    }
  };

  /**
   * 数据处理方法 ajax回数据后格式化后输出
   */
  var _formatDataFn = {
    // 今日出入金
    todayInOut: function(param) {
      var selectListData = param.merchant_row
          ? param.merchant_row
          : param.bank_row, // 下拉选项
        selectListType = param.merchant_row ? 'merchant_row' : 'bank_row', // 下拉列表类别：银行或通道
        rawData = param.rows; // 图表未加工数据

      var result = {
        hourData: [], // 气泡大小
        xAxisData: [], // x轴数据
        // 提示框
        totalData: [], // [入，出，订单数]
        hourInMoneyData: [], // 小时入金数据
        // 下拉列表
        selectList: {
          type: selectListType,
          data: selectListData
        },
        fromTo: selectListType // 数据来自 商户还是渠道接口
      };
      this['todayInOutFromTo'] = selectListType;
      if (selectListType === 'bank_row') {
        // 加入数据成员
        result['effectScatter26'] = []; // 收款额  0
        result['yAxisData'] = [
          '0',
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
          '22',
          '23',
          '',
          '',
          '收款额'
        ];
        // {data: "["0.00","0.00","0.00","0.00","0.00","0.00","0.00",….00","56580.00","34447.00","30800.00","10150.00"]", pay_style: "商银信2"}
        for (var i = 0, l = rawData.length; i < l; i++) {
          result.xAxisData.push(rawData[i]['pay_style']); // x轴数据
          // 总额气泡 ↓↓↓
          result.effectScatter26.push([i, 26]);
          // 总额气泡 ↑↑↑
          result.hourInMoneyData[i] = []; // 小数进入金额容器
          var _data = JSON.parse(rawData[i]['data']), // isArr
            totalInMoney = 0; // 总入金
          // 内循环
          for (var j = 0, len = _data.length; j < len; j++) {
            var in_money = _data[j];
            // 总计↓↓↓
            totalInMoney = parseInt(in_money) + totalInMoney; // 总入金
            // 总计↑↑↑
            var inMoneylevel = _tools.inMoneyLevel(in_money); // 入金等级
            result.hourData.push([i, j, inMoneylevel]); // 小时气泡数据
            result.hourInMoneyData[i].push(in_money); // 数据提示框显示数据
          }
          result.totalData.push([totalInMoney]);
        }
      } else {
        // 加入数据成员
        result['effectScatter30'] = []; // 收款额  0
        result['effectScatter28'] = []; // 付款额  1
        result['effectScatter26'] = []; // 订单数  2
        result['yAxisData'] = [
          '0',
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
          '22',
          '23',
          '',
          '',
          '订单数',
          '',
          '付款额',
          '',
          '收款额'
        ];

        // {in_money: "0.00", in_count: "0", out_money: "0.00", out_count: "0"}
        for (var i = 0, l = rawData.length; i < l; i++) {
          result.xAxisData.push(rawData[i]['client']); // x轴数据

          // 总额气泡 ↓↓↓
          result.effectScatter30.push([i, 30]);
          result.effectScatter28.push([i, 28]);
          result.effectScatter26.push([i, 26]);
          // 总额气泡 ↑↑↑
          result.hourInMoneyData[i] = []; // [[], [], [], ...] 可通过下标进行入金金额查询
          var _data = JSON.parse(rawData[i]['data']); // JSON转JS对象 isArr [{},{},{}...]

          var totalInMoney = 0, // 总入金
            totalOutMoney = 0, // 总出金
            totalInCount = 0; // 入金总次数

          // 内循环
          for (var j = 0, len = _data.length; j < len; j++) {
            var in_money = _data[j]['in_money'], // 入金
              in_count = _data[j]['in_count'], // 入金次数
              out_money = _data[j]['out_money'], // 出金
              out_count = _data[j]['out_count']; // 出金次数

            // 总计↓↓↓
            totalInMoney = parseInt(in_money) + totalInMoney; // 总入金
            totalOutMoney = parseInt(out_money) + totalOutMoney; // 总出金
            totalInCount = parseInt(in_count) + totalInCount; // 入金总次数
            // 总计↑↑↑

            var inMoneylevel = _tools.inMoneyLevel(in_money); // 入金等级
            result.hourData.push([i, j, inMoneylevel]); // 小时气泡数据
            result.hourInMoneyData[i].push(in_money); // 数据提示框显示数据
          }
          result.totalData.push([totalInMoney, totalOutMoney, totalInCount]);
        }
      }
      return result;
    },
    // 历史出入金
    historyInOut: function(param) {
      var rawData = param.rows; // 未加工的数据
      // 2018-02-22:{in_money: "262865.40", out_money: "2329715.52"}
      var result = {
        // x轴
        xAxis: [],
        // 数据
        series: {
          in_money: [],
          out_money: []
        }
      };

      var xAxis = result.xAxis,
        seriesInMoney = result.series['in_money'],
        seriesOutMoney = result.series['out_money'];

      for (var k in rawData) {
        xAxis.push(k);
        seriesInMoney.push(rawData[k]['in_money']);
        seriesOutMoney.push(rawData[k]['out_money']);
      }
      return result;
    },
    // 商户出入金
    userInOut: function(param) {
      var rawData = param.rows;
      var result = {
        xAxis: [],
        series: {
          in_money: [],
          out_money: []
        }
      };

      // 2:{in_money: "0.01", out_money: 0, client: "baobao"}
      var xAxis = result.xAxis,
        seriesInMoney = result.series['in_money'],
        seriesOutMoney = result.series['out_money'];
      for (var k in rawData) {
        xAxis.push(rawData[k]['client']);
        seriesInMoney.push(rawData[k]['in_money']);
        seriesOutMoney.push(rawData[k]['out_money']);
      }
      return result;
    },
    // 汇总
    statistics: function(param) {
      var rawData = param.rows,
        payStyle = rawData.paystyle,
        bankCode = rawData.bankcode;
      var result = {
        xAxis: {
          first: [],
          second: []
        },
        series: {
          payStyle: [],
          bankTopTen: []
        }
      };

      // {paystyle: "云路支付", money: "20411778.65"}
      var xAxisFirst = result.xAxis.first,
        seriesPayStyle = result.series.payStyle;
      for (var i = 0, l = payStyle.length; i < l; i++) {
        xAxisFirst.push(payStyle[i]['paystyle']);
        seriesPayStyle.push(payStyle[i]['money']);
      }

      // {bankcode: "abc", money: "84925169.75"}
      var rawXAxisSecond = [],
        rawBankCode = [];
      for (var i = 0, l = bankCode.length; i < l; i++) {
        rawXAxisSecond.push(bankCode[i]['bankcode']);
        rawBankCode.push(bankCode[i]['money']);
      }

      var xAxisSecond = result.xAxis.second,
        seriesBankTopTen = result.series.bankTopTen,
        downOrder = rawBankCode.sort(function(a, b) {
          return b - a;
        });

      for (var i = 0, l = downOrder.length; i < l; i++) {
        for (var j = 0, len = downOrder.length; j < len; j++) {
          if (bankCode[j]['money'] === downOrder[i]) {
            xAxisSecond.push(bankCode[j]['bankcode']);
            seriesBankTopTen.push(downOrder[i]);
          }
        }
      }

      xAxisSecond.splice(10);
      seriesBankTopTen.splice(10);
      return result;
    }
  };

  /**
   * 切换按钮
   */
  var _chartMenu = {
    getEle: function(ele) {
      return document.querySelectorAll(ele);
    },
    init: function(param) {
      var ele = this.getEle(param.eleName);
      for (var i = 0, l = ele.length; i < l; i++) {
        (function(i) {
          ele[i].onclick = function(e) {
            var parent = e.srcElement.offsetParent,
              children = parent.children,
              target = e.target;

            // 只有点击li生效
            if (target.localName !== 'li') {
              return;
            }

            // 高亮样式
            for (var j = 0, len = children.length; j < len; j++) {
              children[j].classList.remove('active');
            }
            target.classList.add('active');

            // 根据类名判断触发哪些图表进行更新
            var triggerFlag = parent.classList[1];

            // 以html元素中的类名为判断条件，选择需要触发更新的图表
            if (triggerFlag === 'chart_category_menu') {
              var updateCharts = ['todayInOut'];
              // 重置日期对象和下拉列表对象保存的旧值
              _dateMenu.date = _tools.formatDate(
                new Date().getTime(),
                'yyyy-MM-dd'
              );
              _selectList.option = '0';

              // 日期内容修改 ↓↓↓
              // 关闭监听
              _dateMenu.observer.disconnect();
              // 日期元素
              var dateMenuEle = _dateMenu.ele;
              // 更换日期文本
              dateMenuEle.innerHTML = _dateMenu.date;
              // 开启监听
              _dateMenu.observer.observe(dateMenuEle, {
                attributes: true,
                childList: true,
                characterData: true
              });
              // 日期内容修改 ↑↑↑

              _selectList['updateState'] = true; // 更新下拉列表状态

              // 作为请求参数
              var sendData = {
                fromTo: target.getAttribute('data-type') // 获取自定义属性
              };
              sendData['option'] = _selectList.option;
              sendData['date'] = _dateMenu.date;
            } else if (triggerFlag === 'chart_cycle_menu') {
              var sendData = target.getAttribute('data-type'); // 获取自定义属性
              var updateCharts = ['historyInOut', 'userInOut', 'statistics'];
            }

            // 遍历需要更新的图表名称，根据名称进行更新
            for (var k = 0, length = updateCharts.length; k < length; k++) {
              // 获取图表配置
              var param = chartsConfig[updateCharts[k]];

              // 获取loading元素
              var loadingDom = _chartsObj.loadingDom[param.name];

              // 显示loading
              if (loadingDom) {
                loadingDom.style.display = 'block';
              }

              // 在_getChartData.update中拼接请求地址发送ajax请求
              param['sendData'] = sendData;

              _getChartData.update(param); // 请求数据
            }
          };
        })(i);
      }
    }
  };

  /**
   * 数据汇总单元
   */
  var _collectUnit = {
    baseUrl: '',
    ajax: function(param) {
      var url = this.baseUrl + param.url;
      var that = this;
      $.ajax({
        url: url,
        type: 'GET',
        dataType: 'JSONP',
        jsonp: 'jsonpCallback',
        success: function(data) {
          var parent = that.getEle(param.initEle), // 父元素
            children = parent.children, // 所有的子元素
            order = param.order; // 数据插入顺序 isArr
          // 循环插值
          for (var i = 0, l = children.length; i < l; i++) {
            var content = children[i].querySelector('span'); // 每个内容标签
            // 根据数据插入顺序替换节点内容
            if (i < 4) {
              var money = _tools.moneyComma(data[order[i]]);
              content.innerHTML = '￥' + money;
            } else {
              if (data[order[i]]) {
                content.innerHTML = _tools.moneyComma(data[order[i]]);
              } else {
                content.innerHTML = '--'; // 【dev】
              }
            }
          }
        }
      });
    },
    getEle: function(ele) {
      return document.querySelector(ele);
    },
    init: function(param) {
      this.ajax(param);
    }
  };

  /**
   * 待办事项
   */
  var _backlog = {
    baseUrl: '',
    ajax: function(param) {
      var url = this.baseUrl + param.url;
      var parent = document.querySelector(param.initEle),
        children = parent.children;
      // 对应DOM
      var settlementEle = children[0].children[0],
        examineEle = children[1].children[0];
      $.ajax({
        url: url,
        type: 'GET',
        dataType: 'JSONP',
        jsonp: 'jsonpCallback',
        success: function(data) {
          var settlement = data.settlement, // 待结算
            examine = data.examine; // 待审核
          settlementEle.innerHTML = settlement;
          examineEle.innerHTML = examine;
        }
      });
    },
    init: function(param) {
      this.ajax(param);
    }
  };

  /**
   * 设置公共的请求地址
   */
  var _setBaseUrl = function(param) {
    _getChartData.baseUrl = param.baseUrl; // 所有图表
    _collectUnit.baseUrl = param.baseUrl; // 数据汇总单元
    _backlog.baseUrl = param.baseUrl; // 待办事项
  };

  /**
   * 日期插件按钮
   */
  var _dateMenu = {
    date: '',
    ele: null,
    init: function(param) {
      // /Bestpay/IndexChart/merchantAndBankInfo?date=2018-03-12
      // 获取元素类名
      var ele = param.eleName;

      // 选择进行监听的DOM
      var target = document.querySelector(ele);
      this.ele = target; // 将获取到的元素暴露给外部

      // 获取本地时间设置DOM初始值
      var localDate = _tools.formatDate(new Date().getTime(), 'yyyy-MM-dd');
      _dateMenu.date = localDate; // 暴露值给外部
      target.innerHTML = localDate;

      // 观察者构造函数
      var MutationObserver =
        window.MutationObserver ||
        window.WebKitMutationObserver ||
        window.MozMutationObserver;

      // 创建观察者对象
      var observer = new MutationObserver(function(mutations) {
        // mutations isArr
        mutations.forEach(function(mutation) {
          // mutation isObj
          // 获取日期文本
          var date = mutation.target.innerHTML;
          _dateMenu.date = date;

          // 将要更新图表的名称
          var updateChart = 'todayInOut';

          // 获取该图表配置
          var param = chartsConfig[updateChart];

          // 显示loading ↓↓↓
          var loadingDom = _chartsObj.loadingDom[updateChart];
          if (loadingDom) {
            loadingDom.style.display = 'block';
          }
          // 显示loading ↑↑↑

          // 请求参数
          param['sendData'] = {
            fromTo: _formatDataFn['todayInOutFromTo'],
            option: _selectList.option,
            date: _dateMenu.date
          };
          _getChartData.update(param); // 请求数据
        });
      });

      // 暴露给外部
      this['observer'] = observer;

      // 配置观察选项
      var config = {
        attributes: true,
        childList: true,
        characterData: true
      };

      // 传入目标节点和观察选项，开启观察
      observer.observe(target, config);
      // observer.disconnect(); // 关闭
    }
  };

  /**
   * 下拉列表
   */
  var _selectList = {
    dom: null,
    option: '',
    init: function(param) {
      var ele = param.eleName,
        type = param.selectList.type, // merchant_row  bank_row
        rawData = param.selectList.data; // isArr

      var select = document.querySelector(ele); // 下拉元素
      this.dom = select; // 暴露于外部

      // 设置首选项
      if (type === 'merchant_row') {
        select.innerHTML = '<option value="0">全部商户</option>';
      } else {
        select.innerHTML = '<option value="0">全部通道</option>';
      }
      this.option = '0'; // 暴露值给外部

      // 拼接选项
      var childList = '';
      for (var i = 0, l = rawData.length; i < l; i++) {
        // rawData[i] -> {client: "xxx", userid: "10"}
        childList +=
          '<option value="' +
          rawData[i]['userid'] +
          '">' +
          rawData[i]['client'] +
          '</option>';
      }
      // 将选项插入下拉元素
      select.innerHTML += childList;

      // 监听选中项
      select.addEventListener(
        'change',
        function(e) {
          var ev = e || window.event;
          var target = ev.target || ev.srcElement;
          _selectList.option = target.value; // 更新已保存的旧值

          // 将要更新图表的名称
          var updateChart = 'todayInOut';

          // 获取该图表配置
          var param = chartsConfig[updateChart];

          // 显示loading ↓↓↓
          var loadingDom = _chartsObj.loadingDom['todayInOut'];
          if (loadingDom) {
            loadingDom.style.display = 'block';
          }
          // 显示loading ↑↑↑

          // 请求参数
          param['sendData'] = {
            fromTo: _formatDataFn['todayInOutFromTo'],
            option: _selectList.option,
            date: _dateMenu.date
          };
          _getChartData.update(param); // 请求数据
        },
        false
      );
    }
  };

  /**
   * 规避图表未完成首次初始化导致切换按钮错误
   */
  var _avoidMenuError = {
    todayInOutHide: function() {
      // 在图表的init方法中
      // _avoidMenuError.todayInOutHide(); // 隐藏方法
      var dom = document.querySelector('.today_in_out_avoid');
      dom.style.display = 'none';
    },
    historyInOut: [], // 3
    historyInOutHide: function() {
      this.historyInOut.push(true); // 每绘制完一个就添加一个完成的状态
      var historyInOutState = 0, // 执行隐藏的条件 >=3
        historyInOut = this.historyInOut;
      for (var i = 0, l = historyInOut.length; i < l; i++) {
        if (historyInOut[i] === true) {
          historyInOutState++;
        }
      }
      // 条件成立 隐藏
      if (historyInOutState >= 3) {
        var dom = document.querySelector('.history_in_out_avoid');
        dom.style.display = 'none';
      }
    }
  };
  
  return {
    _setBaseUrl, // 设置请求的公共路径
    _collectUnit, // 数据汇总单元
    _backlog, // 待办事项
    _getChartData, // 接收图表数据并处理
    _chartMenu // 初始化交互按钮
  };
};
