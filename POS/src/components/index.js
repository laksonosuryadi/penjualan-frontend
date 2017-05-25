import React from 'react';

import { StackNavigator } from 'react-navigation';

import Home from './Home';

const App = StackNavigator({

  Home: {screen: Home},

}, {
  headerMode: 'none'
})

export default App;
