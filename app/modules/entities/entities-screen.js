import React from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
// Styles
/* eslint-disable no-unused-vars */
import RoundedButton from '../../shared/components/rounded-button/rounded-button'
import {
  loginScreen,
  orderRequestEntityScreen,
  smsNotifyEntityScreen,
  orderPickUpEntityScreen,
  ordPickUpTrkEntityScreen,
  orderDetailEntityScreen,
  ordDtlTranEntityScreen,
  orderDocEntityScreen,
  userPointEntityScreen,
  userPointTranEntityScreen,
  // ignite-jhipster-entity-screen-import-needle
} from '../../navigation/layouts'
/* eslint-enable */

import styles from './entities-screen.styles'

class EntitiesScreen extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.centerText}>JHipster Entities will appear below</Text>
        <RoundedButton text="OrderRequest" onPress={orderRequestEntityScreen} testID="orderRequestEntityScreenButton" />
        <RoundedButton text="SMSNotify" onPress={smsNotifyEntityScreen} testID="smsNotifyEntityScreenButton" />
        <RoundedButton text="OrderPickUp" onPress={orderPickUpEntityScreen} testID="orderPickUpEntityScreenButton" />
        <RoundedButton text="OrdPickUpTrk" onPress={ordPickUpTrkEntityScreen} testID="ordPickUpTrkEntityScreenButton" />
        <RoundedButton text="OrderDetail" onPress={orderDetailEntityScreen} testID="orderDetailEntityScreenButton" />
        <RoundedButton text="OrdDtlTran" onPress={ordDtlTranEntityScreen} testID="ordDtlTranEntityScreenButton" />
        <RoundedButton text="OrderDoc" onPress={orderDocEntityScreen} testID="orderDocEntityScreenButton" />
        <RoundedButton text="UserPoint" onPress={userPointEntityScreen} testID="userPointEntityScreenButton" />
        <RoundedButton text="UserPointTran" onPress={userPointTranEntityScreen} testID="userPointTranEntityScreenButton" />
        {/* ignite-jhipster-entity-screen-needle */}
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    // for developer convenience
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // for developer convenience
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EntitiesScreen)
