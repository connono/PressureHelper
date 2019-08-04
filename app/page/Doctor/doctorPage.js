import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Comment from './comment'
import Information from './information'

export default class DoctorPage extends React.Component{
	state={
	  clicked: true
	}
	
	toggle(){
	  clicked = this.state.clicked
	  this.setState({
		clicked: !clicked
	  })
	}
	
	render(){
	  return(
	    (this.state.clicked?<Information toggle={this.toggle.bind(this)}/>:<Comment toggle={this.toggle.bind(this)} />)
	  )
	}
}