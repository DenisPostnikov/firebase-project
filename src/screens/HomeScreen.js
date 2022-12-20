import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from "react-native";
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import { SelectList } from 'react-native-dropdown-select-list'

import CardManager from "../managers/CardManager";

import Screen from "../components/Screen";
import Icon from '../components/Icon';
import CustomModal from '../components/Modal';
import CreateCardForm from "../components/CreateCardForm";

import colors from '../config/color';
import configStyles from '../config/styles';

const HomeScreen = ({ cardsStore }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = React.useState(null);

  const dataSelectList = [
    { key: 'delete', value:'Delete' }
  ]

  const init = async () => {
    try {
      await new CardManager().fetchCards();
    } catch (e) {
      console.error("Error get Cards: ", e)
    }
  }

  useEffect(() => {
    init();
  }, []);

  const onPress = () => {
    setModalVisible(true);
  }

  const hideModal = () => {
    setModalVisible(false);
  }

  const changeCardNumber = number => {
    return number.replace(/\d(?=(?:\D*\d){4})/g, '*');
  }

  const onPressSelectList = item => {
    if (selectedId === item.id) {
      setSelectedId(null);
    } else {
      setSelectedId(item.id);
    }
  }

  const setSelected = async (key, item) => {
    if (key === 'delete') {
      try {
        await new CardManager().deleteCard(item);
      } catch (e) {
        console.error("Error delete Card: ", e)
      }
    }
  }

  const renderCard = ({ item }) => {
    return (
      <View style={[
        styles.card,
        { backgroundColor: item.color }
      ]}>
        <View style={styles.cardHeader}>
          <Text style={configStyles.title}>{item.balance} $</Text>
          <View style={styles.cardCircle}>
            <TouchableOpacity onPress={() => onPressSelectList(item)} >
              <Icon
                name={'ellipsis-h'}
                color={colors.white}
                size={20}
              />
            </TouchableOpacity>

            <SelectList
              boxStyles={styles.boxStyles}
              data={dataSelectList}
              dropdownShown={selectedId === item.id}
              dropdownStyles={styles.dropdownStyles}
              dropdownItemStyles={styles.dropdownItemStyles}
              setSelected={key => setSelected(key, item)}
              search={false}
            />
          </View>
        </View>

        <Text style={configStyles.title}>{changeCardNumber(item.cardNumber)}</Text>
      </View>
    )
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
      </View>

        <FlatList
          data={toJS(cardsStore.cards)}
          keyExtractor={item => item.id.toString()}
          renderItem={renderCard}
        />

        <CustomModal
          modalVisible={modalVisible}
          customStyle={{ height: 550 }}
        >
          <CreateCardForm hideModal={hideModal} />
        </CustomModal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  boxStyles: {
    position: 'relative',
    right: -9999,
  },
  card: {
    flex: 1,
    justifyContent: 'space-between',
    height: 200,
    marginBottom: 20,
    padding: 15,
    borderRadius: 10
  },
  cardCircle: {
    width: 20,
    height: 20,
    alignItems: 'flex-end'
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: colors.secondary,
    borderRadius: 50
  },
  dropdownStyles: {
    position: 'absolute',
    top: -5,
    right: -10,
    width: 100,
    zIndex: 1000,
  },
  dropdownItemStyles: {
    padding: 5,
  },
  title: {
    fontSize: 27,
    fontWeight: '500',
    color: colors.dark
  },
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30
  }
})

export default inject('cardsStore')(observer(HomeScreen));
