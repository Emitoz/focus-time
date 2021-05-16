import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from "../../components/RoundedButton";
import { colors } from '../../utils/colors';
import { fontSizes, spacing } from "../../utils/sizes";

export const Focus = ({ addSubject }) => {

  const [ subject, setSubject ] = useState(null);

  const handleInputChange = ({ nativeEvent }) => {
    setSubject(nativeEvent.text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>What would you like to focus on?</Text>
        <View style={styles.inputContainer}>
          <TextInput 
            placeholder="New focus item"
            style={styles.textInput} 
            onSubmitEditing={handleInputChange} />
          <RoundedButton size={50} title="+" onPress={ () => addSubject(subject) }></RoundedButton>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 0.1,
    padding: spacing.md,
    justifyContent: 'center',
  },
  title: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: 'center'
  },
  inputContainer: {
    paddingTop: spacing.lg,
    flexDirection: 'row',
  },
  textInput: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderRadius: 30,
    backgroundColor: `${colors.white}20`,
    borderColor: `${colors.white}80`,
    borderWidth: .5,
    color: 'white',
    flex: 1,
    marginRight: spacing.sm,
    height: 50,
  }
});