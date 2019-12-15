import React from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { orderRequestEntityEditScreen } from '../../../navigation/layouts'

import OrderRequestActions from './order-request.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './order-request-entity-detail-screen-style'

class OrderRequestEntityDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.props.getOrderRequest(this.props.data.entityId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.deleting && !this.props.deleting) {
      if (this.props.errorDeleting) {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{ text: 'OK' }])
      } else {
        this.props.getAllOrderRequests()
        Navigation.pop(this.props.componentId)
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete OrderRequest?',
      'Are you sure you want to delete the OrderRequest?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.props.deleteOrderRequest(this.props.data.entityId)
          },
        },
      ],
      { cancelable: false },
    )
  }

  render() {
    if (!this.props.orderRequest) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <Text>ID: {this.props.orderRequest.id}</Text>
        <Text testID="mobile">Mobile: {this.props.orderRequest.mobile}</Text>
        <Text testID="registered">Registered: {this.props.orderRequest.registered}</Text>
        <Text testID="userId">UserId: {this.props.orderRequest.userId}</Text>
        <Text testID="countryId">CountryId: {this.props.orderRequest.countryId}</Text>
        <Text testID="stateId">StateId: {this.props.orderRequest.stateId}</Text>
        <Text testID="cityId">CityId: {this.props.orderRequest.cityId}</Text>
        <Text testID="pincodeId">PincodeId: {this.props.orderRequest.pincodeId}</Text>
        <Text testID="areaId">AreaId: {this.props.orderRequest.areaId}</Text>
        <Text testID="status">Status: {this.props.orderRequest.status}</Text>
        <Text testID="active">Active: {this.props.orderRequest.active}</Text>
        <Text testID="createdBy">CreatedBy: {this.props.orderRequest.createdBy}</Text>
        <Text testID="createdOn">CreatedOn: {String(this.props.orderRequest.createdOn)}</Text>
        <RoundedButton text="Edit" onPress={orderRequestEntityEditScreen.bind(this, { entityId: this.props.orderRequest.id })} />
        <RoundedButton text="Delete" onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    orderRequest: state.orderRequests.orderRequest,
    deleting: state.orderRequests.deleting,
    errorDeleting: state.orderRequests.errorDeleting,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrderRequest: id => dispatch(OrderRequestActions.orderRequestRequest(id)),
    getAllOrderRequests: options => dispatch(OrderRequestActions.orderRequestAllRequest(options)),
    deleteOrderRequest: id => dispatch(OrderRequestActions.orderRequestDeleteRequest(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderRequestEntityDetailScreen)
