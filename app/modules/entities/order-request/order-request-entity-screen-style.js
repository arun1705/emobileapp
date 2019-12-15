import { StyleSheet } from 'react-native'

import { ApplicationStyles, Metrics, Colors } from '../../../shared/themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  row: {  
    backgroundColor: Colors.fire,
    marginVertical: Metrics.smallMargin,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal:20,
    borderRadius:5,
    borderWidth:2,
    borderColor:Colors.fire,
    
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.snow,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin,
  },
  label: {
    textAlign: 'center',
    color: Colors.snow,
  },
  listContent: {
    marginTop: Metrics.baseMargin,
    paddingBottom:10
  },
})
