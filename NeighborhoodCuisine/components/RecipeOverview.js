import React, {
  View,
  Component,
  StyleSheet,
  Image, Text, TouchableHighlight, Linking } from 'react-native'
import CommonStyles from './Styles'
import { getTheme } from 'react-native-material-kit'
export default class RecipeOverview extends Component {
  onShow() {
    Linking.openURL(this.props.recipeUrl)
  }

  renderIngredient(ingredient, style) {
    return <Text key={ingredient} style={[s.ingredientText, style]}>{ingredient}</Text>
  }

  renderMissingIngredient(ingredient) {
    return this.renderIngredient(ingredient, s.missing)
  }

  renderMissingIngredients() {
    return this.props.missing.map(this.renderMissingIngredient.bind(this))
  }

  renderIngredients() {
    return this.renderMissingIngredients()
  }

  render() {
    return (
      <View>
        <View style={{
          flexDirection: 'row',
          left: 20,
        }}>
          <Image source={require('../images/Meal-Icon.png')} style={backgroundHungry} />
          <Text style={[CommonStyles.text, recipeText]}>The Recipe</Text>
        </View>
        <View style={styles.cardActionStyle}>
          <View style={styles.cardStyle}>
            <Image source={{uri : this.props.image}} style={styles.cardImageStyle} />
            <Text style={styles.cardTitleStyle}>{this.props.title}</Text>
            {this.renderIngredients()}
            <TouchableHighlight onPress={this.onShow.bind(this)}>
              <View style={[styles.cardActionStyle, { flexDirection: 'row', justifyContent: 'flex-end' }]}>
                <Text style={{}}>Show Recipe</Text>
                <Image source={require('../images/Arrow-Right.png')} style={{height: 16, marginTop: 1, resizeMode: 'contain'}} />
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    )
  }
}

// <Image style={styles.cardIconStyle} source={require('../images/Likes.png')}/>
// <Text style={styles.cardBodyStyle}>{this.props.likes}</Text>

import { CardStyles } from './Styles'
const styles = CardStyles
const backgroundHungry = {
  width: 24,
  resizeMode: 'contain'
}
const recipeText = {
  marginTop: 12,
  marginLeft: 8
}
const s = {
  ingredientText: {
    padding: 8,
    left: 20
  },
  missing: {
    color: '#E53935'
  },
  present: {
    color: 'green'
  }
}
