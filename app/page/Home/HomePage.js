import React from 'react'
import { Card, ScrollView, Text, StyleSheet, View } from 'react-native'
import Clock from './clock/clock'
import HomeCard from './Home/Card'
import Timer from './clock/timer'


export default class HomePage extends React.Component{
  constructor(){
	super()
	this.state={
	  clockMode: 'clock', //timer
	  seconds: 0,
	  timerID: -1,
	}
  }
  
  setTimer(id, seconds){
	this.setState({
	  clockMode: 'timer',
	  seconds: seconds,
	  timerID: id,
	})
  }
  
  onRefCard = (ref) => {
	this.card = ref
  }
  
  
  setClock(){
	timerID = this.state.timerID
	this.card.finish(timerID)
	this.setState({
	  clockMode: 'clock',
	  seconds: 0,
	})
  }
  
  render(){
	clockMode=this.state.clockMode
	seconds=this.state.seconds
	return (
	<View style={{backgroundColor: 'white', margin: 10}}>
	<ScrollView
	  showsVerticalScrollIndicator={false}>
	  <ClockComponent clockMode={clockMode} seconds={seconds} setClock={this.setClock.bind(this)} />
	<HomeCard onRefCard={this.onRefCard} setTimer={this.setTimer.bind(this)} />
	</ScrollView>
	</View>
	)
  }
}

class ClockComponent extends React.Component{
	constructor(props){
	  super(props)
	}
	render(){
	  if(this.props.clockMode=='timer')
		return <Timer seconds={this.props.seconds} setClock={this.props.setClock}/>
	  return <Clock />
	}
}