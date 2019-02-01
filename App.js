/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import Home from './src/components/Home';
import Chat from './src/components/Chat';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Router, Scene} from 'react-native-router-flux';


class App extends React.Component {
  render(){
    return(
      <Router>
      <Scene key='root'>
      <Scene key= 'home' component={Home} title='Home'/>
      <Scene key= 'chat' component={Chat} title='Chat'/>
      </Scene>
      </Router>
    )
  }
}

export default App
