import React from 'react'
import {GiftedChat} from 'react-native-gifted-chat'
import { ChatManager, TokenProvider } from '@pusher/chatkit-client'
import {View, Text} from 'react-native'

    const CHATKIT_TOKEN_PROVIDER_ENDPOINT = 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/bd2b8c27-a370-4821-99b6-44bee102aa6b/token';
    const CHATKIT_INSTANCE_LOCATOR = 'v1:us1:bd2b8c27-a370-4821-99b6-44bee102aa6b';
    const CHATKIT_ROOM_ID = 'ROOM_ID';
    const CHATKIT_USER_NAME = 'pusher-test-user'

class Chat extends React.Component {
  state={
    messages:[]
  }
  componentDidMount() {
    const tokenProvider = new TokenProvider({
      url: CHATKIT_TOKEN_PROVIDER_ENDPOINT,
    });

    const chatManager = new ChatManager({
      instanceLocator: CHATKIT_INSTANCE_LOCATOR,
      userId: CHATKIT_USER_NAME,
      tokenProvider: tokenProvider,
    });

    chatManager
      .connect()
      .then(currentUser => {
        this.currentUser = currentUser;
        this.currentUser.subscribeToRoom({
          roomId: CHATKIT_ROOM_ID,
          hooks: {
            onMessage: this.onReceive,
          },
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  onReceive = data => {
    const { id, senderId, text, createdAt } = data;
    const incomingMessage = {
      _id: id,
      text: text,
      createdAt: new Date(createdAt),
      user: {
        _id: senderId,
        name: senderId,
        avatar:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmXGGuS_PrRhQt73sGzdZvnkQrPXvtA-9cjcPxJLhLo8rW-sVA',
      },
    };

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, incomingMessage),
    }));
  };

  handleSend = (messages=[]) => {
     messages.forEach(message => {
       this.currentUser
         .sendMessage({
           text: message.text,
           roomId: CHATKIT_ROOM_ID,
         })
         .then(() => {})
         .catch(err => {
           console.log(err)
         })
     })
   }

  render(){
    console.log(this.onReceive);
    return(
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.handleSend(messages)}
        user={{
          _id: CHATKIT_USER_NAME,
        }}
      />
    )
  }
}


export default Chat
