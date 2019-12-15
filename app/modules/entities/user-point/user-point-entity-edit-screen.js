import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight, View } from 'react-native'
import { connect } from 'react-redux'
import UserPointActions from './user-point.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { userPointEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './user-point-entity-edit-screen-style'

let Form = t.form.Form

class UserPointEntityEditScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      formModel: t.struct({
        id: t.maybe(t.Number),
        customerId: t.maybe(t.Number),
        totalPoints: t.maybe(t.Number),
        totalAmount: t.maybe(t.Number),
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true,
          },
          customerId: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('totalPoints').refs.input.focus(),
            testID: 'customerIdInput',
          },
          totalPoints: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('totalAmount').refs.input.focus(),
            testID: 'totalPointsInput',
          },
          totalAmount: {
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitForm(),
            testID: 'totalAmountInput',
          },
        },
      },
      userPoint: {},
      isNewEntity: true,
    }
    if (props.data && props.data.entityId) {
      this.state.isNewEntity = false
      this.props.getUserPoint(props.data.entityId)
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.userPoint !== prevState.userPoint && !prevState.isNewEntity) {
      return { formValue: entityToFormValue(nextProps.userPoint), userPoint: nextProps.userPoint }
    }
    return null
  }
  componentDidUpdate(prevProps) {
    if (prevProps.updating && !this.props.updating) {
      if (this.props.error) {
        Alert.alert('Error', 'Something went wrong updating the entity', [{ text: 'OK' }])
      } else {
        this.props.getAllUserPoints({ page: 0, sort: 'id,asc', size: 20 })
        const entityId = this.props.userPoint.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: userPointEntityDetailScreen.bind(this, { entityId }),
          })
        }
        Navigation.pop(this.props.componentId)
        Alert.alert('Success', 'Entity saved successfully', alertOptions)
      }
    }
  }

  submitForm() {
    // call getValue() to get the values of the form
    const userPoint = this.form.getValue()
    if (userPoint) {
      // if validation fails, value will be null
      this.props.updateUserPoint(formValueToEntity(userPoint))
    }
  }

  formChange(newValue) {
    this.setState({
      formValue: newValue,
    })
  }

  render() {
    if (this.props.fetching) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }
    return (
      <KeyboardAwareScrollView>
        <ScrollView style={styles.container} testID="entityScrollView">
          <Form
            ref={c => {
              this.form = c
            }}
            type={this.state.formModel}
            options={this.state.formOptions}
            value={this.state.formValue}
            onChange={this.formChange}
          />
          <TouchableHighlight style={styles.button} onPress={this.submitForm} underlayColor="#99d9f4" testID="submitButton">
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
        </ScrollView>
      </KeyboardAwareScrollView>
    )
  }
}
// convenience methods for customizing the mapping of the entity to/from the form value
const entityToFormValue = value => {
  if (!value) {
    return {}
  }
  return {
    id: value.id || null,
    customerId: value.customerId || null,
    totalPoints: value.totalPoints || null,
    totalAmount: value.totalAmount || null,
  }
}
const formValueToEntity = value => {
  const entity = {
    id: value.id || null,
    customerId: value.customerId || null,
    totalPoints: value.totalPoints || null,
    totalAmount: value.totalAmount || null,
  }
  return entity
}

const mapStateToProps = state => {
  return {
    userPoint: state.userPoints.userPoint,
    fetching: state.userPoints.fetchingOne,
    updating: state.userPoints.updating,
    error: state.userPoints.errorUpdating,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserPoint: id => dispatch(UserPointActions.userPointRequest(id)),
    getAllUserPoints: options => dispatch(UserPointActions.userPointAllRequest(options)),
    updateUserPoint: userPoint => dispatch(UserPointActions.userPointUpdateRequest(userPoint)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserPointEntityEditScreen)
