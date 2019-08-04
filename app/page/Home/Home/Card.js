import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { CheckBox, Card, ListItem, Button } from 'react-native-elements'
import { TextButton, RaisedTextButton } from 'react-native-material-buttons';
import _ from 'lodash'
import { Overlay, Label, Input, Button as TButton, Toast } from 'teaset'
import axios from 'axios'
import Icon from 'react-native-vector-icons/Ionicons'

const styles = StyleSheet.create({
  card:{},
  cardTitle: {},
  item: {
	borderBottomWidth:0.4,
	borderBottomColor:'grey',
	paddingTop:4,
	paddingBottom: 4
  },
  itemTitle: {
	fontSize:14,
	justifyContent: "center"
  },
  FinishedItemTitle: {
	fontSize:14,
	justifyContent: "center",
	textDecorationLine: "line-through",
	textDecorationStyle: "solid",
	textDecorationColor: "grey"
  },
  itemButton: {
	height: 16,
	alignItems: "center",
	justifyContent: "center",
	padding: 0,
	margin:0
  },
})


export default class ListCard extends React.Component{
  constructor(props){
	super(props);
	this.state = {
	  items:[
		{
		  name: '运动锻炼30分钟',
		  finished: false
		},{
		  name: '测量血压',
		  finished: false
		}
	  ],
	  remain: 2,
	  pressure: {
		sp: [0,0,0],
		dp: [0,0,0]
	  },
	  item: '',
	  editable: false
	}
  }
  
  componentDidMount(){
	this.props.onRefCard(this)
  }
  
  finish(id){
	//alert(id)
	state = _.cloneDeep(this.state)
	state.items[id].finished=true
	state.remain-=1
	this.setState(state)
  }
  
  onChangeSP(i, newsp){
	pressure = this.state.pressure
	pressure.sp[i] = newsp.replace(/[^0-9]/ig,"")
	this.setState({
	  pressure: pressure
	})
  }
  
  onChangeDP(i, newdp){
	pressure = this.state.pressure
	pressure.dp[i] = newdp.replace(/[^0-9]/ig,"")
	this.setState({
	  pressure: pressure
	})
  }
  
  submit(i){
	filled=this.state.pressure.sp.map((item,i)=>((item==0)|(this.state.pressure.dp[i]==0)))
	if(filled[0]&filled[1]&filled[2]){
	  Toast.fail('请填写至少一次测量数据')
	}else{
	  spArray = _.compact(this.state.pressure.sp)
	  dpArray = _.compact(this.state.pressure.dp)
	  sp = _.min(spArray)
	  dp = _.min(dpArray)
	  const _this = this
	  global.storage.load({
		key: 'loginState',
		autoSync: false,
		syncInBackground: false,
	  }).then(ret =>{
		axios({
		  method: 'post',
		  url: 'http://47.103.115.199/api/pressures',
		  headers:{
			'Authorization': ret.token_type+' '+ret.access_token,
			'content-type':'application/x-www-form-urlencoded'
		  },
		  data: 'sp=' + sp + '&dp=' + dp
		}).then((response)=>{
		  this.overlayView.close()
		  Toast.smile('提交成功')
		  this.finish(i)
		}).catch((error)=>{
		  alert(error)
		})
	  }).catch((error)=>{
		alert(error)
	  })
	}
  }
  
  cancel(){
	this.overlayView.close()
  }
  
  discord(i){
	let overlayView = (
	  <Overlay.PopView
	  ref = {v => this.overlayView=v}
	    style={{alignItems: 'center', justifyContent: 'center'}}
		overlayOpacity={0}
		modal={true}
		>
        <View style={{backgroundColor: '#F5F5F5', paddingLeft: 20, paddingRight: 20, paddingTop: 40, paddingBottom: 40, borderRadius: 15, alignItems: 'center'}}>
		  <Label type='title' text='填写血压值(单位：mmHg)' />
		  <View style={{ marginTop: 20, marginBottom: 8 }}>
		    <Label type='detail' style={{width: 260, fontSize: 12, textAlign:'justify'}} text='测量血压的注意事项：'/>
		    <Label type='detail' style={{width: 260, fontSize: 12, textAlign:'justify'}} numberOfLines={3} text='1.测量时间：对于高血压患者，建议每天测量四次，血压时间应安排在7-11-14-19点测量最为准确。'/>
		    <Label type='detail' style={{width: 260, fontSize: 12, textAlign:'justify'}} numberOfLines={7} text='2.测量要求：测量血压前半小时内不要吸烟，不要喝咖啡；测量血压前应保持心情平静，在安静环境中至少静坐5分钟；测量血压前不要憋尿，应及时排尿；取仰卧位或坐位测量血压；被检查者应裸露上肢并轻度外展，使肘部与心脏处于同一水平；气袖下缘应位于肘窝以上2~3cm。'/>
		    <Label type='detail' style={{width: 260, fontSize: 12, textAlign:'justify'}} numberOfLines={3} text='3.推荐：晚上测量血压能够有助于诊断是否具有隐匿性高血压(白天血压正常，晚上血压偏高)。'/>
		  </View>
		  <View style={{ flexDirection: 'row', width: 260, paddingTop: 3, paddingBottom: 3}}>
		    <Label text='第一次:' style={{flex:2, fontSize: 14, textAlign: 'justify', lineHeight: 26}} />
		    <Label text='收缩压' style={{ flex: 2, fontSize: 14, textAlign: 'justify', lineHeight:26 }} />
			<Input style={{ flex: 1 }} size='sm' value={this.state.pressure.sp} onChangeText={this.onChangeSP.bind(this,0)} />
			<Label style={{width: 10}} />
		    <Label text='舒张压' style={{flex: 2, fontSize: 14, textAlign: 'justify', lineHeight:26 }} />
			<Input style={{flex: 1 }} size='sm' value={this.state.pressure.dp} onChangeText={this.onChangeDP.bind(this,0)} />
		  </View>
		  <View style={{ flexDirection: 'row', width: 260, paddingTop: 3, paddingBottom: 3 }}>
		    <Label text='第二次:' style={{flex:2, fontSize: 14, textAlign: 'justify', lineHeight: 26}} />
		    <Label text='收缩压' style={{ flex: 2, fontSize: 14, textAlign: 'justify', lineHeight:26 }} />
			<Input style={{ flex: 1 }} size='sm' value={this.state.pressure.sp} onChangeText={this.onChangeSP.bind(this,1)} />
			<Label style={{width: 10}} />
		    <Label text='舒张压' style={{flex: 2, fontSize: 14, textAlign: 'justify', lineHeight:26 }} />
			<Input style={{flex: 1 }} size='sm' value={this.state.pressure.dp} onChangeText={this.onChangeDP.bind(this,1)} />
		  </View>
		  <View style={{ flexDirection: 'row', width: 260, paddingTop: 3, paddingBottom: 3 }}>
		    <Label text='第三次:' style={{flex:2, fontSize: 14, textAlign: 'justify', lineHeight: 26}} />
		    <Label text='收缩压' style={{ flex: 2, fontSize: 14, textAlign: 'justify', lineHeight:26 }} />
			<Input style={{ flex: 1 }} size='sm' value={this.state.pressure.sp} onChangeText={this.onChangeSP.bind(this,2)} />
			<Label style={{width: 10}} />
		    <Label text='舒张压' style={{flex: 2, fontSize: 14, textAlign: 'justify', lineHeight:26 }} />
			<Input style={{flex: 1 }} size='sm' value={this.state.pressure.dp} onChangeText={this.onChangeDP.bind(this,2)} />
		  </View>
		  <View style={{ flexDirection: 'row', width: 260, paddingTop: 10, paddingBottom: 3 }}>
		    <View style={{flex: 1, alignItems: 'center'}}>
		      <TButton
			    title='确定' 
			    onPress={this.submit.bind(this,i)}/>
			</View>
			<View style={{flex: 1, alignItems: 'center'}}>
			  <TButton 
			    title='取消' 
				onPress={this.cancel.bind(this)}/>
			</View>
		  </View>
		</View>
	  </Overlay.PopView>
	);
	Overlay.show(overlayView)
  }
  
  alterButtonPress(item, i){
	if(item.name=='运动锻炼30分钟'){
	  this.props.setTimer(i,1800)
	}else if(item.name=='测量血压'){
	  this.discord(i)
	}else{
	  this.finish(i)
	}
  }
  
  alterButton(item,i){
	if(item.finished){
	  if(item.name=='测量血压'){
		return (
		  <TextButton key={i} title='重复测量' onPress={()=>this.alterButtonPress(item,i)}/>
		)
	  }else{
		return (
		  <TextButton key={i} title='已完成' disabled/>
		)
	  }
	}else{
	  return(
	    <TextButton key={i} title='去完成' onPress={()=>this.alterButtonPress(item,i)}/>
	  )
	}
  }
  
  onChangeItem(text){
	this.setState({
	  item: text
	})
  }
  
  addItem(){
	this.setState({
	  editable: true
	})
  }
  
  finishAddItem(){
	if(this.state.item==""){
	  this.setState({
	    editable: false
	  })
	  Toast.fail('内容不能为空')
	}else{
	  repetition=false
	  items = this.state.items
	  remain = this.state.remain
	  items.map((item,i)=>{
		if(item.name==this.state.item){
		  repetition=true
		}
	  })
	  if(repetition){
		this.setState({
	      editable: false,
		  item: ''
	    })
		Toast.fail('内容不能重复')
	  }else{
		items.push({
		  name: this.state.item,
		  finished: false
		})
		remain+=1
		this.setState({
		  items: items,
		  item: '',
		  remain: remain,
		  editable: false
		})
		Toast.smile('添加成功')
	  }
	}
  }
  
  render(){
	
	var title = (this.state.remain==0)?
	            ("你已经坚持完成目标XXX天！"):
				("你目前仍有"+ this.state.remain+ "件事未做！")

	return (
	  <Card title={title} style={styles.card}>
	    {
		  this.state.items.map((item, i) => 
		    (
		    <ListItem
			  key={i}
			  containerStyle={styles.item}
			  title={item.name}
			  titleStyle={item.finished?styles.FinishedItemTitle:styles.itemTitle}
			  rightElement={this.alterButton(item,i)}
			/>
		    )
		  )
		}
		{
		  this.state.editable?
		  (<ListItem 
		     containerStyle={styles.item}
			 leftElement={<Input style={{width: 180}} value={this.state.item} onChangeText={this.onChangeItem.bind(this)} />}
			 rightElement={<TextButton title='确定' onPress={this.finishAddItem.bind(this)} />}
		   />
		  )
		  :(<ListItem
            containerStyle={styles.item}
		    title={"添加今日要做的事"}
		    titleStyle={styles.itemTitle}
		    onPress={this.addItem.bind(this)}
		    leftIcon={<Icon name="ios-add-circle-outline" size={24} />}
		  />)
		}
	  </Card>
	)
  }
}