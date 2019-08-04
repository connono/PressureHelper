import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Overlay, Button, Label } from 'teaset'
import { GiftedChat } from 'react-native-gifted-chat'
import JMessage from 'jmessage-react-plugin'

var listener = (message)=>{
  alert(JSON.stringify(message))
}

const styles = StyleSheet.create({
  overlay:{
	alignItems:'center',
	justifyContent: 'center'
  }
})

export default class Chat extends React.Component { 
  constructor(props){
	super(props)
  }

  state = {
    messages: [],
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: '你好呀',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  }

  componentDidMount(){
	JMessage.login({
      username: "13586199228",
      password: "13586199228"
    },() => {/*登录成功回调*/},(error) => {/*登录失败回调*/alert(error)})
	JMessage.addReceiveMessageListener(listener)
  }
  
  componentWillUnmount(){
	JMessage.removeReceiveMessageListener(listener)
	JMessage.logout()
  }
  
  onSend(messages = []) {
	JMessage.createSendMessage({type:'single', username:'13586199228',messageType:'text', text:'Hello World'},(message)=>{
	  JMessage.sendMessage({id: message.id, type: 'single', username: '13586199228'},()=>{},(error)=>{alert(JSON.stringify(error))})
	})
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
	
  }

  formateDate(date){
	year = date.getFullYear();
	month = date.getMonth();
	date = date.getDate();
	return year+"年"+month+"月"+date+"日";
  }

  formateTime(date){
	hour = date.getHours();
	minute = date.getMinutes();
	return hour+":"+minute;
  }

  renderDay(){
	messageTime = this.state.messages[0].createdAt
	date = this.formateDate(messageTime);
	return (<View style={{alignItems:"center"}}>
			  <Text>{date}</Text>
		    </View>)
  }

  renderTime(){
	  messageTime = this.state.messages[0].createdAt
	  time = this.formateTime(messageTime);
	  return (<View style={{height:12}}>
				<Text style={{fontSize:11}}>{"     "+time+"     "}</Text>
			  </View>)
  }
  

  
  render(){
	return (
	  <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
		  renderTime={this.renderTime.bind(this)}
		  renderDay={this.renderDay.bind(this)}
		  onPressAvatar={this.props.toggle}
		  placeholder="在这里输入文本"
        />
	)
  }
}

