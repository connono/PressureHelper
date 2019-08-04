import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions, ScorllView } from 'react-native'
import Chart from './chart/chart'
import Table from './table/table'
import Suggestion from './suggestion/suggestion'
import { ButtonGroup, Card } from 'react-native-elements'
import axios from 'axios'
import { Toast } from 'teaset'

windowHeight= Dimensions.get('window').height

styles=StyleSheet.create({
  dataCard: {
	backgroundColor: 'green',
	height: 100,
	width: 300
  },
  buttonGroup: {
	marginTop: 60
  },
  card: {
	padding: 10,
	borderRadius: 15,
	height: windowHeight-100
  },
})

export default class InformationPage extends React.Component {
    constructor(){
	  super()
	  this.state={
		selectedIndex: 0,
		data:[]
	  }
	  this.updateIndex = this.updateIndex.bind(this)
	}
	
	updateIndex(selectedIndex){
	  this.setState({selectedIndex})
	}
	
	componentDidMount(){
	  _this = this
	  global.storage.load({
		key: 'loginState',
		autoSync: false,
		syncInBackground:false,
	  }).then(ret =>{
		axios({
		  method: 'get',
		  url: 'http://47.103.115.199/api/pressures',
		  headers: {
		    'Authorization': ret.token_type+' '+ret.access_token,
		  }
	    }).then((response)=>{
		  _this.setState({
		    data: response.data.data
		  })
		  global.storage.save({
			key: 'data',
			data: {
			  data: response.data.data
			}
		  })
	    }).catch((error)=>{
		  alert(error)
		  Toast.fail('信息获取失败')
	    })
	  }).catch((error)=>{
		alert(error)
		Toast.fail('信息获取失败')
	  })
	  
	}
	
	render() {
	  //mock data
      var date = []
	  var data1 = []
	  var data2 = []
	  this.state.data.map((item,i)=>{
		date.push(item.created_at.replace(/\s[\x00-\xff]*/g,''))
		data1.push(item.sp)
		data2.push(item.dp)
	  })
	  
	  tableData=date.map((item,index)=>([date[index],data1[index],data2[index]]))
	  
	  const buttons = ['图表','统计数据','分析']
	  const { selectedIndex } = this.state
	  if(selectedIndex == 0){
		selectedContent=(<Chart date={date} data1={data1} data2={data2}/>)
	  }else if(selectedIndex == 1){
		selectedContent=(<View style={{height: 300, width: 330}}><Table tableData={tableData.reverse()} /></View>)
	  }else if(selectedIndex == 2){
		selectedContent=(<Suggestion />)
	  }
      return (
	    <View>
		  <Card containerStyle={styles.card}>
		    <ButtonGroup
		      onPress={this.updateIndex}
		      selectedIndex={selectedIndex}
		      buttons={buttons}
		      containerStyle={{height:30}}
		    />
		    {selectedContent}
	      </Card>
		</View>
      )
    }
}
