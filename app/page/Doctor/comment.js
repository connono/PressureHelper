/**
 * @providesModule Comment
 */

import React from 'react'
import { Modal } from 'react-native'
import CommentNavbar from './commentNavbar'
import Chat from './chat'

export default class Comment extends React.Component {
  constructor(props){
	super(props)
  }

  render(){
    return (
      <Modal>
	    <CommentNavbar toggle={this.props.toggle}/>
		<Chat toggle={this.props.toggle} />
	  </Modal>
    )
  }
}