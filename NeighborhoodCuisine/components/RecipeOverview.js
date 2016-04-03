import React, {
  View,
  Component,
  StyleSheet,
  Image, Text} from 'react-native'
import CommonStyles from './Styles'
import { getTheme } from 'react-native-material-kit'
const { cardStyle, cardImageStyle, cardMenuStyle, cardContentStyle, cardTitleStyle, cardActionStyle } = getTheme()

console.log(cardStyle, cardImageStyle)
export default class RecipeOverview extends Component {
  render() {
    return (
      <View style={cardStyle}>
        <Image source={{uri : this.props.card}} style={cardImageStyle}/>
        <Text style={cardTitleStyle}>{this.props.title}</Text>
        <Text style={cardContentStyle}>
          {this.props.cuisine}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    margin: 20,
    backgroundColor: 'white'
  },
  cardImage: {
    flex: 1,
    width: 500,
    height: 128,
    resizeMode: 'cover'
  },
  cardBody: {
    padding: 8,
    alignItems: 'center'
  },
  heading: {
    color: '#6C56B7'
  },
  subheading: {
    color: 'darkgrey'
  }
})
