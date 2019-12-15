import React from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { ordDtlTranEntityDetailScreen, ordDtlTranEntityEditScreen } from '../../../navigation/layouts'
import SearchBar from '../../../shared/components/search-bar/search-bar'
import OrdDtlTranActions from './ord-dtl-trans.reducer'
import styles from './ord-dtl-trans-entity-screen-style'
import AlertMessage from '../../../shared/components/alert-message/alert-message'

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

class OrdDtlTranEntityScreen extends React.PureComponent {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)

    /* ***********************************************************
     * STEP 1
     * This is an array of objects with the properties you desire
     * Usually this should come from Redux mapStateToProps
     *************************************************************/
    this.state = {
      page: 0,
      sort: 'id,asc',
      size: 20,
      done: false,
      searchTerm: '',
      dataObjects: [],
    }
    this.fetchOrdDtlTrans()
  }

  navigationButtonPressed({ buttonId }) {
    ordDtlTranEntityEditScreen({ entityId: null })
  }
  /* ***********************************************************
  * STEP 2
  * `renderRow` function. How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={item.title} description={item.description} />
  *************************************************************/
  renderRow({ item }) {
    return (
      <TouchableOpacity onPress={ordDtlTranEntityDetailScreen.bind(this, { entityId: item.id })}>
        <View style={styles.row}>
          <Text style={styles.boldLabel}>{item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    )
  }

  /* ***********************************************************
   * STEP 3
   * Consider the configurations we've set below.  Customize them
   * to your liking!  Each with some friendly advice.
   *************************************************************/
  // Render a header?
  renderHeader = () => <SearchBar onSearch={this.performSearch} searchTerm={this.state.searchTerm} onCancel={this.cancelSearch} />

  // Render a footer?
  // renderFooter = () =>
  //  <Text style={[styles.label, styles.sectionHeader]}> - Footer - </Text>

  // Show this when data is empty
  renderEmpty = () => <AlertMessage title="No OrdDtlTrans Found" show={!this.props.fetching} />

  // renderSeparator = () =>
  //  <Text style={styles.label}> - ~~~~~ - </Text>

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => `${index}`

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  // extraData is for anything that is not indicated in data
  // for instance, if you kept "favorites" in `this.state.favs`
  // pass that in, so changes in favorites will cause a re-render
  // and your renderItem will have access to change depending on state
  // e.g. `extraData`={this.state.favs}

  // Optimize your list if the height of each item can be calculated
  // by supplying a constant height, there is no need to measure each
  // item after it renders.  This can save significant time for lists
  // of a size 100+
  // e.g. itemLayout={(data, index) => (
  //   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
  // )}

  cancelSearch = () => {
    this.setState({
      searchTerm: '',
    })
    this.fetchOrdDtlTrans()
  }

  performSearch = query => {
    if (query === '') {
      this.cancelSearch()
      return
    }
    this.setState({
      searchTerm: query,
    })
    this.props.performSearch(query)
  }
  fetchOrdDtlTrans = () => {
    this.props.getAllOrdDtlTrans({ page: this.state.page, sort: this.state.sort, size: this.state.size })
  }

  handleLoadMore = () => {
    if (this.state.done || this.props.fetching) {
      return
    }
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        this.fetchOrdDtlTrans()
      },
    )
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.ordDtlTrans) {
      return {
        done: nextProps.ordDtlTrans.length < prevState.size,
        dataObjects: [...prevState.dataObjects, ...nextProps.ordDtlTrans],
      }
    }
    return null
  }

  render() {
    return (
      <View style={styles.container} testID="ordDtlTranScreen">
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.state.dataObjects}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          onEndReached={this.handleLoadMore}
          ListHeaderComponent={this.renderHeader}
          /* ListFooterComponent={this.renderFooter} */
          ListEmptyComponent={this.renderEmpty}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    // ...redux state to props here
    ordDtlTrans: state.ordDtlTrans.ordDtlTrans,
    fetching: state.ordDtlTrans.fetchingAll,
    error: state.ordDtlTrans.errorAll,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    performSearch: query => dispatch(OrdDtlTranActions.ordDtlTranSearchRequest(query)),
    getAllOrdDtlTrans: options => dispatch(OrdDtlTranActions.ordDtlTranAllRequest(options)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrdDtlTranEntityScreen)
