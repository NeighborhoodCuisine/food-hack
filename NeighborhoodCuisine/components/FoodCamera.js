'use strict';
import React, {
  AppRegistry,
  Component,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Camera from 'react-native-camera';

import ImageTagger from '../tagging/ImageTagger'

export default class FoodCamera extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      hasTag: false,
      suggestedTag: ''
    }
    this.imageTagger = new ImageTagger()
  }

  takePicture() {
    console.log("take picture")
    this.setState({ isLoading: true })
    return this.camera.capture()
  }

  tagImage(filename) {
    this.imageTagger.tagImageFromFile(filename)
      .then(tagObj => {
        console.log(tagObj)
        this.setState({
          isLoading: false,
          hasTag: true,
          suggestedTag: tagObj.tag
        })
      })
      .then(res => console.log(res))
  }

  scanImage() {
    this
      .takePicture()
      .then(this.tagImage.bind(this))
      .catch(err => {
        this.setState({
          isLoading: false,
          hasTag: false,
          suggestedTag: ''
        })
        console.error(err)
      })
  }

  render() {
    const { isLoading, hasTag, suggestedTag } = this.state

    let bottomContent
    if (isLoading) {
      bottomContent = <Text>Loading</Text>
    } else if (hasTag) {
      bottomContent = <Text>{ suggestedTag }</Text>
    } else {
      bottomContent = (
        <View style={styles.circle}>
          <Text style={styles.capture} onPress={this.scanImage.bind(this)}>SCAN</Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          captureQuality={Camera.constants.CaptureQuality.cameraRoll}
          orientation="portrait"
          captureTarget={Camera.constants.CaptureTarget.disk}>
        </Camera>
        <View style={styles.subContainer}>
          { bottomContent }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  subContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    flex: 1,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#6c56b7',
    marginBottom: 20,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 20,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  preview: {
    flex: 1,
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 20,
    shadowOffset: {
      height: 1,
      width: 1
    }
  }
});
