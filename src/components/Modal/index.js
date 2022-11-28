import React from "react";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";

const CustomModal = ({ children, modalVisible, customStyle }) => {
  return (
    <Modal
      animationInTiming={500}
      animationOutTiming={700}
      isVisible={modalVisible}
    >
      <View style={[styles.wrap, customStyle]}>
        {children}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrap: {
    marginTop: 22,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
});

export default CustomModal;
