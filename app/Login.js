import React, { Component } from 'react';
import axios from 'axios'
import {
    TouchableOpacity,
    StyleSheet,
    TextInput,
    View,
    Alert,
	Text,
	Card,
	Dimensions,
	ScorllView
} from 'react-native';
import { Avatar, Text as EText, Input } from 'react-native-elements'
import Btn from 'react-native-micro-animated-button'
import { Toast } from 'teaset'

width = Dimensions.get('window').width
height = Dimensions.get('window').height

const PHONE_REGEX =  /^1[3456789]\d{9}$/


export default class Login extends Component {
	constructor(props){
	  super(props)
	}
	
	state={
	  user:{
		name:'',
		password:''
	  },
	  
	}
	
	onNameChanged=(newName)=>{
		user=this.state.user
		user.name=newName
		this.setState({user})
	}
	
	onPasswordChanged = (newPassword)=>{
		user=this.state.user
		user.password=newPassword
		this.setState({user})
	}
	
	login(){
	  const _this = this
	  formData = new FormData()
	  formData.append("username",this.state.user.name)
	  formData.append("password",this.state.user.password)
	  axios.post('http://47.103.115.199/api/authorizations', formData)
	    .then(function(response){
		  global.storage.save({
			key: 'loginState',
			data: {
			  access_token: response.data.access_token,
			  token_type: response.data.token_type,
			},
			expires: 1000*response.data.expires_in
		  })
		  global.storage.load({
			key: 'firstlogin',
			autoSync:false,
		  }).then(ret => {
			if(ret.state){
			  _this.props.toIntroduction()
			  Toast.smile('欢迎回来')
			  global.storage.save({
				key: 'firstlogin',
				data: {
				  state: false
				}
			  })
			}else{
			  _this.props.toPageControl()
			  Toast.smile('欢迎回来')
			}
		  }).catch(err=>{
			_this.props.toPageControl()
			Toast.smile('欢迎回来')
		  })
		})
		.catch(function(error){
		  Toast.fail('用户名和密码不匹配，请重新输入')
		  _this.b1.reset()
		})
	}
	
    render() {
		disabled=((this.state.user.name=='')|(this.state.user.password==''))?true:false
        return (
            <View style={{alignItems: 'center',justifyContent:'center',backgroundColor:'white',width: width,height:height}}>
			  <Avatar size='xlarge' rounded source={require('./img/title.jpg')} />
			  <View style={{height: 10}}></View>
			  <EText h3>高血压助手</EText>
			  <View style={{height: 10}}></View>
				<TextInput
				  style={styles.textInput}
				  placeholder='手机号码'
				  onChangeText={this.onNameChanged}
				  inlineImageLeft='user'
				  inlineImagePadding={6}
				/>
			    <TextInput
				  style={styles.textInput}
				  placeholder='密码'
				  secureTextEntry={true}
				  onChangeText={this.onPasswordChanged}
				  inlineImageLeft='lock'
				  inlineImagePadding={6}
				/>
			  <Btn
			    disabled={disabled}
			    foregroundColor='#0f9d58'
				label='登陆'
				onPress={()=>{this.login()}}
				ref={ref=>(this.b1 = ref)}
				shakeOnError
			  />
			  <Text onPress={()=>{this.props.toRegister()}}>还没有账号？点此创建用户</Text>
			</View>
        );
    }
}

const styles = StyleSheet.create({
	textInput: {
		fontSize: 16,
		height: 40,
		width: 240,
		borderWidth: 1,
		borderColor: '#bfbfbf',
		borderRadius: 50,
		marginTop: 5,
		marginBottom: 5
	},
});