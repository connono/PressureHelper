import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import HomePage from './page/Home/HomePage'
import InformationPage from './page/Information/InformationPage'
import DoctorPage from './page/Doctor/doctorPage'
import Icon from 'react-native-vector-icons/Ionicons'


const TabNavigator = createBottomTabNavigator({
  Home: {
	screen: HomePage,
	navigationOptions:{
	  tabBarLabel: "首页",
	  tabBarIcon: ({focused, tintColor}) => (
	    <Icon name="ios-home" size={25} color={focused?"blue":"black"} />
	  )
	}
  },
  Information: {
	screen: InformationPage,
	navigationOptions:{
	  tabBarLabel: "血压分析",
	  tabBarIcon: ({focused, tintColor}) => (
	    <Icon name="ios-stats" size={25} color={focused?"blue":"black"}/>
	  )
	}
  },
  Doctor: {
	screen: DoctorPage,
	navigationOptions:{
	  tabBarLabel: "医生信息",
	  tabBarIcon: ({focused, tintColor}) => (
	    <Icon name="ios-person" size={25} color={focused?"blue":"black"}/>
	  )
	}
  }
},{
  swipeEnabled: true
});

const styles = StyleSheet.create({
  tabBarIconStyle: {
	width: 10,
	height: 10
  }
})

export default createAppContainer(TabNavigator);