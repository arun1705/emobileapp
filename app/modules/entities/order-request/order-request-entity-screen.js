import React from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { orderRequestEntityDetailScreen, orderRequestEntityEditScreen } from '../../../navigation/layouts'
import SearchBar from '../../../shared/components/search-bar/search-bar'
import OrderRequestActions from './order-request.reducer'
import styles from './order-request-entity-screen-style'
import AlertMessage from '../../../shared/components/alert-message/alert-message'

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

class OrderRequestEntityScreen extends React.PureComponent {
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
      callApi: false,
      callSearch: false
    }
    
  }

  componentDidMount(){
    this.fetchOrderRequests()
  }

  navigationButtonPressed({ buttonId }) {
    orderRequestEntityEditScreen({ entityId: null })
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
      <TouchableOpacity onPress={orderRequestEntityDetailScreen.bind(this, { entityId: item.id })}>
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
  renderEmpty = () => <AlertMessage title="No OrderRequests Found" show={!this.props.fetching} />

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
      page: 0,
      sort: 'id,asc',
      size: 20,
      searchTerm: '',
      dataObjects: [],
      callApi: false
      
    })
     this.fetchOrderRequests()
  }

  performSearch = query => {
    if (query === '') {
      this.cancelSearch()
      return
    }
    this.setState({
      searchTerm: query,
      callSearch: true
    })

    this.props.performSearch(query)
  }
  fetchOrderRequests = () => {
    this.setState({
      callApi : true
    })
    this.props.getAllOrderRequests({ page: this.state.page, sort: this.state.sort, size: this.state.size })
  }

  componentDidUpdate(){

    if(this.state.searchTerm!='' && !this.props.searching && this.state.callSearch){
      
      setTimeout(()=>{this.setState({
        dataObjects: [].concat(this.props.orderRequests),
        callSearch: false
      })
        
      },300)
      
      
      
    }
      if(this.state.searchTerm === '' && !this.props.fetching && this.state.callApi){
        this.setState({
          dataObjects: this.state.dataObjects.concat(this.props.orderRequests)
        })
        this.setState({
          callApi: false
        })
      }
    

    
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
        this.fetchOrderRequests()
      },
    )
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.orderRequests) {
      return {
        done: nextProps.orderRequests.length < prevState.size,
      }
    }
    return null
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.orderRequests) {
  //     return {
  //       done: nextProps.orderRequests.length < prevState.size,
  //       dataObjects: [...prevState.dataObjects, ...nextProps.orderRequests],
  //     }
  //   }
  //   return null
  // }

  render() {
    return (
      <View style={styles.container} testID="orderRequestScreen">
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.state.dataObjects}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0}
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
    orderRequests: state.orderRequests.orderRequests,
    fetching: state.orderRequests.fetchingAll,
    error: state.orderRequests.errorAll,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    performSearch: query => dispatch(OrderRequestActions.orderRequestSearchRequest(query)),
    getAllOrderRequests: options => dispatch(OrderRequestActions.orderRequestAllRequest(options)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderRequestEntityScreen)
