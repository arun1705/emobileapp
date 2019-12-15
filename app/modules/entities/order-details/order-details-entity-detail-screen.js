import React from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { orderDetailEntityEditScreen } from '../../../navigation/layouts'

import OrderDetailActions from './order-details.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './order-details-entity-detail-screen-style'

class OrderDetailEntityDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.props.getOrderDetail(this.props.data.entityId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.deleting && !this.props.deleting) {
      if (this.props.errorDeleting) {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{ text: 'OK' }])
      } else {
        this.props.getAllOrderDetails()
        Navigation.pop(this.props.componentId)
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete OrderDetail?',
      'Are you sure you want to delete the OrderDetail?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.props.deleteOrderDetail(this.props.data.entityId)
          },
        },
      ],
      { cancelable: false },
    )
  }

  render() {
    if (!this.props.orderDetail) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <Text>ID: {this.props.orderDetail.id}</Text>
        <Text testID="orderReqId">OrderReqId: {this.props.orderDetail.orderReqId}</Text>
        <Text testID="productId">ProductId: {this.props.orderDetail.productId}</Text>
        <Text testID="quantity">Quantity: {this.props.orderDetail.quantity}</Text>
        <Text testID="catBPoint">CatBPoint: {this.props.orderDetail.catBPoint}</Text>
        <Text testID="catBPCount">CatBPCount: {this.props.orderDetail.catBPCount}</Text>
        <Text testID="catTypeBPointId">CatTypeBPointId: {this.props.orderDetail.catTypeBPointId}</Text>
        <Text testID="catTypeBPCount">CatTypeBPCount: {this.props.orderDetail.catTypeBPCount}</Text>
        <Text testID="prodBPointId">ProdBPointId: {this.props.orderDetail.prodBPointId}</Text>
        <Text testID="prodBPCount">ProdBPCount: {this.props.orderDetail.prodBPCount}</Text>
        <Text testID="productPointId">ProductPointId: {this.props.orderDetail.productPointId}</Text>
        <Text testID="prodPCount">ProdPCount: {this.props.orderDetail.prodPCount}</Text>
        <Text testID="curncyPointId">CurncyPointId: {this.props.orderDetail.curncyPointId}</Text>
        <Text testID="curncyBPointId">CurncyBPointId: {this.props.orderDetail.curncyBPointId}</Text>
        <Text testID="productValue">ProductValue: {this.props.orderDetail.productValue}</Text>
        <Text testID="createdBy">CreatedBy: {this.props.orderDetail.createdBy}</Text>
        <Text testID="createdOn">CreatedOn: {String(this.props.orderDetail.createdOn)}</Text>
        <Text testID="modifiedBy">ModifiedBy: {this.props.orderDetail.modifiedBy}</Text>
        <Text testID="modifiedOn">ModifiedOn: {String(this.props.orderDetail.modifiedOn)}</Text>
        <RoundedButton text="Edit" onPress={orderDetailEntityEditScreen.bind(this, { entityId: this.props.orderDetail.id })} />
        <RoundedButton text="Delete" onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    orderDetail: state.orderDetails.orderDetail,
    deleting: state.orderDetails.deleting,
    errorDeleting: state.orderDetails.errorDeleting,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrderDetail: id => dispatch(OrderDetailActions.orderDetailRequest(id)),
    getAllOrderDetails: options => dispatch(OrderDetailActions.orderDetailAllRequest(options)),
    deleteOrderDetail: id => dispatch(OrderDetailActions.orderDetailDeleteRequest(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderDetailEntityDetailScreen)
