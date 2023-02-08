import React from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,

  useColorScheme,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Provider } from 'react-redux'
import store from './AppModule/store/store';
import Home from './AppModule/Views/Home';
function App(): JSX.Element {

  return (
    <Provider store={store}>
      <Home />
    </Provider>

  );
}


export default App;
