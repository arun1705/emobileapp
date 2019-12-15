import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight, View } from 'react-native'
import { connect } from 'react-redux'
import OrderPickUpActions from './order-pick-up.reducer'
import OrderRequestActions from '../order-request/order-request.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { orderPickUpEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './order-pick-up-entity-edit-screen-style'

let Form = t.form.Form

class OrderPickUpEntityEditScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      formModel: t.struct({
        id: t.maybe(t.Number),
        orderReqId: t.maybe(t.Number),
        empUserId: t.maybe(t.Number),
        customerUserId: t.maybe(t.Number),
        status: t.maybe(t.String),
        createdOn: t.maybe(t.Date),
        modifiedOn: t.maybe(t.Date),
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
            onSubmitEditing: () => this.form.getComponent('empUserId').refs.input.focus(),
            testID: 'orderReqIdInput',
          },
          empUserId: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('customerUserId').refs.input.focus(),
            testID: 'empUserIdInput',
          },
          customerUserId: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('status').refs.input.focus(),
            testID: 'customerUserIdInput',
          },
          status: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('createdOn').refs.input.focus(),
            testID: 'statusInput',
          },
          createdOn: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('modifiedOn').refs.input.focus(),
            testID: 'createdOnInput',
          },
          modifiedOn: {
            testID: 'modifiedOnInput',
          },
        },
      },
      orderPickUp: {},
      isNewEntity: true,
    }
    if (props.data && props.data.entityId) {
      this.state.isNewEntity = false
      this.props.getOrderPickUp(props.data.entityId)
    }
    this.props.getAllOrderRequests()

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.orderPickUp !== prevState.orderPickUp && !prevState.isNewEntity) {
      return { formValue: entityToFormValue(nextProps.orderPickUp), orderPickUp: nextProps.orderPickUp }
    }
    return null
  }
  componentDidUpdate(prevProps) {
    if (prevProps.updating && !this.props.updating) {
      if (this.props.error) {
        Alert.alert('Error', 'Something went wrong updating the entity', [{ text: 'OK' }])
      } else {
        this.props.getAllOrderPickUps({ page: 0, sort: 'id,asc', size: 20 })
        const entityId = this.props.orderPickUp.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: orderPickUpEntityDetailScreen.bind(this, { entityId }),
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
    const orderPickUp = this.form.getValue()
    if (orderPickUp) {
      // if validation fails, value will be null
      this.props.updateOrderPickUp(formValueToEntity(orderPickUp))
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
    empUserId: value.empUserId || null,
    customerUserId: value.customerUserId || null,
    status: value.status || null,
    createdOn: value.createdOn || null,
    modifiedOn: value.modifiedOn || null,
    orderRequestId: value.orderRequestId || null,
  }
}
const formValueToEntity = value => {
  const entity = {
    id: value.id || null,
    orderReqId: value.orderReqId || null,
    empUserId: value.empUserId || null,
    customerUserId: value.customerUserId || null,
    status: value.status || null,
    createdOn: value.createdOn || null,
    modifiedOn: value.modifiedOn || null,
    orderRequestId: value.orderRequestId || null,
  }
  return entity
}

const mapStateToProps = state => {
  return {
    orderRequests: state.orderRequests.orderRequests || [],
    orderPickUp: state.orderPickUps.orderPickUp,
    fetching: state.orderPickUps.fetchingOne,
    updating: state.orderPickUps.updating,
    error: state.orderPickUps.errorUpdating,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllOrderRequests: options => dispatch(OrderRequestActions.orderRequestAllRequest(options)),
    getOrderPickUp: id => dispatch(OrderPickUpActions.orderPickUpRequest(id)),
    getAllOrderPickUps: options => dispatch(OrderPickUpActions.orderPickUpAllRequest(options)),
    updateOrderPickUp: orderPickUp => dispatch(OrderPickUpActions.orderPickUpUpdateRequest(orderPickUp)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderPickUpEntityEditScreen)
