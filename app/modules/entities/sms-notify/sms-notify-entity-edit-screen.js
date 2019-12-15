import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight, View } from 'react-native'
import { connect } from 'react-redux'
import SMSNotifyActions from './sms-notify.reducer'
import OrderRequestActions from '../order-request/order-request.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { smsNotifyEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './sms-notify-entity-edit-screen-style'

let Form = t.form.Form

class SMSNotifyEntityEditScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      formModel: t.struct({
        id: t.maybe(t.Number),
        orderReqId: t.maybe(t.Number),
        mobile: t.String,
        userId: t.maybe(t.Number),
        message: t.maybe(t.String),
        orderRequestId: this.getOrderRequests(),
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true,
          },
          orderRequestId: {
            testID: 'orderRequestIdInput',
            label: 'OrderRequest',
          },
          orderReqId: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('mobile').refs.input.focus(),
            testID: 'orderReqIdInput',
          },
          mobile: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('userId').refs.input.focus(),
            testID: 'mobileInput',
          },
          userId: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('message').refs.input.focus(),
            testID: 'userIdInput',
          },
          message: {
            testID: 'messageInput',
          },
        },
      },
      smsNotify: {},
      isNewEntity: true,
    }
    if (props.data && props.data.entityId) {
      this.state.isNewEntity = false
      this.props.getSMSNotify(props.data.entityId)
    }
    this.props.getAllOrderRequests()

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.smsNotify !== prevState.smsNotify && !prevState.isNewEntity) {
      return { formValue: entityToFormValue(nextProps.smsNotify), smsNotify: nextProps.smsNotify }
    }
    return null
  }
  componentDidUpdate(prevProps) {
    if (prevProps.updating && !this.props.updating) {
      if (this.props.error) {
        Alert.alert('Error', 'Something went wrong updating the entity', [{ text: 'OK' }])
      } else {
        this.props.getAllSMSNotifies({ page: 0, sort: 'id,asc', size: 20 })
        const entityId = this.props.smsNotify.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: smsNotifyEntityDetailScreen.bind(this, { entityId }),
          })
        }
        Navigation.pop(this.props.componentId)
        Alert.alert('Success', 'Entity saved successfully', alertOptions)
      }
    }
  }

  getOrderRequests = () => {
    const orderRequests = {}
    this.props.orderRequests.forEach(orderRequest => {
      orderRequests[orderRequest.id] = orderRequest.id ? orderRequest.id.toString() : orderRequest.id.toString()
    })
    return t.maybe(t.enums(orderRequests))
  }
  submitForm() {
    // call getValue() to get the values of the form
    const smsNotify = this.form.getValue()
    if (smsNotify) {
      // if validation fails, value will be null
      this.props.updateSMSNotify(formValueToEntity(smsNotify))
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
    orderReqId: value.orderReqId || null,
    mobile: value.mobile || null,
    userId: value.userId || null,
    message: value.message || null,
    orderRequestId: value.orderRequestId || null,
  }
}
const formValueToEntity = value => {
  const entity = {
    id: value.id || null,
    orderReqId: value.orderReqId || null,
    mobile: value.mobile || null,
    userId: value.userId || null,
    message: value.message || null,
    orderRequestId: value.orderRequestId || null,
  }
  return entity
}

const mapStateToProps = state => {
  return {
    orderRequests: state.orderRequests.orderRequests || [],
    smsNotify: state.smsNotifies.smsNotify,
    fetching: state.smsNotifies.fetchingOne,
    updating: state.smsNotifies.updating,
    error: state.smsNotifies.errorUpdating,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllOrderRequests: options => dispatch(OrderRequestActions.orderRequestAllRequest(options)),
    getSMSNotify: id => dispatch(SMSNotifyActions.smsNotifyRequest(id)),
    getAllSMSNotifies: options => dispatch(SMSNotifyActions.smsNotifyAllRequest(options)),
    updateSMSNotify: smsNotify => dispatch(SMSNotifyActions.smsNotifyUpdateRequest(smsNotify)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SMSNotifyEntityEditScreen)
