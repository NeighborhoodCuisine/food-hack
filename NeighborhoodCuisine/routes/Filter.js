import React, {
  Component,
  View
} from 'react-native'

import IngredientSelection from '../components/IngredientSelection'
import HostSelection from '../components/HostSelection'


export default class Filter extends Component {
  render() {
    return (
      <View>
        <IngredientSelection style={cardStyle}/>
        <HostSelection style={cardStyle}/>  
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

