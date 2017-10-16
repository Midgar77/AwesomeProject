import React, { Component } from 'react';
import { AppRegistry, View, TextInput, Text } from 'react-native';

export default class UselessTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Anthony', isBryan: false};
  }

  render() {
    let displayText = null;
    let extraText = null;
      if(this.state.text.includes("Bryan")){
        displayText = "hate"
        extraText = ". That dude is lame lol JK GG NO RE"
      } else {
        displayText = "love"
        extraText = "."
      }

    return (
      <View>
      <TextInput
        style={{height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginTop: 200, marginLeft: 30}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
      
      <Text>{"I " + displayText + " " + this.state.text + extraText}</Text>
      </View>
    );
  }
}
