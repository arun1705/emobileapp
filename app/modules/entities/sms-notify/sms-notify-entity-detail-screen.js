import React from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { smsNotifyEntityEditScreen } from '../../../navigation/layouts'

import SMSNotifyActions from './sms-notify.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './sms-notify-entity-detail-screen-style'

class SMSNotifyEntityDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.props.getSMSNotify(this.props.data.entityId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.deleting && !this.props.deleting) {
      if (this.props.errorDeleting) {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{ text: 'OK' }])
      } else {
        this.props.getAllSMSNotifies()
        Navigation.pop(this.props.componentId)
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete SMSNotify?',
      'Are you sure you want to delete the SMSNotify?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.props.deleteSMSNotify(this.props.data.entityId)
          },
        },
      ],
      { cancelable: false },
    )
  }

  render() {
    if (!this.props.smsNotify) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <Text>ID: {this.props.smsNotify.id}</Text>
        <Text testID="orderReqId">OrderReqId: {this.props.smsNotify.orderReqId}</Text>
        <Text testID="mobile">Mobile: {this.props.smsNotify.mobile}</Text>
        <Text testID="userId">UserId: {this.props.smsNotify.userId}</Text>
        <Text testID="message">Message: {this.props.smsNotify.message}</Text>
        <RoundedButton text="Edit" onPress={smsNotifyEntityEditScreen.bind(this, { entityId: this.props.smsNotify.id })} />
        <RoundedButton text="Delete" onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    smsNotify: state.smsNotifies.smsNotify,
    deleting: state.smsNotifies.deleting,
    errorDeleting: state.smsNotifies.errorDeleting,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSMSNotify: id => dispatch(SMSNotifyActions.smsNotifyRequest(id)),
    getAllSMSNotifies: options => dispatch(SMSNotifyActions.smsNotifyAllRequest(options)),
    deleteSMSNotify: id => dispatch(SMSNotifyActions.smsNotifyDeleteRequest(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SMSNotifyEntityDetailScreen)
