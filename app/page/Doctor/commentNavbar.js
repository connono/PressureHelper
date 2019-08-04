import React from 'react'
import NavBar, { NavGroup, NavTitle, NavButton, NavButtonText } from 'react-native-nav'
import { StyleSheet } from 'react-native'


const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: '#000',
  },
  navBar: {
    backgroundColor: '#212121',
  },
  title: {
    color: '#fff',
  },
  buttonText: {
    color: '#b5b5b5',
  },
})

export default class CommentNavbar extends React.Component {
	constructor(props){
	  super(props)
	}
	
	render(){
	  return(
		<NavBar style={styles}>
          <NavTitle style={styles.title}>
			询问医生
          </NavTitle>
		  <NavGroup>
		  <NavButton onPress={()=>alert('反馈')}>
			<NavButtonText style={styles.buttonText}>
			  反馈
			</NavButtonText>
		  </NavButton>
		  <NavButton onPress={this.props.toggle}>
			<NavButtonText style={styles.buttonText}>
			  {"返回>"}
		    </NavButtonText>
		  </NavButton>
		  </NavGroup>
        </NavBar>
      )
	}
}