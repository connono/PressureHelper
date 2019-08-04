import React, { Component } from 'react'
import axios from 'axios'
import {
    TouchableOpacity,
    StyleSheet,
    TextInput,
    View,
    Text,
    Alert,
	Image,
	Dimensions
} from 'react-native';
import { Text as EText, Avatar, ListItem, Checkbox, } from 'react-native-elements'
import { Toast } from 'teaset'
import Btn from 'react-native-micro-animated-button'

width = Dimensions.get('window').width
height = Dimensions.get('window').height

const PHONE_REGEX =  /^1[3456789]\d{9}$/

export default class Register extends Component {
    constructor(props){
	  super(props)
	}
	
	state={
	  user:{
		username: '',
		password: '',
		repassword: '',
		captcha_code: ''
	  },
	  captcha:{
		captcha_key: '',
		captcha_image_content: '',
	  },
	  checked: false
	}
	
	componentDidMount(){
	  this.setCaptcha()
	}
	
	setCaptcha(){
	  const _this = this;
	  axios.get('http://47.103.115.199/api/captchas')
	  .then(function(response){
		_this.setState({
		  captcha:{
			captcha_key: response.data.captcha_key,
			captcha_image_content: response.data.captcha_image_content
		  }
	   })
	  })
	  .catch(function(error){alert(error)})
	}
	
	register(){
		const _this = this
		formData = new FormData()
		formData.append("name",this.state.user.username)
		formData.append("password",this.state.user.password)
		formData.append("captcha_key",this.state.captcha.captcha_key)
		formData.append("captcha_code",this.state.user.captcha_code)
		axios.post('http://47.103.115.199/api/users',formData)
		  .then(function(response){
			  global.storage.save({
				key: 'firstlogin',
				data: {
				  state: true
				}
			  })
			  _this.props.toLogin()
			  Toast.smile('注册成功')
		  })
		  .catch(function(error){
			  Toast.fail('注册失败')
			  _this.b1.reset()
		  })
	}
	
	onUsernameChanged=(newUsername)=>{
		user=this.state.user
		user.username=newUsername
		this.setState({
		  user
		})
	}
	

	onPasswordChanged = (newPassword)=>{
		user=this.state.user
		user.password=newPassword
		this.setState({
			user
		})
	}
	
	onRePasswordChanged = (newRePassword)=>{
	    user=this.state.user
		user.repassword=newRePassword
		this.setState({
		    user
		})
	}
	
	onCaptchaCodeChanged = (newCaptchaCode)=>{
		user=this.state.user
		user.captcha_code=newCaptchaCode
		this.setState({
			user
		})
	}
	
	render() {
		disabled=(((this.state.user.name=='')|(this.state.user.password=='')|(this.state.user.repassword=='')|(this.state.user.captcha_code==''))?true:false)
		nameVaild=PHONE_REGEX.test(this.state.user.name)
        return (
		  <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor:'white', width: width,height:height}}>
		    <Avatar size='xlarge' rounded source={require('./img/title.jpg')} />
			<View style={{height: 10}}></View>
			<EText h3>高血压助手</EText>
			
			<View style={{height: 10}}></View>
			
			    <TextInput
				  inlineImageLeft='user'
				  inlineImagePadding={6}
				  style={styles.textInput}
				  placeholder='手机号码'
				  onChangeText={this.onUsernameChanged}
				/>
			    <TextInput
				  inlineImageLeft='lock'
				  inlineImagePadding={6}
				  style={styles.textInput}
				  placeholder='密码'
				  secureTextEntry={true}
				  onChangeText={this.onPasswordChanged}
				/>
			    <TextInput
				  inlineImageLeft='lock'
				  inlineImagePadding={6}
				  style={styles.textInput}
				  placeholder='确认密码'
				  secureTextEntry={true}
				  onChangeText={this.onRePasswordChanged}
				/>
				<View style={{flexDirection: 'row'}}>
			      <TextInput
				    inlineImageLeft='insurance'
					inlineImagePadding={6}
				    style={styles.textInputCaptcha}
				    placeholder='验证码'
				    onChangeText={this.onCaptchaCodeChanged}
				  />
				  <View style={{width: 110}}>
				    <Avatar
				    containerStyle={{width: 110}}
				    onPress={this.setCaptcha.bind(this)}
				    source={{uri:this.state.captcha.captcha_image_content}}
				  />
				  </View>
				</View>
			  <Btn
			    disabled={disabled}
			    foregroundColor='#0f9d58'
				label='注册'
				onPress={()=>{this.register()}}
				ref={ref=>(this.b1 = ref)}
				shakeOnError
			  />
			  <Text onPress={()=>{this.props.toLogin()}}>已有账号？</Text>
		   </View>
		)
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
	textInputCaptcha: {
		fontSize:16,
		width: 132,
		height: 40,
		borderWidth: 1,
		borderColor: '#bfbfbf',
		borderRadius: 50,
	}
});