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
import CommonStyles from '../components/Styles'
import Pending from './Pending'

class RemoveIngredient extends Component {
  onPressRemove() {
    this.props.remove(this.props.text)
  }

  render() {
    return (
      <View style={styles.cell}>
        <Text style={styles.left}>{this.props.text}</Text>
        <TouchableHighlight onPress={this.onPressRemove.bind(this)}>
          <Text style={styles.right}>-</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

class AddIngredient extends Component {
  constructor() {
    super();
    this.state = {text: ''};
  }

  onPressAdd() {
    this.props.add(this.state.text)
  }

  render() {
    return (
      <View style={styles.lastCell}>
        <TextInput
          style={styles.left}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <TouchableHighlight onPress={this.onPressAdd.bind(this)}>
          <Text style={styles.right} on>+</Text>
        </TouchableHighlight>
      </View>
    );
  }
}


class IngredientSelection extends Component {
  constructor() {
    super();
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      ingredients: [],
      dataSource: ds.cloneWithRows([''])
    };
  }

  routeToPending() {
    this.props.navigator.push({
      name: 'Pending',
      component: Pending,
      title: 'Match not found yet.'
    })
  }

  add(ingredientName) {
    var newIngredients = this.state.ingredients.concat([ingredientName]);
    this.setState({
      ingredients: newIngredients,
      dataSource: this.state.dataSource.cloneWithRows(newIngredients.concat(['']))
    });
  }

  remove(ingredientName) {
    var index = this.state.ingredients.indexOf(ingredientName);
    var newIngredients = this.state.ingredients;
    newIngredients.splice(index, 1);
    this.setState({
      ingredients: newIngredients,
      dataSource: this.state.dataSource.cloneWithRows(newIngredients.concat(['']))
    });
  }

  render() {
    return (
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData, sectionID, rowID) => {
            if(parseInt(rowID) + 1 === this.state.dataSource.getRowCount()) {
              return <AddIngredient add={this.add.bind(this)}/>
            } else {
              return <RemoveIngredient text={rowData} remove={this.remove.bind(this)}/>
            }
          }}
          style={styles.list}
          scrollEnabled={false}
        />
        <View style={styles.button}>
          <TouchableHighlight style={styles.buttonPending}
            onPress={this.routeToPending.bind(this)}>
            <Text style={[CommonStyles.text, styles.go]}>Match me!</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

export default class Filter extends Component {
  render() {
    return (
      <View>
        <IngredientSelection navigator={this.props.navigator}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderColor: 'grey',
    shadowOffset: {width: 0, height: 0},
    shadowColor: 'grey',
    padding: 10
  },
  cell: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#999'
  },
  lastCell: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 50
  },
  left: {
    flex: 0.8
  },
  right: {
    textAlign: 'right',
    flex: 0.2
  },
  buttonPending: {
    top: 320,
    backgroundColor: '#6C56B7',
    borderRadius: 50,
    padding: 16,
    width: 150,
    marginHorizontal: 100
  },
  go: {
    fontSize: 18,
    textAlign: 'center'
  }
});
