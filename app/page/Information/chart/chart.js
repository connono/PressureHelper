import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Echarts , echarts } from 'react-native-secharts'

export default class chart extends React.Component{
  constructor(props){
	super(props)
  }
  
  render(){
	//模拟图
	this.option={
	  title:{
		left: 'center',
		text: '过去21天内血压趋势图',
		textStyle:{
		  fontSize: 'italic',
		  fontWeight: 'normal',
		  fontFamily: 'monospace',
		  fontSize: '15'
		},
		top: 20
	  },
	  tooltip:{
		trigger: 'axis',
	  },
	  legend: {
		data:['舒张压','收缩压']
	  },
	  toolbox:{
		  feature: {
			restore: {},
			saveAsImage: {},
		  },
	  },
	  xAxis:{
		type: 'category',
		boundaryGap: false,
		data: this.props.date,
	  },
	  yAxis:{
		type: 'value',
		boundaryGap: [0,'100%'],
		name: 'mmHg'
	  },
	  dataZoom: [{ //缩放
		type: 'inside',
		start: 0,
		end: 10,
	  },{
		start:0,
		end: 10,
		handleIcon:'M8.2,13.6V3.9H6.3v9.7H3.1v14.9h3.3v9.7h1.8v-9.7h3.3V13.6H8.2z M9.7,24.4H4.8v-1.4h4.9V24.4z M9.7,19.1H4.8v-1.4h4.9V19.1z',
		handleSize:'80%',
		handleStyle:{
		  color: '#fff',
		  shadowBlur: 3,
		  shadowColor: 'rgba(0,0,0,0.6)',
		  shadowOffsetX: 2,
		  shadowOffsetY: 2,
		},
		left: '17%',
		right: '17%'
	  }],
	  series:[{
		name:'收缩压',
		type:'line',
		smooth: false,
		symbol: 'none',
		sampling: 'average',
		data: this.props.data1,
		markLine:{
		  silent: true,
		  data: [{
			yAxis: 140
		  },{
			yAxis: 120
		  }],
		}
	  },{
		name:'舒张压',
		type:'line',
		smooth: false,
		symbol: 'none',
		sampling: 'average',
		data: this.props.data2,
		markLine: {
		  silent: true,
		  data: [{
			yAxis: 90
		  },{
			yAxis: 60
		  }],
		}
	  }],
	}
	return(<Echarts option={this.option} height={300}/>)
  }
}
