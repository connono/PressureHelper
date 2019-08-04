import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import { AlbumView, Button } from 'teaset' 

width=Dimensions.get('window').width
height=Dimensions.get('window').height

export default class Introduction extends React.Component{
  constructor(props){
	super(props)
  }
  render(){
	return(
	  <View style={{height:height-30, width: width}}>
	    <AlbumView
          style={{flex: 1}}
          control={true}
          images={[
          require('./img/home1_1.jpg'),
          require('./img/information1_1.jpg'),
          require('./img/information2_1.jpg'),
          require('./img/information3_1.jpg'),
          require('./img/doctor_1.jpg'),
          ]}
        />
		<Button style={{position: 'absolute', top: 20, borderRadius: 50, right: 30, backgroundColor: 'transparent'}} title='跳过' titleStyle={{fontSize: 12}} onPress={this.props.toPageControl} />
	  </View>
	)
  }
}