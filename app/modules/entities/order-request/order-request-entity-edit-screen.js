import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight, View } from 'react-native'
import { connect } from 'react-redux'
import OrderRequestActions from './order-request.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { orderRequestEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './order-request-entity-edit-screen-style'

let Form = t.form.Form

class OrderRequestEntityEditScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      formModel: t.struct({
        id: t.maybe(t.Number),
        mobile: t.String,
        registered: t.Boolean,
        userId: t.maybe(t.Number),
        countryId: t.maybe(t.Number),
        stateId: t.maybe(t.Number),
        cityId: t.maybe(t.Number),
        pincodeId: t.maybe(t.Number),
        areaId: t.maybe(t.Number),
        status: t.maybe(t.String),
        active: t.maybe(t.Boolean),
        createdBy: t.maybe(t.Number),
        createdOn: t.maybe(t.Date),
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true,
          },
          mobile: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('registered').refs.input.focus(),
            testID: 'mobileInput',
          },
          registered: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('userId').refs.input.focus(),
            testID: 'registeredInput',
          },
          userId: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('countryId').refs.input.focus(),
            testID: 'userIdInput',
          },
          countryId: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('stateId').refs.input.focus(),
            testID: 'countryIdInput',
          },
          stateId: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('cityId').refs.input.focus(),
            testID: 'stateIdInput',
          },
          cityId: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('pincodeId').refs.input.focus(),
            testID: 'cityIdInput',
          },
          pincodeId: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('areaId').refs.input.focus(),
            testID: 'pincodeIdInput',
          },
          areaId: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('status').refs.input.focus(),
            testID: 'areaIdInput',
          },
          status: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('active').refs.input.focus(),
            testID: 'statusInput',
          },
          active: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('createdBy').refs.input.focus(),
            testID: 'activeInput',
          },
          createdBy: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('createdOn').refs.input.focus(),
            testID: 'createdByInput',
          },
          createdOn: {
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitForm(),
            testID: 'createdOnInput',
          },
        },
      },
      orderRequest: {},
      isNewEntity: true,
    }
    if (props.data && props.data.entityId) {
      this.state.isNewEntity = false
      this.props.getOrderRequest(props.data.entityId)
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.orderRequest !== prevState.orderRequest && !prevState.isNewEntity) {
      return { formValue: entityToFormValue(nextProps.orderRequest), orderRequest: nextProps.orderRequest }
    }
    return null
  }
  componentDidUpdate(prevProps) {
    if (prevProps.updating && !this.props.updating) {
      if (this.props.error) {
        Alert.alert('Error', 'Something went wrong updating the entity', [{ text: 'OK' }])
      } else {
        this.props.getAllOrderRequests({ page: 0, sort: 'id,asc', size: 20 })
        const entityId = this.props.orderRequest.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: orderRequestEntityDetailScreen.bind(this, { entityId }),
          })
        }
        Navigation.pop(this.props.componentId)
        Alert.alert('Success', 'Entity saved successfully', alertOptions)
      }
    }
  }

  submitForm() {
    // call getValue() to get the values of the form
    const orderRequest = this.form.getValue()
    if (orderRequest) {
      // if validation fails, value will be null
      this.props.updateOrderRequest(formValueToEntity(orderRequest))
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
    mobile: value.mobile || null,
    registered: value.registered || null,
    userId: value.userId || null,
    countryId: value.countryId || null,
    stateId: value.stateId || null,
    cityId: value.cityId || null,
    pincodeId: value.pincodeId || null,
    areaId: value.areaId || null,
    status: value.status || null,
    active: value.active || null,
    createdBy: value.createdBy || null,
    createdOn: value.createdOn || null,
  }
}
const formValueToEntity = value => {
  const entity = {
    id: value.id || null,
    mobile: value.mobile || null,
    registered: value.registered || null,
    userId: value.userId || null,
    countryId: value.countryId || null,
    stateId: value.stateId || null,
    cityId: value.cityId || null,
    pincodeId: value.pincodeId || null,
    areaId: value.areaId || null,
    status: value.status || null,
    active: value.active || null,
    createdBy: value.createdBy || null,
    createdOn: value.createdOn || null,
  }
  return entity
}

const mapStateToProps = state => {
  return {
    orderRequest: state.orderRequests.orderRequest,
    fetching: state.orderRequests.fetchingOne,
    updating: state.orderRequests.updating,
    error: state.orderRequests.errorUpdating,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrderRequest: id => dispatch(OrderRequestActions.orderRequestRequest(id)),
    getAllOrderRequests: options => dispatch(OrderRequestActions.orderRequestAllRequest(options)),
    updateOrderRequest: orderRequest => dispatch(OrderRequestActions.orderRequestUpdateRequest(orderRequest)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderRequestEntityEditScreen)
