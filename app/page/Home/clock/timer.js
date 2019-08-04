import React from 'react'
import { View, StyleSheet, Button } from 'react-native'
import Svg, { TSpan, Circle, Text } from 'react-native-svg'

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

export default class Timer extends React.Component{
  constructor(props){
    super(props)
	this.state={
	  seconds: parseInt(this.props.seconds),
	  initialSeconds: parseInt(this.props.seconds),
	  position: true // run
	}
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
  
  timer(){
	if (this.state.seconds==0){
	  this.setState({
		seconds:-1,
		position:false})
	  this.props.setClock()
	}
	if (!this.state.position) return
	seconds = this.state.seconds-1
	this.setState({
	  seconds: seconds
	})
  }
  
  render(){
	minutes = Math.floor(this.state.seconds/60)
	seconds = this.state.seconds-60*minutes
	minutes = minutes<10?" "+minutes:minutes
	seconds = seconds<10?"0"+seconds:seconds
	angle = (((this.state.initialSeconds-this.state.seconds)/this.state.initialSeconds)-0.25)*2*Math.PI
	pointx = 125+100*Math.cos(angle)
	pointy = 125+100*Math.sin(angle)
	
	if(this.state.position){
	  toggleTSpan=(<TSpan onPress={()=>{this.setState({position: false})}} x="102" dy="40" fontSize="11">{"STOP"}</TSpan>)
	}else{
	  toggleTSpan=(<TSpan onPress={()=>{this.setState({position: true})}} x="102" dy="40" fontSize="11">{"RUN"}</TSpan>)
	}
	
	return(
	  <View style={styles.boxStyle}>
		<View style={styles.Clock}>
		  <Svg height="250" width="250">
		    <Circle cx="125" cy="125" r="100" fill="white" stroke="gray" strokeWidth="2"/>
			<Circle cx={pointx} cy={pointy} r="6" fill="black"/>
			<Text x="50" y="145">
			  <TSpan fontSize="60">{minutes+":"+seconds}</TSpan>
			  {toggleTSpan}
			</Text>
		  </Svg>
		</View>
	  </View>
	)
  }
}
