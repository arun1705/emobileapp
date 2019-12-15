import React from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { ordPickUpTrkEntityEditScreen } from '../../../navigation/layouts'

import OrdPickUpTrkActions from './ord-pick-up-trk.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './ord-pick-up-trk-entity-detail-screen-style'

class OrdPickUpTrkEntityDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.props.getOrdPickUpTrk(this.props.data.entityId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.deleting && !this.props.deleting) {
      if (this.props.errorDeleting) {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{ text: 'OK' }])
      } else {
        this.props.getAllOrdPickUpTrks()
        Navigation.pop(this.props.componentId)
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete OrdPickUpTrk?',
      'Are you sure you want to delete the OrdPickUpTrk?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.props.deleteOrdPickUpTrk(this.props.data.entityId)
          },
        },
      ],
      { cancelable: false },
    )
  }

  render() {
    if (!this.props.ordPickUpTrk) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <Text>ID: {this.props.ordPickUpTrk.id}</Text>
        <Text testID="orderReqId">OrderReqId: {this.props.ordPickUpTrk.orderReqId}</Text>
        <Text testID="empUserId">EmpUserId: {this.props.ordPickUpTrk.empUserId}</Text>
        <Text testID="customerUserId">CustomerUserId: {this.props.ordPickUpTrk.customerUserId}</Text>
        <Text testID="status">Status: {this.props.ordPickUpTrk.status}</Text>
        <Text testID="createdOn">CreatedOn: {String(this.props.ordPickUpTrk.createdOn)}</Text>
        <Text testID="modifiedOn">ModifiedOn: {String(this.props.ordPickUpTrk.modifiedOn)}</Text>
        <RoundedButton text="Edit" onPress={ordPickUpTrkEntityEditScreen.bind(this, { entityId: this.props.ordPickUpTrk.id })} />
        <RoundedButton text="Delete" onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    ordPickUpTrk: state.ordPickUpTrks.ordPickUpTrk,
    deleting: state.ordPickUpTrks.deleting,
    errorDeleting: state.ordPickUpTrks.errorDeleting,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrdPickUpTrk: id => dispatch(OrdPickUpTrkActions.ordPickUpTrkRequest(id)),
    getAllOrdPickUpTrks: options => dispatch(OrdPickUpTrkActions.ordPickUpTrkAllRequest(options)),
    deleteOrdPickUpTrk: id => dispatch(OrdPickUpTrkActions.ordPickUpTrkDeleteRequest(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrdPickUpTrkEntityDetailScreen)
