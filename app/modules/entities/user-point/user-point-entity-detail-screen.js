import React from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { userPointEntityEditScreen } from '../../../navigation/layouts'

import UserPointActions from './user-point.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './user-point-entity-detail-screen-style'

class UserPointEntityDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.props.getUserPoint(this.props.data.entityId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.deleting && !this.props.deleting) {
      if (this.props.errorDeleting) {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{ text: 'OK' }])
      } else {
        this.props.getAllUserPoints()
        Navigation.pop(this.props.componentId)
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete UserPoint?',
      'Are you sure you want to delete the UserPoint?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.props.deleteUserPoint(this.props.data.entityId)
          },
        },
      ],
      { cancelable: false },
    )
  }

  render() {
    if (!this.props.userPoint) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <Text>ID: {this.props.userPoint.id}</Text>
        <Text testID="customerId">CustomerId: {this.props.userPoint.customerId}</Text>
        <Text testID="totalPoints">TotalPoints: {this.props.userPoint.totalPoints}</Text>
        <Text testID="totalAmount">TotalAmount: {this.props.userPoint.totalAmount}</Text>
        <RoundedButton text="Edit" onPress={userPointEntityEditScreen.bind(this, { entityId: this.props.userPoint.id })} />
        <RoundedButton text="Delete" onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    userPoint: state.userPoints.userPoint,
    deleting: state.userPoints.deleting,
    errorDeleting: state.userPoints.errorDeleting,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserPoint: id => dispatch(UserPointActions.userPointRequest(id)),
    getAllUserPoints: options => dispatch(UserPointActions.userPointAllRequest(options)),
    deleteUserPoint: id => dispatch(UserPointActions.userPointDeleteRequest(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserPointEntityDetailScreen)
