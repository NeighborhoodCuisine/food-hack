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

export default class Group extends Component {


  render() {
    console.log(this.props.groupData)

    return (
      <ScrollView>
        <PeopleOverview
          count={this.props.groupData.group.length} users={this.props.groupData.group} />
        <RecipeOverview
          image={this.props.groupData.recipe.image}
          title={this.props.groupData.recipe.title}
          cuisine={''}
          recipeUrl={this.props.groupData.recipe.sourceUrl}
        />
      </ScrollView>
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
