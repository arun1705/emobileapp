import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight, View } from 'react-native'
import { connect } from 'react-redux'
import OrderDocActions from './order-doc.reducer'
import OrderDetailsActions from '../order-details/order-details.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { orderDocEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './order-doc-entity-edit-screen-style'

let Form = t.form.Form

class OrderDocEntityEditScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      formModel: t.struct({
        id: t.maybe(t.Number),
        orderDetailId: t.maybe(t.Number),
        fileName: t.maybe(t.String),
        fileUrl: t.maybe(t.String),
        contentType: t.maybe(t.String),
        orderDetailsId: this.getOrderDetails(),
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true,
          },
          orderDetailsId: {
            testID: 'orderDetailsIdInput',
            label: 'OrderDetails',
          },
          orderDetailId: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('fileName').refs.input.focus(),
            testID: 'orderDetailIdInput',
          },
          fileName: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('fileUrl').refs.input.focus(),
            testID: 'fileNameInput',
          },
          fileUrl: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('contentType').refs.input.focus(),
            testID: 'fileUrlInput',
          },
          contentType: {
            testID: 'contentTypeInput',
          },
        },
      },
      orderDoc: {},
      isNewEntity: true,
    }
    if (props.data && props.data.entityId) {
      this.state.isNewEntity = false
      this.props.getOrderDoc(props.data.entityId)
    }
    this.props.getAllOrderDetails()

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.orderDoc !== prevState.orderDoc && !prevState.isNewEntity) {
      return { formValue: entityToFormValue(nextProps.orderDoc), orderDoc: nextProps.orderDoc }
    }
    return null
  }
  componentDidUpdate(prevProps) {
    if (prevProps.updating && !this.props.updating) {
      if (this.props.error) {
        Alert.alert('Error', 'Something went wrong updating the entity', [{ text: 'OK' }])
      } else {
        this.props.getAllOrderDocs({ page: 0, sort: 'id,asc', size: 20 })
        const entityId = this.props.orderDoc.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: orderDocEntityDetailScreen.bind(this, { entityId }),
          })
        }
        Navigation.pop(this.props.componentId)
        Alert.alert('Success', 'Entity saved successfully', alertOptions)
      }
    }
  }

  getOrderDetails = () => {
    const orderDetails = {}
    this.props.orderDetails.forEach(orderDetails => {
      orderDetails[orderDetails.id] = orderDetails.id ? orderDetails.id.toString() : orderDetails.id.toString()
    })
    return t.maybe(t.enums(orderDetails))
  }
  submitForm() {
    // call getValue() to get the values of the form
    const orderDoc = this.form.getValue()
    if (orderDoc) {
      // if validation fails, value will be null
      this.props.updateOrderDoc(formValueToEntity(orderDoc))
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
    orderDetailId: value.orderDetailId || null,
    fileName: value.fileName || null,
    fileUrl: value.fileUrl || null,
    contentType: value.contentType || null,
    orderDetailsId: value.orderDetailsId || null,
  }
}
const formValueToEntity = value => {
  const entity = {
    id: value.id || null,
    orderDetailId: value.orderDetailId || null,
    fileName: value.fileName || null,
    fileUrl: value.fileUrl || null,
    contentType: value.contentType || null,
    orderDetailsId: value.orderDetailsId || null,
  }
  return entity
}

const mapStateToProps = state => {
  return {
    orderDetails: state.orderDetails.orderDetails || [],
    orderDoc: state.orderDocs.orderDoc,
    fetching: state.orderDocs.fetchingOne,
    updating: state.orderDocs.updating,
    error: state.orderDocs.errorUpdating,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllOrderDetails: options => dispatch(OrderDetailsActions.orderDetailsAllRequest(options)),
    getOrderDoc: id => dispatch(OrderDocActions.orderDocRequest(id)),
    getAllOrderDocs: options => dispatch(OrderDocActions.orderDocAllRequest(options)),
    updateOrderDoc: orderDoc => dispatch(OrderDocActions.orderDocUpdateRequest(orderDoc)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderDocEntityEditScreen)
