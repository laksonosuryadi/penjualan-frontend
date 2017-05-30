import React from 'react';

import { StackNavigator } from 'react-navigation';

import Home from './Home';
import AllTransactions from './AllTransactions';

const App = StackNavigator({

  Home: {screen: Home},
  AllTransactions: {screen: AllTransactions}

}, {
  headerMode: 'none'
})

export default App;
