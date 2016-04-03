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

let Icon = require('react-native-vector-icons/FontAwesome');

export default class IngredientSelection extends Component {
  constructor() {
    super();
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      ingredients: [],
      dataSource: ds.cloneWithRows([''])
    };
  }

  add(ingredientName) {
    let newIngredients = this.state.ingredients.concat([ingredientName]);
    this.setState({
      ingredients: newIngredients,
      dataSource: this.state.dataSource.cloneWithRows(newIngredients.concat(['']))
    });
    this.props.update(newIngredients);
  }

  remove(ingredientName) {
    let index = this.state.ingredients.indexOf(ingredientName);
    let newIngredients = this.state.ingredients;
    newIngredients.splice(index, 1);
    this.setState({
      ingredients: newIngredients,
      dataSource: this.state.dataSource.cloneWithRows(newIngredients.concat(['']))
    });
    this.props.update(newIngredients);
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderHeader={() => {
          return <Text style={styles.header}>Which ingredients do you have?</Text>
        }}
        renderRow={(rowData, sectionID, rowID) => {
          if(parseInt(rowID) + 1 === this.state.dataSource.getRowCount()) {
            return <AddIngredient add={this.add.bind(this)}/>
          } else {
            return <RemoveIngredient text={rowData} remove={this.remove.bind(this)}/>
          }
        }}
        style={this.props.style}
        scrollEnabled={false}
      />
    )
  }
}

class RemoveIngredient extends Component {
  onPressRemove() {
    this.props.remove(this.props.text)
  }

  render() {
    return (
      <View style={styles.cell}>
        <Text style={[styles.left, styles.ingredient]}>{this.props.text}</Text>
        <TouchableHighlight onPress={this.onPressRemove.bind(this)} underlayColor='white'>
          <Icon name='minus-circle' size={45} color='#B82234' style={styles.right}/>
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
      <View style={[styles.cell, styles.lastCell]}>
        <TextInput
          style={[styles.left, styles.ingredient]}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          autoFocus={true}
        />
        <TouchableHighlight onPress={this.onPressAdd.bind(this)} underlayColor='white'>
          <Icon name='plus-circle' size={45} color='#68A026' style={styles.right}/>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cell: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 70,
    borderBottomWidth: 1,
    borderColor: '#CCC'
  },
  lastCell: {
    borderBottomWidth: 0,
    borderColor: '#56565C'
  },
  left: {
    flex: 0.8
  },
  right: {
    flex: 0.2
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#56565C'
  },
  ingredient: {
    fontSize: 16,
    fontFamily: 'HelveticaNeue',
    color: '#686872'
  }
});
