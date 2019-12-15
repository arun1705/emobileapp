import React from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { userPointTranEntityEditScreen } from '../../../navigation/layouts'

import UserPointTranActions from './user-point-trans.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './user-point-trans-entity-detail-screen-style'

class UserPointTranEntityDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.props.getUserPointTran(this.props.data.entityId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.deleting && !this.props.deleting) {
      if (this.props.errorDeleting) {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{ text: 'OK' }])
      } else {
        this.props.getAllUserPointTrans()
        Navigation.pop(this.props.componentId)
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete UserPointTran?',
      'Are you sure you want to delete the UserPointTran?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.props.deleteUserPointTran(this.props.data.entityId)
          },
        },
      ],
      { cancelable: false },
    )
  }

  render() {
    if (!this.props.userPointTran) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <Text>ID: {this.props.userPointTran.id}</Text>
        <Text testID="customerId">CustomerId: {this.props.userPointTran.customerId}</Text>
        <Text testID="prevPoints">PrevPoints: {this.props.userPointTran.prevPoints}</Text>
        <Text testID="prevAmount">PrevAmount: {this.props.userPointTran.prevAmount}</Text>
        <Text testID="updatedPoints">UpdatedPoints: {this.props.userPointTran.updatedPoints}</Text>
        <Text testID="updatedAmount">UpdatedAmount: {this.props.userPointTran.updatedAmount}</Text>
        <Text testID="credited">Credited: {this.props.userPointTran.credited}</Text>
        <RoundedButton text="Edit" onPress={userPointTranEntityEditScreen.bind(this, { entityId: this.props.userPointTran.id })} />
        <RoundedButton text="Delete" onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    userPointTran: state.userPointTrans.userPointTran,
    deleting: state.userPointTrans.deleting,
    errorDeleting: state.userPointTrans.errorDeleting,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserPointTran: id => dispatch(UserPointTranActions.userPointTranRequest(id)),
    getAllUserPointTrans: options => dispatch(UserPointTranActions.userPointTranAllRequest(options)),
    deleteUserPointTran: id => dispatch(UserPointTranActions.userPointTranDeleteRequest(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserPointTranEntityDetailScreen)
