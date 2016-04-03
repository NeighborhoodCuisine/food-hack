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
import HostRoute from '../components/HostRoute'
import Store from '../lib/Store.js'

export default class Group extends Component {

  isHost() {
    const myPos = Store.get('position')
    const hostPos = this.props.groupData.host.position
    return myPos.lat == hostPos.lat && myPos.long == hostPos.lon
  }

  render() {
    console.log(this.props.groupData)

    const route = !this.isHost() ? <HostRoute position={this.props.groupData.host.position} /> : null

    return (
      <ScrollView style={{height: 500, flex: 1, flexDirection: 'column'}}>
        <PeopleOverview
          count={this.props.groupData.group.length} users={this.props.groupData.group} />
        <RecipeOverview
          image={this.props.groupData.recipe.image}
          title={this.props.groupData.recipe.title}
          extendedIngredients={this.props.groupData.recipe.extendedIngredients}
          cuisine={''}
          missing={this.props.groupData.missing}
          recipeUrl={this.props.groupData.recipe.sourceUrl}
        />
        { route }
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
