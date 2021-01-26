import React from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Header from './../../Header/index';
import {GetDonor} from '../../store/action';
import {connect} from 'react-redux';
import {
  Form,
  Item,
  Input,
  Label,
  ListItem,
  //   Icon,
  CardItem,
  Card,
  Button,
  Radio,
  CheckBox,
  ActionSheet,
} from 'native-base';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

function HomeScreen(props) {
  const {navigation} = props;

  console.log(props.getDonors);
  return (
    <View
      style={{
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#c1cdd0',
      }}>
      {/* <Text style={{ padding: 20 }}>Home Screen</Text> */}
      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        style={{backgroundColor: 'blue', padding: 8, borderRadius: 4}}>
        <Text style={{color: 'white'}}>Toggle Drawer</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => props.GetDonor({Group: 'AB-'})}
        style={{
          backgroundColor: 'green',
          padding: 8,
          borderRadius: 4,
          marginTop: 20,
        }}>
        <Text style={{color: 'white'}}>Get Donor</Text>
      </TouchableOpacity>
      <ScrollView style={{marginTop: 25, marginBottom: 55}}>
        {props.getDonors?.map((v, i) => {
          return (
            <View style={{alignItems: 'center'}}>
              <Card style={{width: WIDTH - 20}} key={i}>
                <TouchableOpacity>
                  <CardItem>
                    {/* <Icon type="MaterialIcons" name="chevron-right" style={{ fontSize: 20, fontWeight: 'bold' }} /> */}
                    <Text style={{marginRight: 120}}>{v.name}</Text>
                    {/* <Right style={{ position: 'absolute', right: 15, flexDirection: 'row', flexWrap: 'wrap', }}>
                                            <Icon type="MaterialIcons" name="edit" style={{ fontSize: 35, color: 'green', marginRight: 10 }} onPress={() => editTodo(v, i)} />
                                            <Icon type="MaterialIcons" name="delete-forever" style={{ fontSize: 35, color: 'red', }} onPress={() => delTodo(i)} />
                                          </Right> */}
                  </CardItem>
                </TouchableOpacity>
              </Card>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {width: WIDTH, backgroundColor: '#ffffff'},
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

function mapStateToProp(state) {
  return {
    getDonors: state.root.getDonors,
  };
}
function mapDispatchToProp(dispatch) {
  return {
    GetDonor: (data) => {
      dispatch(GetDonor(data));
    },
  };
}

export default connect(mapStateToProp, mapDispatchToProp)(HomeScreen);
