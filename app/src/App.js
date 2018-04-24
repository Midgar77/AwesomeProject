import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View, TextInput, Button, ScrollView } from 'react-native';
import axios from 'axios';
import {observer} from 'mobx-react/native';
import ListStore from '../mobx/listStore';

@observer
export default class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      store: ListStore,
      addMovieTitle: "Title",
      addMovieYear: "Year"
    }
  }

  retrieveMovies() {
    axios.get('https://facebook.github.io/react-native/movies.json')
      .then((response) => {
        const movies = response.data.movies;
        console.log(movies);
        movies.forEach((movie) => {
          this.state.store.addItem(movie);
        });
        
        this.setState({
          isLoading: false,
        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  componentDidMount() {
    this.retrieveMovies();
  }

  onAddMovie = () => {
    const newMovie = {
      'title': this.state.addMovieTitle,
      'releaseYear': this.state.addMovieYear
    };
    this.state.store.addItem(newMovie);
    this.setState({
      addMovieTitle: "Title",
      addMovieYear: "Year",
      store: ListStore
    });
  }

  render() {
    console.log(this.state.isLoading);
    console.log(this.state.store.movies);
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator/>
        </View>
      );
    }

    return (
      <View style={{flex: 1, paddingTop: 20}}>
        <View style={{width: 300, height: 200, backgroundColor: 'powderblue'}}>
          <ScrollView>
            <FlatList
              data={this.state.store.movies}
              renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
              keyExtractor={(item, index) => index}
              extraData={this.state}
            />
          </ScrollView>
        </View>
        <View style={{width: 300, height: 80}}>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({addMovieTitle: text})}
            value={this.state.addMovieTitle}
          />
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({addMovieYear: text})}
            value={this.state.addMovieYear}
          />
        </View>
        <Button
          onPress={this.onAddMovie}
          title="Add movie"
          color="#841584"
          accessibilityLabel="Add movie to movie list"
        />
      </View>
    );
  }
}