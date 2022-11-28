import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import Screen from "../components/Screen";
import Icon from '../components/Icon';
import CustomModal from '../components/Modal';
import CreateCardForm from "../components/CreateCardForm";

import colors from '../config/color'

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const onPress = () => {
    setModalVisible(true);
  }

  const hideModal = () => {
    setModalVisible(false);
  }

  return (
    <Screen>
      <View style={styles.wrap}>
        <Text style={styles.title}>My wallet</Text>
        <TouchableOpacity
          onPress={onPress}
          style={styles.circle}
        >
          <Icon
            name={'plus'}
            color={'white'}
            size={20}
          />
        </TouchableOpacity>

        <CustomModal
          modalVisible={modalVisible}
          customStyle={{ height: 550 }}
        >
          <CreateCardForm hideModal={hideModal} />
        </CustomModal>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: colors.secondary,
    borderRadius: 50
  },
  title: {
    fontSize: 27,
    fontWeight: '500',
    color: colors.dark
  },
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

export default HomeScreen;
