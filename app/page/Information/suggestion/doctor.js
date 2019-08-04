import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Input } from 'teaset'

const styles = StyleSheet.create({
  input:{
	width: 300,
	textAlign: 'center',
	marginTop:10
  },
  text:{
	marginTop: 10
  }
})

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

export default class Doctor extends React.Component {
  constructor(){
	super()
	this.state={text: '很高高血压风险，除了立即对各种危险因素加以纠正，使用有效的降压药物强化治疗，使血压尽量降至正常或接近正常水平外，还必须努力治疗有关的并发症，保护脏器功能；'}
  }
  
  render(){
	return(
	  <View>
	    <Text style={styles.text}>医生建议：</Text>
	    <AutoInput
	      style={styles.input}
		  size='md'
		  value={this.state.text}
		  editable={false}
		  multiline={true}
		  minHeight={30}
		  maxHeight={500}
		  fontSize={12}
	    />
	  </View>
	)
  }
}