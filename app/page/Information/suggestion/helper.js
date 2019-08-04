import React from 'react'
import { Animated, View, Text, StyleSheet, ScrollView } from 'react-native'
import { Input, Button, Overlay, Label, Checkbox, Toast } from 'teaset'
import Btn from 'react-native-micro-animated-button';
import { ListItem, Card } from 'react-native-elements'
import InputScrollView from 'react-native-input-scroll-view'

class DelayedFadeInView extends React.Component{
  constructor(props){
    super(props)
	this.state={
	  fadeAnim: new Animated.Value(0),
	}
  }
  
  componentDidMount(){
	Animated.sequence([
	  Animated.delay(this.props.delay),
	  Animated.timing(
	    this.state.fadeAnim,
	    {
		  toValue: 1,
		  duration: 3000,
	    }
	  )
	]).start()
  }
  
  render(){
	let { fadeAnim } = this.state;
	return(
	  <Animated.View
	    style={{
		  ...this.props.style,
		  alignItems: 'center',
		  opacity: fadeAnim,
		}}
	  >
	    {this.props.children}
	  </Animated.View>
	)
  }
}

const styles = StyleSheet.create({
  text:{
	marginTop: 10
  },
  input:{
	marginTop: 10,
	textAlign: 'center',
	width: 300
  },
  button:{
	marginTop: 10,
	width: 100
  },
  rowitem: {
	flexDirection: 'row',
	width: 260,
	justifyContent: 'center',
	paddingTop: 3,
	paddingBottom: 3
  }
})


class Question extends React.Component {
  constructor(props){
	super(props)
  }
  
  state={
	age:0,
	height: 0,
	weight: 0,
	isboy: true,
	danger:[false,false,false,false],
	damage:[false,false,false,false,false],
  }
  
  labels={
	danger:[
	  '家人有高血压病史',
	  '吸烟喝酒',
	  '精神紧张，容易激动',
	  '患有高胆固醇症：总胆固醇>5.72mmol/L(220mg/dl)',
	  '患有糖尿病：空腹血糖测定≥7.0mmol/L',
	  '每日摄盐大于6g'
	],
	damage:[
	  ["心脏损害:左心室肥厚、左心室","收缩和舒张功能异常等"],
	  ["脑损害:短暂性脑缺血发作、","脑出血等"],
	  ["视网膜损害:出血、渗出","或视盘水肿等"],
	  ["肾损害:微量白蛋白尿和蛋白尿","、慢性肾脏疾病等"],
	  ["血管损害:内皮功能异常、颈动","脉内膜增厚等"],
	],
  }
  
  render(){
	dangerLabels=
	  this.labels.danger.map((item,key)=>(
	    <View key={key} style={{flexDirection: 'row', width: 260, marginTop:1, marginBottom:1}}>
		  <Label 
		    style={{flex:4,fontSize:12}} 
			text={item} 
			numberOfLines={2}/>
		  <Checkbox 
		    checked={this.state.danger[key]} 
			onChange={()=>{danger=this.state.danger;danger[key]=!danger[key];this.setState({danger: danger})}} 
			titleStyle={{fontSize:12}} 
			style={{flex:1}} 
			title='是' />
		  <Checkbox 
		    checked={!this.state.danger[key]} 
			onChange={()=>{danger=this.state.danger;danger[key]=!danger[key];this.setState({danger: danger})}} 
			titleStyle={{fontSize:12}} 
			style={{flex:1}} 
			title='否' />
		</View>
	  ))
	
	damageLabels=
	  this.labels.damage.map((item,key)=>(
	    <View key={key} style={{flexDirection: 'row', width: 260, marginTop:1, marginBottom:1}}>
		  <View style={{flex:4,flexDirection:'column',height: 30}}>
		  {item.map((item, key) =>(
		    <Label style={{flex:1,fontSize:12}} text={item} />
		  ))}
		  </View>
		  <Checkbox 
		    checked={this.state.damage[key]} 
			onChange={()=>{damage=this.state.damage;damage[key]=!damage[key];this.setState({damage: damage})}} 
			titleStyle={{fontSize:12}} 
			style={{flex:1}} 
			title='是' />
		  <Checkbox 
		    checked={!this.state.damage[key]}
			onChange={()=>{damage=this.state.damage;damage[key]=!damage[key];this.setState({damage: damage})}}
			titleStyle={{fontSize:12}} 
			style={{flex:1}} 
			title='否' />
		</View>
	  ))
	
	return(
	  <View style={{alignItems: 'flex-start'}}>
	    <View style={{alignItems:'center', width: 260}}>
		  <Label text='进行必要的信息填写有助于更加' />
		  <Label text='准确的判断高血压的风险情况'/>
		</View>
		<View style={styles.rowitem}>
		  <Label style={{flex:3, fontSize: 14, textAlign: 'justify', lineHeight: 26}} text="性别：" />
		  <Checkbox 
		    checked={this.state.isboy} 
			onChange={()=>{isboy=this.state.isbody;this.setState({isboy: !isboy})}} 
			titleStyle={{fontSize:12}} 
			style={{flex:3, justifyContent: 'center',height: 26}} 
			title='男' />
		  <Checkbox 
		    checked={!this.state.isboy} 
			onChange={()=>{isboy=this.state.isboy;this.setState({isboy: !isboy})}} 
			titleStyle={{fontSize:12}} 
			style={{flex:3, justifyContent: 'center',height:26}} 
			title='女' />
		  <Label style={{width: 8}} />
		  <Label style={{flex:5, fontSize: 14, textAlign: 'justify', lineHeight: 26}} text="年龄：" />
		  <Input 
		    style={{flex:2}} 
		    size='sm' 
		    value={this.state.age}
		    onChangeText={text=>this.setState({age: text.replace(/[^0-9]/ig,"")})}
		  />
		</View>
        <View style={styles.rowitem}>
		  <Label style={{flex:5, fontSize: 14, textAlign: 'justify', lineHeight: 26}} text="身高(cm)：" />
		  <Input 
		  style={{flex:2}} 
		    size='sm' 
		    value={this.state.height}
		    onChangeText={text=>this.setState({height: text.replace(/[^0-9]/ig,"")})}
		  />
		  <Label style={{width: 8}} />
		  <Label style={{flex:5, fontSize: 14, textAlign: 'justify', lineHeight: 26}} text="体重 (kg)：" />
		  <Input 
		    style={{flex:2}} 
		    size='sm' 
		    value={this.state.weight}
		    onChangeText={text=>this.setState({weight: text.replace(/[^0-9]/ig,"")})}
		  />
		</View>
		<Label text='高血压危险因素' style={{marginTop: 3}}/>
		{dangerLabels}
		<Label text='靶器官受损' style={{marginTop: 3}}/>
		{damageLabels}
	    <View style={{flexDirection:'row', width:260,marginTop: 3}}>
		  <View style={{flex: 1,alignItems: 'center'}}>
		  <Button title='确定' onPress={()=>{this.props.submit(this.state)}} />
		  </View>
		  <View style={{flex:1, alignItems: 'center'}}>
		  <Button title='取消' onPress={this.props.cancel} />
		  </View>
		</View>
	  </View>
	)
  }
}

class Assessment extends React.Component {
  constructor(props){
	super(props)
  }
  
  render(){
	let pressureLabel = <Label 
	                  style={{color: '#87CEFA'}}
					  text={'收缩压：'+this.props.data.pressure.sp+'mmHg，舒张压：'+this.props.data.pressure.dp+'mmHg，评估为高血压'+this.props.data.pressure.level+'级'}
					  size='sm' />
	let dangerLabels = (this.props.data.danger==[])?
	                   <Label style={{color: '#87CEFA'}} text='无' size='sm' />:
					   this.props.data.danger.map((item, index)=>(
					     <Label style={{color: '#87CEFA'}} text={item} size='sm' />
					   ))
    let damageLabels = (this.props.data.damage==[])?
	                   <Label style={{color: '#87CEFA'}} text='无' size='sm' />:
					   this.props.data.damage.map((item, index)=>(
					     <Label style={{color: '#87CEFA'}} text={item} size='sm' />
					   ))
	let levelLabel = <Label style={{color: '#4169E1'}} size='lg' text={'高血压风险等级为：'+this.props.data.level}/>
	return(
	  <View style={{alignItems: 'center'}}>
		<DelayedFadeInView delay={0}>
		<Label style={{color: '#4169E1'}} size='lg' text='高血压风险等级评估' />
		</DelayedFadeInView>
	  
		<View style={{height:15}}></View>
	  
		<DelayedFadeInView delay={3000}>
		<Label style={{color: '#00BFFF'}} size='md' text='高血压分级'/>
		{pressureLabel}
		</DelayedFadeInView>
		
		<View style={{height:10}}></View>
	  
		<DelayedFadeInView delay={6000}>
		<Label style={{color: '#00BFFF'}} size='md' text='高血压危险因素'/>
		{dangerLabels}
		</DelayedFadeInView>
	  
		<View style={{height:10}}></View>
	  
		<DelayedFadeInView delay={9000}>
		<Label style={{color: '#00BFFF'}} size='md' text='靶器官受损'/>
		{damageLabels}
		</DelayedFadeInView>
	  
		<View style={{height:15}}></View>
	  
		<DelayedFadeInView delay={12000}>
		{levelLabel}
		<Label style={{color: '#87CEFA'}} size='sm' text='本评估仅供参考，一切以医生建议为准'/>
		</DelayedFadeInView>
	  
		<View style={{height:20}}></View>
	  
		<Label style={{color:'#A9A9A9'}} size='sm' text='点击别处退出' />
	  </View>
	)
  }
}

class AutoInput extends React.Component {
  constructor(props) {
    super(props);
    this.onContentSizeChange = this.onContentSizeChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      height: 0,
    };
  }

  onContentSizeChange(event) {
    let height = event.nativeEvent.contentSize.height;
    this.changeHeight(height);
  }

  onChange(event) {
    if (Platform.OS === 'android') {
      let height = event.nativeEvent.contentSize.height;
      this.changeHeight(height);
    }
  }

  changeHeight(height) {
    let {
      minHeight = 16,
      maxHeight,
    } = this.props;
    if (height < minHeight) {
      height = minHeight;
    } else if (maxHeight && height > maxHeight) {
      height = maxHeight;
    }
    if (height !== this.state.height) {
      this.setState({height: height});
    }
  }

  render() {
    return (
      <Input
        {...this.props}
        multiline
        onContentSizeChange={this.onContentSizeChange}
        onChange={this.onChange}
        style={[this.props.style, {height: this.state.height}]}
      />
    )
  }
}

export default class Helper extends React.Component{
  constructor(props){
	super(props)
	this.state={
	  text: '点击下方按钮，让高血压助手给您提供帮助',
	  submit: false,
	}
  }
  
  data = {
    pressure:{
	  dp: 0, //收缩压
	  sp: 0, //舒张压
	  level: 0, //等级
	},
	danger:[
	],
	damage:[
	],
	level: '',
	suggestion: '',
  }
  
  changeSuggestion(){
	this.setState({
	  text: this.data.suggestion
	})
  }
  
  lastSuggestion(){
	_this = this
	global.storage.load({
	  key: 'suggestion',
	  autoSync:false,
	}).then(ret => {
	  _this.setState({
		text: ret.suggestion
	  })
	}).catch((error)=>{
	  Toast.fail('您从未进行过测试')
	})
  }
  
  labels={
	danger:[
	  '家人有高血压病史',
	  '吸烟喝酒',
	  '精神紧张，容易激动',
	  '患有高胆固醇症：总胆固醇>5.72mmol/L(220mg/dl)',
	  '患有糖尿病：空腹血糖测定≥7.0mmol/L',
	  '每日摄盐大于6g'
	],
	damage:[
	  ["心脏损害:左心室肥厚、左心室","收缩和舒张功能异常等"],
	  ["脑损害:短暂性脑缺血发作、","脑出血等"],
	  ["视网膜损害:出血、渗出","或视盘水肿等"],
	  ["肾损害:微量白蛋白尿和蛋白尿","、慢性肾脏疾病等"],
	  ["血管损害:内皮功能异常、颈动","脉内膜增厚等"],
	],
	dangerSuggestion:[
	  '',
	  '减少戒除吸烟喝酒',
	  '平时注意保持心情舒畅，遇事冷静处理，按时休息,必要的时候要寻求心理医生的帮助,参加心理咨询',
	  '多喝水，少吃油腻的食物，饮食宜清淡易消化为主，必要情况下可服用他汀类药物(以医生处方为准)，如阿托伐他汀、辛伐他汀等降低血脂',
	  '避免进食糖及含糖食物，适量进食高纤维及淀粉质食物，进食要少食多餐。必要情况下，使用正规的药物(以医生处方为准)如二甲双胍或者胰岛素等控制血糖含量',
	  '控制摄盐量(包括酱油和其他食物中的食盐量)每日小于6g，烹调宜选用低钠盐'
	],
	dangerMeasure:[
	  '不吸烟，不喝酒',
	  '按时休息，不熬夜',
	  '饮食清淡，不吃油腻的食物',
	  '不吃糖及含糖食物',
	  '摄盐量小于6g'
	],
  }
  
  submit(data){
	this.overlayView1.close()
	
	suggestion=''
	danger=[]
	damage=[]
	messure=[]
	data.danger.map((item,key)=>{
	  if(item){
		danger.push(this.labels.danger[key])
		messure.push(this.labels.dangerMeasure[key])
		if(this.labels.dangerSuggestion[key]!=''){
		  suggestion+=this.labels.dangerSuggestion[key]
		  suggestion+=';'
		}
	  }
	})
	data.damage.map((item,key)=>{
	  if(item){
		damage.push(this.labels.damage[key])
	  }
	})
	
	if (data.height==0){
	  this.setState({submit: false})
	  return
	}else{
	  BMI=Math.round(data.weight*10/(data.height*data.height/10000))/10
	  if(BMI>25){
		danger.push("BMI指数为"+BMI+"，超重，肥胖")
		messure.push('运动30分钟')
		suggestion+='每天坚持运动30分钟；'
	  }
	  if(data.isboy&&(data.age>55)){
		danger.push("为男性，年龄超过55岁")
	  }
	  if((!data.isboy)&&(data.age>65)){
		danger.push("为女性，年龄超过65岁")
	  }
	}
	_this = this;
	data3=[];data2=[];data1=[];data0=[];
	global.storage.load({
	  key: 'data',
	  autoSync: false,
	}).then(ret => {
	  data=ret.data
	  data.map((item, i)=>{
		sp = parseInt(item.sp)
		dp = parseInt(item.dp)
		if(sp>=180||dp>=110){
		  data3.push(item)
		}else if(sp>=160||dp>=100){
		  data2.push(item)
		}else if(sp>=140||dp>=90){
		  data1.push(item)
		}else{
		  data0.push(item)
		}
	  })
	}).then(()=>{
	  if(data3.length>=3){
	    this.data.pressure={
		  sp: data3[0].sp,
		  dp: data3[0].dp,
		  level: 3,
	    }
	  }else if(data2.length>=3){
	    this.data.pressure={
		  sp: data2[0].sp,
		  dp: data2[0].dp,
		  level: 2,
	    }
	  }else if(data1.length>=3){
	    this.data.pressure={
		  sp: data1[0].sp,
		  dp: data1[0].dp,
		  level: 1,
	    }
	  }else{
		this.data.pressure={
		  sp: data0[0].sp,
		  dp: data0[0].dp,
		  level: 0,
		}
	  }
	  //console.log(this.data)
	  if(this.data.pressure.level==0){
		this.data.level='无高血压'
		if(suggestion==''){
		  this.data.suggestion='无高血压风险'
		}else{
		  this.data.suggestion='无高血压风险，但需要注意'+suggestion
		}
	  }else if((this.data.pressure.level==1)&&(danger.length==0)&&(damage.length==0)){
		this.data.level='低危层'
		this.data.suggestion='低高血压风险，无需吃降压药，调整自己的生活方式或简单采取一些非药物治疗的方法，保持健康心态；'+suggestion
		messure.push('测量血压')
	  }else if((this.data.pressure.level<3)&&(danger.length<3)&&(damage.length==0)){
		this.data.level='中危层'
		this.data.suggestion='中高血压风险，试行严格按健康生活方式的要求生活4周，若血压降至正常就继续保持关注；如血压无变化或仍不能恢复正常，可以考虑适当加用少量基础降压药，尽快使血压平稳地控制在正常范围内；'+suggestion
		messure.push('测量血压')
	  }else if((this.data.pressure.level>2)&&((danger.length>0)|(damage.length)>0)){
		this.data.level='很高危层'
		this.data.suggestion='很高高血压风险，除了立即对各种危险因素加以纠正，使用有效的降压药物强化治疗，使血压尽量降至正常或接近正常水平外，还必须努力治疗有关的并发症，保护脏器功能；'+suggestion
		messure.push('测量血压')
	  }else {
		this.data.level='高危层'
		this.data.suggestion='高高血压风险，必须立即开始规范地使用降压药物，力争将血压有效地控制在正常水平，辅以严格的非药物治疗，争取延长寿命和提高生活质量；'+suggestion
		messure.push('测量血压')
	  }
	  //console.log(this.data.level)
	  global.storage.save({
		key: 'messure',
		data: {
		  messure: messure,
		  date: new Date()
		}
	  })
	  
	  this.data.danger=danger
	  this.data.damage=damage
	  this.setState({submit: true})
	})
  }
  
  cancel(){
	this.overlayView1.close()
	this.setState({submit: false})
  }
  
  viewResults(overlayView){
	Overlay.show(overlayView)
	this.changeSuggestion()
	global.storage.save({
	  key: 'suggestion',
	  data: {
		suggestion: this.data.suggestion
	  }
	})
  }
  
  viewResults = this.viewResults.bind(this)
  
  render(){
	overlayView1 = (
	  <Overlay.PopView
		style={{alignItems: 'center', justifyContent: 'center'}}
		modal={false}
		overlayOpacity={0}
		ref={v => this.overlayView1 = v}
		animated={true}
		>
		<View style={{backgroundColor: '#F5F5F5', padding: 40, borderRadius: 15, alignItems: 'center'}}>
	      
		  <Question submit={this.submit.bind(this)} cancel={this.cancel.bind(this)} />
		</View>
	  </Overlay.PopView>
	)
	overlayView2 = (
	  <Overlay.PopView
		style={{alignItems: 'center', justifyContent: 'center'}}
		modal={false}
		overlayOpacity={0}
		ref={v => this.overlayView2 = v}
		animated={true}
		>
		<View style={{backgroundColor: '#F5F5F5', padding: 40, borderRadius: 15, alignItems: 'center'}}>
	      
		  <Assessment data={this.data} />
		</View>
	  </Overlay.PopView>
	)
	return (
	  <View>
	    <View style={{width:300, marginTop:10, flexDirection: 'row'}}>
		  <View style={{flex: 1,alignItems: 'flex-start'}}>
	        <Text>高血压助手建议：</Text>
		  </View>
		  <View style={{flex:1,alignItems: 'flex-end', justifyContent:'center'}}>
	        <Text onPress={this.lastSuggestion.bind(this)} style={{fontSize:11, color: '#FF8888'}}>查看上次结果</Text>
		  </View>
		</View>
		<AutoInput
		  style={styles.input}
		  value={this.state.text}
		  size='md'
		  editable={false}
		  minHeight={30}
		  maxHeight={500}
		  fontSize={12}
		/>
		<View style={{alignItems:"center"}}>
		  <View style={{height:10}}/>
		  <Btn
		    backgroundColor='#4285f4'
			foregroundColor='#ffffff'
			label='开始分析'
			noRadius
			onPress={()=>{Overlay.show(overlayView1)}}
			static
	      />
		  <Btn
		    disabled={!this.state.submit}
			label='查看结果'
			noRadius
			static
			onPress={()=>this.viewResults(overlayView2)}
		  />
		</View>
	  </View>
	)
  }
}