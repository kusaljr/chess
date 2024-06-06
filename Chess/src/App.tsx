/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import nodejs from 'nodejs-mobile-react-native';
import React from 'react';

import {View} from 'react-native';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomComponent from './components/bottom';
import {Game} from './components/game';
import TopComponent from './components/top';
import {WebSocketProvider} from './hooks/chess';
function App(): React.JSX.Element {
  React.useEffect(() => {
    nodejs.start('main.js');

    nodejs.channel.post('start', 'START');
  });

  return (
    <GestureHandlerRootView>
      <WebSocketProvider>
        <View
          style={{
            backgroundColor: 'black',
            flex: 1,
            justifyContent: 'center',
          }}>
          <TopComponent />
          <Game />
          <BottomComponent />
        </View>
      </WebSocketProvider>
    </GestureHandlerRootView>
  );
}

export default App;
