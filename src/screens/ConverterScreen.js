import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import axios from "axios";
import DropDownPicker from 'react-native-dropdown-picker';

import colors from '../config/color';

import Screen from "../components/Screen";
import Icon from '../components/Icon';

const ConverterScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);

  const [info, setInfo] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("eur");
  const [output, setOutput] = useState(0);

  const init = async () => {
    setLoading(true);

    await axios.get('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json')
      .then(res => {
        setInfo(res.data)
        setLoading(false)
      })
      .catch(err => console.log('Error get currencies', err))
      .finally(() => setLoading(false));

    navigation.addListener('blur', () => {
      setOpen(false);
    })
  }

  const getCurrency = async () => {
    await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}/${to}.json`)
      .then(res => {
        const rate = res.data[to];

        setOutput(amount * rate);
      })
      .catch(err => console.log('Error get currencies', err))
  }

  useEffect(() => {
    init();
  }, [])

  useEffect(() => {
    convertCurrencies();
  }, [info])

  useEffect(() => {
    getCurrency();
  }, [amount, from, to])

  const convertCurrencies = () => {
    const arr = [];

    for (let key in info) {
      arr.push({
        label: key.toUpperCase(),
        value: key
      })
    }

    setCurrencies(arr);
  }

  const onPress = () => {
    setLoading(true);

    setFrom(to);
    setTo(from);

    setTimeout(() => {
      setLoading(false);
    }, 100)
  }

  return (
    <Screen>
      {isLoading ?
        <View style={styles.indicator}>
          <ActivityIndicator color="#260587" />
        </View>
      :
        <View>
          <View style={styles.field}>
            <Text style={styles.label}>Amount</Text>
            <TextInput
              onChangeText={(val) =>setAmount(val)}
              style={styles.container}
              value={amount.toString()}
            />
          </View>

          <View style={styles.wrapField}>
            <View style={styles.fieldDropDown}>
              <Text style={[styles.label, styles.labelDropDown]}>From</Text>
              <DropDownPicker
                items={currencies}
                loading={isLoading}
                open={open}
                setOpen={setOpen}
                setValue={setFrom}
                value={from}
              />
            </View>

            <TouchableOpacity
              onPress={onPress}
              style={[styles.field, styles.icon]}
            >
              <Icon
                name={'retweet'}
                size={40}
                color={'#246779'}
              />
            </TouchableOpacity>

            <View style={styles.fieldDropDown}>
              <Text style={[styles.label, styles.labelDropDown]}>To</Text>
              <DropDownPicker
                activityIndicatorColor="red"
                items={currencies}
                loading={isLoading}
                open={openSecond}
                setOpen={setOpenSecond}
                setValue={setTo}
                value={to}
              />
            </View>
          </View>

          <Text style={styles.convertInfo}>
            {amount} {from.toUpperCase()} - {output.toFixed(2)} {to.toUpperCase()}
          </Text>
          <View style={styles.button}>
            <Button onPress={() => navigation.goBack()} title="Go back home" />
          </View>
        </View>
      }
    </Screen>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    marginVertical: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  convertInfo: {
    marginBottom: 50,
    fontSize: 25,
    textAlign: 'center',
    color: colors.dark,
  },
  field: {
    marginBottom: 5,
  },
  fieldDropDown: {
    flex: 1,
  },
  icon: {
    marginHorizontal: 10,
  },
  indicator: {
    flex: 1,
    justifyContent: "center"
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.dark
  },
  labelDropDown: {
    marginBottom: 15,
  },
  wrapField: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 40,
    zIndex: 1
  }
})

export default ConverterScreen;
