import React from 'react'
import { View, StyleSheet } from 'react-native'
import Svg, { TSpan,Text, Circle } from 'react-native-svg'

const styles = StyleSheet.create({
  boxStyle: {
	height: 300,
  },
  Clock: {
	flex:1,
	margin: 20,
	alignItems:"center",
	justifyContent: "center"
  }
})

export default class Clock extends React.Component{
  constructor(){
    super();
    this.state = {
      time: new Date()
    }
  }

  timer(){
    this.setState({
	  time: new Date()
	})
  }
  
  componentDidMount(){
    this.timerID = setInterval(
	  () => this.timer(),
	  1000
	)
  }
  
  componentWillUnMount(){
	clearInterval(this.timerID)
  }
  
  render(){
	var time = this.state.time
	var month = time.getMonth()+1
	var date = time.getDate()
	var hour = time.getHours()
	hour = (hour<10)?" "+hour:hour
	var minute = time.getMinutes()
	var second = time.getSeconds()
	var weekday = ["星期天","星期一","星期二","星期三","星期四","星期五","星期六"]
	var day = weekday[time.getDay()]
	
	var cx = cy = 125
	var angle = ((minute-15+second/60)/60)*2*Math.PI
	var pointx = cx+100*Math.cos(angle)
	var pointy = cy+100*Math.sin(angle)
	
	hour = (hour<10)?" "+hour:hour
	minute = (minute<10)?"0"+minute:minute
	
	return(
	  <View style={styles.boxStyle}>
		<View style={styles.Clock}>
		  <Svg height="250" width="250">
		    <Circle cx="125" cy="125" r="100" fill="white" stroke="gray" strokeWidth="2"/>
			<Circle cx={pointx} cy={pointy} r="6" fill="black"/>
			<Text x="50" y="145">
			  <TSpan fontSize="60">{hour+":"+minute}</TSpan>
			  <TSpan fontSize="12" x="102" dy="40">{month+"-"+date+" "+day}</TSpan>
			</Text>
		  </Svg>
		</View>
	  </View>
	)
  }
}