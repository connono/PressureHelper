import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Button } from 'teaset'
import { Card, Avatar, Divider, ListItem } from 'react-native-elements'

const styles = StyleSheet.create({
  card: {
	alignItems: 'center',
	justifyContent: 'center',
	padding: 40,
	borderRadius: 15,
  },
  button: {
	width: 150,
	marginLeft: 12
  },
  divider: {
	marginTop: 10,
	marginBottom: 10,
	backgroundColor: '#DCDCDC'
  },
  avatar: {
	marginLeft: 10
  },
  opacityDivider:{
	marginTop: 10,
	marginBottom: 10,
	backgroundColor: 'white'
  }
})

export default class Information extends React.Component{
  constructor(props){
	super(props)
  }
	
  render(){
    return(
	  <View>
	    <Card containerStyle={styles.card}>
		<ScrollView>
	      <Avatar rounded source={require('./img/timg.jpg')} containerStyle={styles.avatar} size='xlarge' />
		  <Divider style={styles.divider} />
		  <View>
		    <ListItem title="工作单位：XXX医院" />
		  </View>
		  <Divider style={styles.opacityDivider} />
		  <Button title='与医生交流（1）' onPress={this.props.toggle} style={styles.button} />
		</ScrollView>
		</Card>
	  </View>
	)
  }
}
