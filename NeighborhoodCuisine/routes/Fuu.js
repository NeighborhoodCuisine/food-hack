import React, {
  Component,
  View,
  ListView,
  ScrollView,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput
} from 'react-native'

class RecipeText extends Component {
  render() {
    return (
        <Text style={styles.recipeText}>Something to cook</Text>
    );
  }
}

class NeighboursText extends Component {
  render() {
    return (
        <Text style={styles.neighboursText}>Neighbours to cook with</Text>
    );
  }
}

class MatchBox extends Component {

  render() {
    return (
      <View style={styles.matchBox}>
        <RecipeText/>
        <RecipeText/>
        <NeighboursText/>
        <NeighboursText/>
      </View>
    )
  }
}

export default class Fuu extends Component {
  render() {
    return (
      <View>
        <MatchBox />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  matchBox: {
    backgroundColor: '#fff',
    height: 400,
    marginHorizontal: 20,
    padding: 10
  },
  neighboursText: {
    color: '#555',
    fontSize: 20
  },
  recipeText: {
    color: '#555',
    fontSize: 20
  }
});
