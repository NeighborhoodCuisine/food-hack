import React, {
  Component,
  View,
  ListView,
  ScrollView,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  Image
} from 'react-native'
var Icon = require('react-native-vector-icons/FontAwesome');

class RemoveIngredient extends Component {
  onPressRemove() {
    this.props.remove(this.props.text)
  }

  render() {
    return (
      <View style={styles.cell}>
        <Text style={styles.left}>{this.props.text}</Text>
        <TouchableHighlight onPress={this.onPressRemove.bind(this)} underlayColor='white'>
          <Icon name='minus-circle' size={25} color='#B82234' style={styles.right}/>
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
    if (this.state.text) {
      this.props.add(this.state.text);
    }
  }

  render() {
    return (
      <View style={styles.lastCell}>
        <TextInput
          style={styles.left}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <TouchableHighlight onPress={this.onPressAdd.bind(this)} underlayColor='white'>
          <Icon name='plus-circle' size={25} color='#68A026' style={styles.right}/>
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
    )
  }
}

export default class Filter extends Component {
  render() {
    return (
      <View>
        <IngredientSelection />
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
    flex: 0.2
  }
});
