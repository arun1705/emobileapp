import React from 'react'
import { ScrollView, Text, Image, View, Platform } from 'react-native'
import { DebugInstructions, ReloadInstructions } from 'react-native/Libraries/NewAppScreen'
import { Navigation } from 'react-native-navigation'

import LearnMoreLinks from './learn-more-links.component.js'
import { Images } from '../../shared/themes'
import styles from './launch-screen.styles'
import {LoginScreen} from '../login/login-screen'

export default class LaunchScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
  }

  componentDidAppear() {
    Navigation.mergeOptions(this.props.componentId, {
      sideMenu: {
        left: {
          enabled: true,
          visible: false,
        },
      },
    })
  }

  showSideMenu() {
    Navigation.mergeOptions(this.props.componentId, {
      sideMenu: {
        left: {
          visible: true,
        },
      },
    })
  }

  navigationButtonPressed({ buttonId }) {
    this.showSideMenu()
  }

  render() {
    return (
      
      <LoginScreen {...this.props}/>
    )
  }
}
