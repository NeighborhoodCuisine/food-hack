import React, {
  View,
  Component,
  Text,
  TouchableHighlight,
  Image,
  StyleSheet
} from 'react-native'
import Filter from './Filter'
import Store from '../lib/Store'
import FB from '../lib/FB'
import CommonStyles from '../components/Styles'


export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      picture: require('../images/Anonymous-Profile.png')
    }
  }

  componentDidMount() {
    console.log('access_token', Store.get('login').credentials.token)
    this.fb = new FB({
      access_token: Store.get('login').credentials.token,
      fields: ['first_name', 'picture']
    })

    this.fb.promise
      .then((data) => this.setState({
        picture: { uri: data.picture.data.url },
        name: data.first_name
      }))
      .catch((error) => console.log(error))
  }

  routeToFilter() {
    this.props.navigator.push({
      name: 'Filter',
      component: Filter,
      title: 'Define your Meal'
    })
  }

  render() {
    console.log(Store.get('login'))
    return <View style={styles.container}>
      <View style={styles.profileBackground}>
        <Image style={styles.profile} source={this.state.picture} />
      </View>

      <Text style={[CommonStyles.text, CommonStyles.heading]}>Hi {this.state.name},</Text>
      <Text style={[CommonStyles.text, CommonStyles.heading]}>are you hungry?</Text>
      <TouchableHighlight onPress={this.routeToFilter.bind(this)}>
        <Text>Filter</Text>
      </TouchableHighlight>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileBackground: {
    borderRadius: 37,
    width: 74,
    height: 74,
    backgroundColor: '#6C56B7',
  },
  profile: {
    borderRadius: 36,
    width: 72,
    height: 72,
    alignSelf: 'center',
    justifyContent: 'center'
  }
})
