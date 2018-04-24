import {observable} from 'mobx'

class ObservableListStore {
  @observable movies = []

  addItem(item) {
    this.movies.push(item);
  }
}


const observableListStore = new ObservableListStore()
export default observableListStore 