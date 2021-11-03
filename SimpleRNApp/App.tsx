/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RNModal from 'react-native-modal';
//@ts-ignore
import {ModalView} from 'react-native-ios-modal';

const Stack = createStackNavigator();

import React, {useEffect, useRef} from 'react';
import {
  Alert,
  Button,
  Dimensions,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {useState} from 'react';
import {Modalize} from 'react-native-modalize';

const Section: React.FC<{
  title: string;
}> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const Home = ({navigation}: any) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Button
        title="呵呵呵"
        onPress={() => navigation.navigate('Profile', {name: 'Jane'})}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export const useModalState = (initialState: any) => {
  const [modalVisible, setModalVisible] = useState(initialState);
  const [forceModalVisible, setForceModalVisible] = useState(false);

  const setModal = (modalState: any) => {
    // tyring to open "already open" modal
    if (modalState && modalVisible) {
      setForceModalVisible(true);
    }
    setModalVisible(modalState);
  };

  useEffect(() => {
    if (forceModalVisible && modalVisible) {
      setModalVisible(false);
    }
    if (forceModalVisible && !modalVisible) {
      setForceModalVisible(false);
      setModalVisible(true);
    }
  }, [forceModalVisible, modalVisible]);

  return [modalVisible, setModal];
};

function HomeScreen({navigation}: any) {
  const [visible, setVisible] = useModalState(false);
  const modalizeRef = useRef<Modalize>(null);
  const modalRef = useRef<any>(null);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 30}}>This is the home screen!</Text>
      <Button
        onPress={() => navigation.navigate('MyModal')}
        title="Open Modal"
      />
      <Button
        onPress={() => navigation.navigate('Details')}
        title="Open Details"
      />
      <Button onPress={() => setVisible(true)} title="Open Native Modal" />
      <Button
        onPress={() => modalRef.current.setVisibility(true)}
        title="Open Native Modal 2"
      />
      {/* <Modal
        presentationStyle="pageSheet"
        onRequestClose={() => setVisible(false)}
        animationType="slide"
        onDismiss={() => setVisible(false)}
        visible={visible}>
          
        <TouchableWithoutFeedback
          // for bug which prevents dismiss from firing on swipe close
          // https://github.com/facebook/react-native/issues/26892
          onPressOut={() => setVisible(false)}>
          <SafeAreaView>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Button
                onPress={() => modalizeRef.current?.open()}
                title="Open Native Modal 2"
              />

              <Button onPress={() => setVisible(false)} title="Dismiss" />
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </Modal> */}
      <ModalView
        isModalBGBlurred={false}
        isModalBGTransparent={false}
        ref={(r: any) => (modalRef.current = r)}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text> Hello World !!!!</Text>
        </View>
      </ModalView>
    </View>
  );
}

function DetailsScreen() {
  return (
    <View>
      <Text>Details</Text>
    </View>
  );
}

function ModalScreen({navigation}: any) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 30}}>This is a modal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

function MainStackScreen() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen name="Details" component={DetailsScreen} />
    </MainStack.Navigator>
  );
}

function RootStackScreen() {
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="Main"
        component={MainStackScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="MyModal"
        component={ModalScreen}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );
}
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
export function App2() {
  return (
    <View>
      <Text>asdf</Text>
    </View>
  );
}
export default App;
