import React, {
  View,
  Component,
  Text,
  TouchableHighlight,
  Image,
  StyleSheet, ScrollView
} from 'react-native'
import Filter from './Filter'
import Store from '../lib/Store'
import CommonStyles from '../components/Styles'
import RecipeOverview from '../components/RecipeOverview'
import { nearby } from '../lib/Endpoint'
import ProfileImage from '../components/ProfileImage'

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picture: require('../images/Anonymous-Profile.png'),
      count: 0
    }
  }

  componentWillMount() {
    Store.get('fb').promise
      .then((data) => this.setState({
        picture: { uri: data.picture.data.url },
        name: data.first_name
      }))
      .catch((error) => console.log(error))
      .then(() => {
        nearby()
          .then(response => response.json())
          .then(data => this.setState({ count: data.count - 1 }))
          .catch(() => this.setState({ count: -1 }))
      })
  }

  routeToFilter() {
    this.props.navigator.push({
      name: 'Filter',
      component: Filter,
      title: 'Define your Meal'
    })
  }

  render() {
    const { count } = this.state
    let people = '' + count + ' hungry people nearby.'
    if (count === 1) {
      people = '1 hungry person nearby.'
    } else if (count < 1) {
      people = 'No one hungry nearby.'
    }

    return <View style={styles.container}>
      <ProfileImage image={this.state.picture} />

      <Text style={[CommonStyles.text, CommonStyles.heading]}>Hi {this.state.name},</Text>
      <Text style={[CommonStyles.text, CommonStyles.heading]}>are you hungry?</Text>

      <View style={styles.button}>
        <TouchableHighlight
          onPress={this.routeToFilter.bind(this)}>
          <Text style={[CommonStyles.text, styles.go]}>Let's cook!</Text>
        </TouchableHighlight>
      </View>
      <Text style={[CommonStyles.text, styles.highlighted]}>{people}</Text>

    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginTop: 78,
    backgroundColor: '#6C56B7',
    borderRadius: 50,
    padding: 16
  },
  go: {
    fontSize: 18
  },
  highlighted: {
    marginTop: 4
  }
});
