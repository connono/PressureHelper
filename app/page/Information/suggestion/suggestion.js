import React from 'react'
import { ScrollView, Text, StyleSheet, View, Dimensions } from 'react-native'
import Doctor from './doctor'
import Helper from './helper'

windowHeight= Dimensions.get('window').height

export default class Suggestion extends React.Component{
  constructor(props){
	super(props)
  }
  
  render(){
	return(
	  <View>
	    <View style={{ alignItems: 'center', height: windowHeight-180}}>
		<ScrollView
		 showsVerticalScrollIndicator={false}>
	    <Doctor />
		<Helper />
		<View style={{height: 50}} />
		</ScrollView>
		</View>
	  </View>
	)
  }
}