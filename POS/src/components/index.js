import React from 'react';

import { StackNavigator } from 'react-navigation';

import Home from './Home';
import AllTransactions from './AllTransactions';
import TodayTransactions from './TodayTransactions';

const App = StackNavigator({

  Home: {screen: Home},
  AllTransactions: {screen: AllTransactions},
  TodayTransactions: {screen: TodayTransactions}

}, {
  headerMode: 'none'
})

export default App;
