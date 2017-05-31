import React from 'react';

import { StackNavigator } from 'react-navigation';

import Home from './Home';
import AllTransactions from './AllTransactions';
import TodayTransactions from './TodayTransactions';
import TransactionsByDate from './TransactionsByDate';

const App = StackNavigator({

  Home: {screen: Home},
  AllTransactions: {screen: AllTransactions},
  TodayTransactions: {screen: TodayTransactions},
  TransactionsByDate: {screen: TransactionsByDate}

}, {
  headerMode: 'none'
})

export default App;
