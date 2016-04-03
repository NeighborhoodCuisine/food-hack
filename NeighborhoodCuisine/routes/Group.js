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
import PeopleOverview from '../components/PeopleOverview'
import RecipeOverview from '../components/RecipeOverview'

// TODO: add decline match text in route
export default class Group extends Component {
  // decline() {
  //   this.props.navigator.pop()
  // }

  render() {
    console.log(this.props.groupData)
    // <TouchableHighlight onPress={this.decline.bind(this)}>
    //   <Image style={styles.declineImage} source={require('../images/Decline.png')} />
    //   <Text style={styles.declineText}>Decline Match</Text>
    // </TouchableHighlight>
    return (
      <View>
        <PeopleOverview
          count={this.props.groupData.users.length} users={this.props.groupData.users} />
        <RecipeOverview
          image={this.props.groupData.recipe.image}
          title={this.props.groupData.recipe.title}
          cuisine={this.props.groupData.recipe.cuisine}
          recipeUrl={this.props.groupData.recipe.url}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  declineImage: {

  },
  declineText: {
    color: '#E7473F'
  }
})
