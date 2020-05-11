import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = (props) => {
  return (
      <TouchableOpacity style={[styles.button, {backgroundColor:`${props.color}`}, props.style]} onPress={props.onPress}>
          <Text style={styles.buttonText}>{props.title}</Text>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
button:{
    alignItems:"center",
    justifyContent:"center",
    paddingVertical:16,
    borderRadius:6,
    marginTop:20,
    shadowColor: "#44475A",
    shadowOffset: {
        width: 0,
        height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
},
buttonText:{
    fontSize:18,
    fontWeight:"bold",
    fontFamily:'Poppins',
    color:'#FFFF'
}
});

export default Button;