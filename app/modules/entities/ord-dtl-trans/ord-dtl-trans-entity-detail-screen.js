import React from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { ordDtlTranEntityEditScreen } from '../../../navigation/layouts'

import OrdDtlTranActions from './ord-dtl-trans.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './ord-dtl-trans-entity-detail-screen-style'

class OrdDtlTranEntityDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.props.getOrdDtlTran(this.props.data.entityId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.deleting && !this.props.deleting) {
      if (this.props.errorDeleting) {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{ text: 'OK' }])
      } else {
        this.props.getAllOrdDtlTrans()
        Navigation.pop(this.props.componentId)
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete OrdDtlTran?',
      'Are you sure you want to delete the OrdDtlTran?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.props.deleteOrdDtlTran(this.props.data.entityId)
          },
        },
      ],
      { cancelable: false },
    )
  }

  render() {
    if (!this.props.ordDtlTran) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <Text>ID: {this.props.ordDtlTran.id}</Text>
        <Text testID="orderReqId">OrderReqId: {this.props.ordDtlTran.orderReqId}</Text>
        <Text testID="productId">ProductId: {this.props.ordDtlTran.productId}</Text>
        <Text testID="quantity">Quantity: {this.props.ordDtlTran.quantity}</Text>
        <Text testID="catBPoint">CatBPoint: {this.props.ordDtlTran.catBPoint}</Text>
        <Text testID="catBPCount">CatBPCount: {this.props.ordDtlTran.catBPCount}</Text>
        <Text testID="catTypeBPointId">CatTypeBPointId: {this.props.ordDtlTran.catTypeBPointId}</Text>
        <Text testID="catTypeBPCount">CatTypeBPCount: {this.props.ordDtlTran.catTypeBPCount}</Text>
        <Text testID="prodBPointId">ProdBPointId: {this.props.ordDtlTran.prodBPointId}</Text>
        <Text testID="prodBPCount">ProdBPCount: {this.props.ordDtlTran.prodBPCount}</Text>
        <Text testID="productPointId">ProductPointId: {this.props.ordDtlTran.productPointId}</Text>
        <Text testID="prodPCount">ProdPCount: {this.props.ordDtlTran.prodPCount}</Text>
        <Text testID="curncyPointId">CurncyPointId: {this.props.ordDtlTran.curncyPointId}</Text>
        <Text testID="curncyBPointId">CurncyBPointId: {this.props.ordDtlTran.curncyBPointId}</Text>
        <Text testID="productValue">ProductValue: {this.props.ordDtlTran.productValue}</Text>
        <Text testID="createdBy">CreatedBy: {this.props.ordDtlTran.createdBy}</Text>
        <Text testID="createdOn">CreatedOn: {String(this.props.ordDtlTran.createdOn)}</Text>
        <Text testID="modifiedBy">ModifiedBy: {this.props.ordDtlTran.modifiedBy}</Text>
        <Text testID="modifiedOn">ModifiedOn: {String(this.props.ordDtlTran.modifiedOn)}</Text>
        <RoundedButton text="Edit" onPress={ordDtlTranEntityEditScreen.bind(this, { entityId: this.props.ordDtlTran.id })} />
        <RoundedButton text="Delete" onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  return {
    ordDtlTran: state.ordDtlTrans.ordDtlTran,
    deleting: state.ordDtlTrans.deleting,
    errorDeleting: state.ordDtlTrans.errorDeleting,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrdDtlTran: id => dispatch(OrdDtlTranActions.ordDtlTranRequest(id)),
    getAllOrdDtlTrans: options => dispatch(OrdDtlTranActions.ordDtlTranAllRequest(options)),
    deleteOrdDtlTran: id => dispatch(OrdDtlTranActions.ordDtlTranDeleteRequest(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrdDtlTranEntityDetailScreen)
