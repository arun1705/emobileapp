import React from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { orderDocEntityEditScreen } from '../../../navigation/layouts'

import OrderDocActions from './order-doc.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './order-doc-entity-detail-screen-style'

class OrderDocEntityDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.props.getOrderDoc(this.props.data.entityId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.deleting && !this.props.deleting) {
      if (this.props.errorDeleting) {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{ text: 'OK' }])
      } else {
        this.props.getAllOrderDocs()
        Navigation.pop(this.props.componentId)
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete OrderDoc?',
      'Are you sure you want to delete the OrderDoc?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.props.deleteOrderDoc(this.props.data.entityId)
          },
        },
      ],
      { cancelable: false },
    )
  }

  render() {
    if (!this.props.orderDoc) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <Text>ID: {this.props.orderDoc.id}</Text>
        <Text testID="orderDetailId">OrderDetailId: {this.props.orderDoc.orderDetailId}</Text>
        <Text testID="fileName">FileName: {this.props.orderDoc.fileName}</Text>
        <Text testID="fileUrl">FileUrl: {this.props.orderDoc.fileUrl}</Text>
        <Text testID="contentType">ContentType: {this.props.orderDoc.contentType}</Text>
        <RoundedButton text="Edit" onPress={orderDocEntityEditScreen.bind(this, { entityId: this.props.orderDoc.id })} />
        <RoundedButton text="Delete" onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    orderDoc: state.orderDocs.orderDoc,
    deleting: state.orderDocs.deleting,
    errorDeleting: state.orderDocs.errorDeleting,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrderDoc: id => dispatch(OrderDocActions.orderDocRequest(id)),
    getAllOrderDocs: options => dispatch(OrderDocActions.orderDocAllRequest(options)),
    deleteOrderDoc: id => dispatch(OrderDocActions.orderDocDeleteRequest(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderDocEntityDetailScreen)
