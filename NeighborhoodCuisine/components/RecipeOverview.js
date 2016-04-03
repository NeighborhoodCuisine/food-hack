import React, {
  View,
  Component,
  StyleSheet,
  Image, Text, TouchableHighlight } from 'react-native'
import CommonStyles from './Styles'
import { getTheme } from 'react-native-material-kit'
export default class RecipeOverview extends Component {
  render() {
    return (
      <View style={styles.cardStyle}>
        <Image source={{uri : this.props.image}} style={styles.cardImageStyle} />
        <Text style={styles.cardTitleStyle}>{this.props.title}</Text>
        <Text style={styles.cardSubtitleStyle}>
          {this.props.cuisine}
        </Text>
        <TouchableHighlight onPress={this.props.onShow}>
          <View style={[styles.cardActionStyle, { flexDirection: 'row' }]}>
            <Image source={require('../images/Eye.png')} style={{height: 16, resizeMode: 'contain'}} />
            <Text style={{}}>Look at Recipe</Text>
            </View>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cardStyle: {
    margin: 10,
    backgroundColor: '#ffffff',
    borderRadius: 2,
    borderColor: '#ffffff',
    borderWidth: 1,
    shadowColor: 'rgba(0,0,0,.12)',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 2,
    },
  },
  cardImageStyle: {
    flex: 1,
    height: 170,
    resizeMode: 'cover',
  },
  cardTitleStyle: {
    backgroundColor: 'transparent',
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 0,
    fontSize: 24,
    color: '#000000',
    fontWeight: 'bold',
  },
  cardSubtitleStyle: {
    padding: 2,
    paddingLeft: 16,
    color: 'rgba(0,0,0,0.45)'
  },
  cardContentStyle: {
    padding: 15,
    color: 'rgba(0,0,0,.54)',
  },
  cardActionStyle: {
    borderStyle: 'solid',
    borderTopColor: 'rgba(0,0,0,.1)',
    borderTopWidth: 1,
    padding: 8,
    marginTop: 8
  },
  cardMenuStyle: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'transparent',
  }
})
