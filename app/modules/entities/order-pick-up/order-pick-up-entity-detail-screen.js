import React from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { orderPickUpEntityEditScreen } from '../../../navigation/layouts'

import OrderPickUpActions from './order-pick-up.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './order-pick-up-entity-detail-screen-style'

class OrderPickUpEntityDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.props.getOrderPickUp(this.props.data.entityId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.deleting && !this.props.deleting) {
      if (this.props.errorDeleting) {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{ text: 'OK' }])
      } else {
        this.props.getAllOrderPickUps()
        Navigation.pop(this.props.componentId)
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete OrderPickUp?',
      'Are you sure you want to delete the OrderPickUp?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.props.deleteOrderPickUp(this.props.data.entityId)
          },
        },
      ],
      { cancelable: false },
    )
  }

  render() {
    if (!this.props.orderPickUp) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <Text>ID: {this.props.orderPickUp.id}</Text>
        <Text testID="orderReqId">OrderReqId: {this.props.orderPickUp.orderReqId}</Text>
        <Text testID="empUserId">EmpUserId: {this.props.orderPickUp.empUserId}</Text>
        <Text testID="customerUserId">CustomerUserId: {this.props.orderPickUp.customerUserId}</Text>
        <Text testID="status">Status: {this.props.orderPickUp.status}</Text>
        <Text testID="createdOn">CreatedOn: {String(this.props.orderPickUp.createdOn)}</Text>
        <Text testID="modifiedOn">ModifiedOn: {String(this.props.orderPickUp.modifiedOn)}</Text>
        <RoundedButton text="Edit" onPress={orderPickUpEntityEditScreen.bind(this, { entityId: this.props.orderPickUp.id })} />
        <RoundedButton text="Delete" onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    orderPickUp: state.orderPickUps.orderPickUp,
    deleting: state.orderPickUps.deleting,
    errorDeleting: state.orderPickUps.errorDeleting,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrderPickUp: id => dispatch(OrderPickUpActions.orderPickUpRequest(id)),
    getAllOrderPickUps: options => dispatch(OrderPickUpActions.orderPickUpAllRequest(options)),
    deleteOrderPickUp: id => dispatch(OrderPickUpActions.orderPickUpDeleteRequest(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderPickUpEntityDetailScreen)
