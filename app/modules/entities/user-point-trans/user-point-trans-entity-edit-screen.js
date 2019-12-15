import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight, View } from 'react-native'
import { connect } from 'react-redux'
import UserPointTranActions from './user-point-trans.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { userPointTranEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './user-point-trans-entity-edit-screen-style'

let Form = t.form.Form

class UserPointTranEntityEditScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      formModel: t.struct({
        id: t.maybe(t.Number),
        customerId: t.maybe(t.Number),
        prevPoints: t.maybe(t.Number),
        prevAmount: t.maybe(t.Number),
        updatedPoints: t.maybe(t.Number),
        updatedAmount: t.maybe(t.Number),
        credited: t.maybe(t.Boolean),
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true,
          },
          customerId: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('prevPoints').refs.input.focus(),
            testID: 'customerIdInput',
          },
          prevPoints: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('prevAmount').refs.input.focus(),
            testID: 'prevPointsInput',
          },
          prevAmount: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('updatedPoints').refs.input.focus(),
            testID: 'prevAmountInput',
          },
          updatedPoints: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('updatedAmount').refs.input.focus(),
            testID: 'updatedPointsInput',
          },
          updatedAmount: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('credited').refs.input.focus(),
            testID: 'updatedAmountInput',
          },
          credited: {
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitForm(),
            testID: 'creditedInput',
          },
        },
      },
      userPointTran: {},
      isNewEntity: true,
    }
    if (props.data && props.data.entityId) {
      this.state.isNewEntity = false
      this.props.getUserPointTran(props.data.entityId)
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.userPointTran !== prevState.userPointTran && !prevState.isNewEntity) {
      return { formValue: entityToFormValue(nextProps.userPointTran), userPointTran: nextProps.userPointTran }
    }
    return null
  }
  componentDidUpdate(prevProps) {
    if (prevProps.updating && !this.props.updating) {
      if (this.props.error) {
        Alert.alert('Error', 'Something went wrong updating the entity', [{ text: 'OK' }])
      } else {
        this.props.getAllUserPointTrans({ page: 0, sort: 'id,asc', size: 20 })
        const entityId = this.props.userPointTran.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: userPointTranEntityDetailScreen.bind(this, { entityId }),
          })
        }
        Navigation.pop(this.props.componentId)
        Alert.alert('Success', 'Entity saved successfully', alertOptions)
      }
    }
  }

  submitForm() {
    // call getValue() to get the values of the form
    const userPointTran = this.form.getValue()
    if (userPointTran) {
      // if validation fails, value will be null
      this.props.updateUserPointTran(formValueToEntity(userPointTran))
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
    prevPoints: value.prevPoints || null,
    prevAmount: value.prevAmount || null,
    updatedPoints: value.updatedPoints || null,
    updatedAmount: value.updatedAmount || null,
    credited: value.credited || null,
  }
}
const formValueToEntity = value => {
  const entity = {
    id: value.id || null,
    customerId: value.customerId || null,
    prevPoints: value.prevPoints || null,
    prevAmount: value.prevAmount || null,
    updatedPoints: value.updatedPoints || null,
    updatedAmount: value.updatedAmount || null,
    credited: value.credited || null,
  }
  return entity
}

const mapStateToProps = state => {
  return {
    userPointTran: state.userPointTrans.userPointTran,
    fetching: state.userPointTrans.fetchingOne,
    updating: state.userPointTrans.updating,
    error: state.userPointTrans.errorUpdating,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserPointTran: id => dispatch(UserPointTranActions.userPointTranRequest(id)),
    getAllUserPointTrans: options => dispatch(UserPointTranActions.userPointTranAllRequest(options)),
    updateUserPointTran: userPointTran => dispatch(UserPointTranActions.userPointTranUpdateRequest(userPointTran)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserPointTranEntityEditScreen)
