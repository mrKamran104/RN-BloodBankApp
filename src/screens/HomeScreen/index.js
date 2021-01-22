import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from './../../Header/index';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');
export default function HomeScreen(props) {
  const { navigation } = props;
  return (
    <View
      style={{
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#c1cdd0',
      }}
      
      >
        {/* <View style={styles.container}>

        </View> */}
      <Text style={{ padding: 20 }}>Home Screen</Text>
      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        style={{ backgroundColor: 'blue', padding: 8, borderRadius: 4 }}>
        <Text style={{ color: 'white' }}>Toggle Drawer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: WIDTH, backgroundColor: '#ffffff' },
  contentContainer: {
    backgroundColor: '#f6f6f6',
    flex: 1,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  searchContainer: {
    padding: 32,
  },
});
