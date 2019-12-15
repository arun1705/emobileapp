import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight, View } from 'react-native'
import { connect } from 'react-redux'
import OrderDetailActions from './order-details.reducer'
import OrderRequestActions from '../order-request/order-request.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { orderDetailEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './order-details-entity-edit-screen-style'

let Form = t.form.Form

class OrderDetailEntityEditScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      formModel: t.struct({
        id: t.maybe(t.Number),
        orderReqId: t.maybe(t.Number),
        productId: t.maybe(t.Number),
        quantity: t.maybe(t.Number),
        catBPoint: t.maybe(t.Number),
        catBPCount: t.maybe(t.Number),
        catTypeBPointId: t.maybe(t.Number),
        catTypeBPCount: t.maybe(t.Number),
        prodBPointId: t.maybe(t.Number),
        prodBPCount: t.maybe(t.Number),
        productPointId: t.maybe(t.Number),
        prodPCount: t.maybe(t.Number),
        curncyPointId: t.maybe(t.Number),
        curncyBPointId: t.maybe(t.Number),
        productValue: t.maybe(t.Number),
        createdBy: t.maybe(t.Number),
        createdOn: t.maybe(t.Date),
        modifiedBy: t.maybe(t.Number),
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
            onSubmitEditing: () => this.form.getComponent('productId').refs.input.focus(),
            testID: 'orderReqIdInput',
          },
          productId: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('quantity').refs.input.focus(),
            testID: 'productIdInput',
          },
          quantity: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('catBPoint').refs.input.focus(),
            testID: 'quantityInput',
          },
          catBPoint: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('catBPCount').refs.input.focus(),
            testID: 'catBPointInput',
          },
          catBPCount: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('catTypeBPointId').refs.input.focus(),
            testID: 'catBPCountInput',
          },
          catTypeBPointId: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('catTypeBPCount').refs.input.focus(),
            testID: 'catTypeBPointIdInput',
          },
          catTypeBPCount: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('prodBPointId').refs.input.focus(),
            testID: 'catTypeBPCountInput',
          },
          prodBPointId: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('prodBPCount').refs.input.focus(),
            testID: 'prodBPointIdInput',
          },
          prodBPCount: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('productPointId').refs.input.focus(),
            testID: 'prodBPCountInput',
          },
          productPointId: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('prodPCount').refs.input.focus(),
            testID: 'productPointIdInput',
          },
          prodPCount: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('curncyPointId').refs.input.focus(),
            testID: 'prodPCountInput',
          },
          curncyPointId: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('curncyBPointId').refs.input.focus(),
            testID: 'curncyPointIdInput',
          },
          curncyBPointId: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('productValue').refs.input.focus(),
            testID: 'curncyBPointIdInput',
          },
          productValue: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('createdBy').refs.input.focus(),
            testID: 'productValueInput',
          },
          createdBy: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('createdOn').refs.input.focus(),
            testID: 'createdByInput',
          },
          createdOn: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('modifiedBy').refs.input.focus(),
            testID: 'createdOnInput',
          },
          modifiedBy: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.form.getComponent('modifiedOn').refs.input.focus(),
            testID: 'modifiedByInput',
          },
          modifiedOn: {
            testID: 'modifiedOnInput',
          },
        },
      },
      orderDetail: {},
      isNewEntity: true,
    }
    if (props.data && props.data.entityId) {
      this.state.isNewEntity = false
      this.props.getOrderDetail(props.data.entityId)
    }
    this.props.getAllOrderRequests()

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.orderDetail !== prevState.orderDetail && !prevState.isNewEntity) {
      return { formValue: entityToFormValue(nextProps.orderDetail), orderDetail: nextProps.orderDetail }
    }
    return null
  }
  componentDidUpdate(prevProps) {
    if (prevProps.updating && !this.props.updating) {
      if (this.props.error) {
        Alert.alert('Error', 'Something went wrong updating the entity', [{ text: 'OK' }])
      } else {
        this.props.getAllOrderDetails({ page: 0, sort: 'id,asc', size: 20 })
        const entityId = this.props.orderDetail.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: orderDetailEntityDetailScreen.bind(this, { entityId }),
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
    const orderDetail = this.form.getValue()
    if (orderDetail) {
      // if validation fails, value will be null
      this.props.updateOrderDetail(formValueToEntity(orderDetail))
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
    productId: value.productId || null,
    quantity: value.quantity || null,
    catBPoint: value.catBPoint || null,
    catBPCount: value.catBPCount || null,
    catTypeBPointId: value.catTypeBPointId || null,
    catTypeBPCount: value.catTypeBPCount || null,
    prodBPointId: value.prodBPointId || null,
    prodBPCount: value.prodBPCount || null,
    productPointId: value.productPointId || null,
    prodPCount: value.prodPCount || null,
    curncyPointId: value.curncyPointId || null,
    curncyBPointId: value.curncyBPointId || null,
    productValue: value.productValue || null,
    createdBy: value.createdBy || null,
    createdOn: value.createdOn || null,
    modifiedBy: value.modifiedBy || null,
    modifiedOn: value.modifiedOn || null,
    orderRequestId: value.orderRequestId || null,
  }
}
const formValueToEntity = value => {
  const entity = {
    id: value.id || null,
    orderReqId: value.orderReqId || null,
    productId: value.productId || null,
    quantity: value.quantity || null,
    catBPoint: value.catBPoint || null,
    catBPCount: value.catBPCount || null,
    catTypeBPointId: value.catTypeBPointId || null,
    catTypeBPCount: value.catTypeBPCount || null,
    prodBPointId: value.prodBPointId || null,
    prodBPCount: value.prodBPCount || null,
    productPointId: value.productPointId || null,
    prodPCount: value.prodPCount || null,
    curncyPointId: value.curncyPointId || null,
    curncyBPointId: value.curncyBPointId || null,
    productValue: value.productValue || null,
    createdBy: value.createdBy || null,
    createdOn: value.createdOn || null,
    modifiedBy: value.modifiedBy || null,
    modifiedOn: value.modifiedOn || null,
    orderRequestId: value.orderRequestId || null,
  }
  return entity
}

const mapStateToProps = state => {
  return {
    orderRequests: state.orderRequests.orderRequests || [],
    orderDetail: state.orderDetails.orderDetail,
    fetching: state.orderDetails.fetchingOne,
    updating: state.orderDetails.updating,
    error: state.orderDetails.errorUpdating,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllOrderRequests: options => dispatch(OrderRequestActions.orderRequestAllRequest(options)),
    getOrderDetail: id => dispatch(OrderDetailActions.orderDetailRequest(id)),
    getAllOrderDetails: options => dispatch(OrderDetailActions.orderDetailAllRequest(options)),
    updateOrderDetail: orderDetail => dispatch(OrderDetailActions.orderDetailUpdateRequest(orderDetail)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderDetailEntityEditScreen)
