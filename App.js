import React from 'react'
import { View } from 'react-native'
import PageControl from './app/PageControl'
import Register from './app/Register'
import Login from './app/Login'
import Introduction from './app/Introduction'
import Storage from 'react-native-storage'
import AsyncStorage from '@react-native-community/async-storage'

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000*3600*24,
  enableCache: true
});

global.storage = storage

export default class App extends React.Component{
  state={
	Position: 'Login', //Login=>PageControl
	                   //Register=>Introduction=>PageControl
  }
  
  toPageControl(){
	this.setState({
	  Position: 'PageControl'
	})
  }
  
  toIntroduction(){
	this.setState({
	  Position: 'Introduction'
	})
  }
  
  toRegister(){
	this.setState({
	  Position: 'Register',
	})
  }
  
  toLogin(){
	this.setState({
	  Position: 'Login',
	})
  }
  
  render(){
	if(this.state.Position=='Register'){
	  return(<Register toLogin={this.toLogin.bind(this)} />)
	}else if(this.state.Position=='Introduction'){
	  return(<Introduction toPageControl={this.toPageControl.bind(this)} />)
	}else if(this.state.Position=='PageControl'){
	  return(<PageControl />)
	}else if(this.state.Position=='Login'){
	  return(<Login toPageControl={this.toPageControl.bind(this)} toRegister={this.toRegister.bind(this)} toIntroduction={this.toIntroduction.bind(this)} />)
	}else if(this.state.Position=='Test'){
	  return(<Test />)
	}else if(this.state.Position=='LoginAndRegister'){
	  return(<LoginAndRegister toIntroduction={this.toIntroduction.bind(this)} toPageControl={this.toPageControl.bind(this)} toRegister={this.toRegister.bind(this)} />)
	}
  }
}
