import React, {
  Component,
  View
} from 'react-native'

import IngredientSelection from '../components/IngredientSelection'
import HostSelection from '../components/HostSelection'
import MatchButton from '../components/MatchButton'
import Pending from './Pending'
import Store from '../lib/Store'
import { ENDPOINT } from '../lib/Endpoint'

export default class Filter extends Component {
  constructor() {
    super();
    this.state = {
      ingredients: [],
      max_guests: 0
    }
  }

  putSession() {
    fetch(ENDPOINT + '/session', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        max_guests: this.state.guests,
        ingredients: this.state.ingredients
      })
    });

    console.log(this.state);
  }

  routeToPending() {
    fetch(ENDPOINT + '/session', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...this.state,
        id: Store.get('login').id
      })
    });

    this.props.navigator.push({
      name: 'Pending',
      component: Pending,
      title: "Don't worry, someone's always hungry"
    });
  }

  updateIngredients(ingredients) {
    this.setState({
      ingredients: ingredients
    })
  }

  updateGuests(number) {
    this.setState({
      max_guests: number
    })
  }

  render() {
    return (
      <View>
        <IngredientSelection style={cardStyle} update={this.updateIngredients.bind(this)}/>
        <HostSelection style={cardStyle} update={this.updateGuests.bind(this)}/>
        <MatchButton onPress={this.routeToPending.bind(this)}/>
      </View>
    )
  }
}

const cardStyle = {
  backgroundColor: 'white',
  marginHorizontal: 15,
  borderColor: 'grey',
  shadowOffset: {width: 0, height: 0},
  shadowColor: 'grey',
  padding: 10,
  borderRadius: 4,
  marginBottom: 15
};
