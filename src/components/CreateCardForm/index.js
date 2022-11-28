import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import firestore from '@react-native-firebase/firestore';

import Icon from "../Icon";
import colors from "../../config/color";
import RadioButton from "../RadioButton";
import FormInput from "../FormInput";
import ErrorMessage from "../ErrorMessage";

const CreateCardForm = ({ hideModal }) => {
  const init = async () => {
    const events = await firestore()
      .collection('cards')
      .get()
      .then(querySnapshot => {
        querySnapshot.docs.map(doc => {
          console.log('LOG 1', doc.data());
          return doc.data();
        });
      });


    console.log(999, events, 'obj')
  }

  useEffect(() => {
    init();
  }, [])

  const dataColors = [
    { id: 1, value: 'blue' },
    { id: 2, value: 'cyan' },
    { id: 3, value: 'pink' },
    { id: 4, value: 'dark-blue' },
  ];

  const [color, setColor] = useState({
    color: dataColors[0].value
  });

  const cardNumberRegExp = /(?:\d[ ]*?){16}/;
  const validationSchema = Yup.object().shape({
    cardNumber: Yup.string()
      .matches(cardNumberRegExp, 'Credit Card number is invalid')
      .required('Credit Card number is empty'),
    balance: Yup.number().required('Balance is empty')
  })

  const onChangeInput = val => {
    return val.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim();
  }

  const onSelect = color => {
    setColor({ color })
  }

  const onSubmit = values => {
    const obj = {
      ...values,
      ...color,
      createdAt: firestore.FieldValue.serverTimestamp(),
    }

    firestore()
      .collection('cards')
      .add(obj)
      .then(() => hideModal())
      .catch(e => console.log('Error add firestore', e));
  }

  return (
    <Formik
      initialValues={{ cardNumber: '', balance: ''  }}
      onSubmit={values => onSubmit(values)}
      validationSchema={validationSchema}
    >
      {({
          setFieldValue,
          handleBlur,
          handleSubmit,
          touched,
          values,
          errors
      }) => {
        return (
          <View style={styles.wrap}>
            <View style={styles.header}>
              <Text style={styles.title}>New Card</Text>
              <TouchableOpacity onPress={hideModal}>
                <Icon
                  name={'times'}
                  color={'gray'}
                  size={25}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.labelWrap}>
              <Text style={styles.label}>Color</Text>
              <RadioButton
                data={dataColors}
                defaultValue={dataColors[0].value}
                onSelect={onSelect}
              />
            </View>

            <View style={styles.labelWrap}>
              <Text style={styles.label}>
                <Text style={{ color: colors.danger }}> * </Text>
                Card number
              </Text>
              <FormInput
                keyboardType='numeric'
                maxLength={19}
                onChangeText={value => {
                  const number = onChangeInput(value);
                  setFieldValue('cardNumber', number);
                }}
                onBlur={handleBlur('cardNumber')}
                placeholder='1111 1111 1111 1111'
                value={values.cardNumber}
              />

              <ErrorMessage error={errors['cardNumber']} visible={touched['cardNumber']}/>
            </View>

            <View style={styles.labelWrap}>
              <Text style={styles.label}>
                <Text style={{ color: colors.danger }}> * </Text>
                Current balance
              </Text>
              <FormInput
                keyboardType='numeric'
                onChangeText={value => {
                  if (!isNaN(value)) {
                    setFieldValue('balance', value);
                  }
                }}
                onBlur={handleBlur('balance')}
                placeholder='1000'
                value={values.balance}
              />

              <ErrorMessage error={errors['balance']} visible={touched['balance']}/>
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.button}
            >
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
        )
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    marginTop: 'auto',
    padding: 15,
    backgroundColor: colors.primary,
    borderRadius: 15
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,
    paddingBottom: 10,
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 2,
  },
  labelWrap: {
    marginBottom: 30,
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
  },
  title: {
    fontSize: 27,
    fontWeight: '500',
    color: colors.dark
  },
  wrap: {
    flex: 1,
    padding: 15
  }
});

export default CreateCardForm;
