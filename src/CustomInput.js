import React from 'react';
import {View, Text, TextInput} from 'react-native';
// import {orangeColor} from '../App';


const CustomInput = ({
  label,
  placeholder,
  value,
  onChange,

}) => {
  return (
    <View style={{marginVertical: 5}}>
      <Text style={{color: 'red', fontWeight: 'bold'}}>{label}</Text>
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={onChange}
        style={{
          borderWidth: 0.5,
          borderColor: '#D0D0D0',
          padding: 10,
          borderRadius: 5,
        }}
      />
    </View>
  );
};

export default CustomInput;