import React, {
  View,
  Component,
  Text,
  StyleSheet,
  Picker
} from 'react-native'

export default class HostSelection extends Component {
  constructor() {
    super();
    this.state = {
      peopleHosted: 0,
      pickerItems: ["I don't want to host", 3, 4, 5, 6, 7, 8, 9, 10]
        .map((d) => <Picker.Item key={d} value={d.toString()} label={d.toString()}/>)
    }
  }

  render() {
    return (
      <View style={this.props.style}>
        <Text style={styles.header}>How many guests would you host?</Text>
        <View style={styles.pickerContainer}>
          <Picker style={styles.picker} itemStyle={{fontSize: 14}}
                  selectedValue={this.state.peopleHosted}
                  onValueChange={(num) => {
                    this.setState({peopleHosted: num});
                    this.props.update(num);
                  }}>
            {this.state.pickerItems}
          </Picker>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#56565C'
  },
  picker: {},
  pickerContainer: {
    overflow: 'hidden',
    height: 90,
    justifyContent: 'center',
    marginTop: 10
  }
});