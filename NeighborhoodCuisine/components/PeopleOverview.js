import React, {
  View,
  Component,
  StyleSheet,
  Image, Text, TouchableHighlight, ListView, Linking } from 'react-native'
import CommonStyles from './Styles'
import { getTheme } from 'react-native-material-kit'
import ProfileImage from './ProfileImage'

export default class PeopleOverview extends Component {
  buildDataSource() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    return ds.cloneWithRows(this.props.users)
  }

  renderRow(rowData) {
    return <TouchableHighlight
      onPress={() => {
        Linking.openURL(rowData.fb_link)
      }}>
      <View style={styles.row}>
        <ProfileImage image={{uri: rowData.image}} size={48} />
        <Text style={[CommonStyles.text, styles.rowText]}>{rowData.first_name} {rowData.last_name}</Text>
      </View>
    </TouchableHighlight>
  }

  render() {
    return (
      <View>
        <View style={styles.groupContainer}>
          <Image source={require('../images/Anonymous-Profile.png')} style={styles.groupImage} />
          <Text style={[CommonStyles.text, styles.groupText]}>
            Your Group ({this.props.count})
          </Text>
        </View>

        <ListView
          contentContainerStyle={[styles.cardActionStyle, {
            paddingLeft: 24
             }]}
          dataSource={this.buildDataSource()}
          renderRow={this.renderRow.bind(this)}>
        </ListView>
      </View>
    )
  }
}

import { CardStyles } from './Styles'
const { cardActionStyle } = CardStyles
const styles = {
  cardActionStyle,
  groupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    left: 20
  },
  groupImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  groupText: {
    margin: 8
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rowText: {
    marginTop: -8,
    marginLeft: 8
  }
 }
