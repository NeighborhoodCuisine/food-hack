import React, { View, Component, Image, StyleSheet } from 'react-native'

export default class ProfileImage extends Component {
  render() {
    return (
      <View style={{
        backgroundColor: '#E53935',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginBottom: 12,
        width: this.props.size + 4,
        height: this.props.size + 4,
        borderRadius: (this.props.size + 4) / 2
      }}>
        <Image style={{
          width: this.props.size,
          height: this.props.size,
          borderRadius: (this.props.size) / 2,
          alignSelf: 'center',
          }} source={this.props.image} />
      </View>
    )
  }
}

ProfileImage.defaultProps = { size: 72 }
