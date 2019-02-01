import React from 'react'
import {GiftedChat} from 'react-native-gifted-chat'
import Backend from '../Backend'

import {View, Text} from 'react-native'

class Chat extends React.Component {
  state={
    messages:[]
  }
  componentDidMount(){
    Backend.loadMessages((message)=>{
      this.setState((prevState) => {
        return {
          messages: GiftedChat.append(prevState.messages, message),
        };
      })
    })
  }
  render(){
    console.log(this.props);
    return(
      <GiftedChat
        messages={this.state.messages}
        onSend={(message) => {
          Backend.sendMessage(message);
        }}
        user={{
          _id: Backend.getUid(),
          person: this.props.person
        }}
      />
    )
  }
  componentWillUnmount(){
    Backend.closeChat()
  }
}


export default Chat
