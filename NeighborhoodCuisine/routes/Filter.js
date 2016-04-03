import React, {
  Component,
  View
} from 'react-native'

import IngredientSelection from '../components/IngredientSelection'
import HostSelection from '../components/HostSelection'
import MatchButton from '../components/MatchButton'
import Pending from './Pending'


export default class Filter extends Component {
  routeToPending() {
    this.props.navigator.push({
      name: 'Pending',
      component: Pending,
      title: "Don't worry, someone's always hungry"
    });
  }

  render() {
    return (
      <View>
        <IngredientSelection style={cardStyle}/>
        <HostSelection style={cardStyle}/>  
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

