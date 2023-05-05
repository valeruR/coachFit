import React, { Dispatch, SetStateAction } from 'react';
import {
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  KeyboardTypeOptions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type InputModalOverlayProps = {
  title: string;
  placeholder: string;
  value: string;
  onPressBack: () => void;
  setValue: Dispatch<SetStateAction<string>>;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  error: boolean;
  errorText: string;
  validate: () => void;
};

const InputModalOverlay = ({
  title,
  placeholder,
  value,
  onPressBack,
  setValue,
  secureTextEntry,
  keyboardType,
  error,
  errorText,
  validate,
}: InputModalOverlayProps) => {
  return (
    <>
      <View style={styles.backgroundOverlay} />
      <SafeAreaView style={styles.viewOverlay}>
        <TouchableOpacity onPress={onPressBack} style={styles.backButton}>
          <Icon name="arrow-left" size={30} color="white" />
        </TouchableOpacity>
        <View style={styles.inputView}>
          <Text style={styles.inputTitle}>{title}</Text>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            value={value}
            keyboardType={keyboardType || 'default'}
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            onChangeText={setValue}
          />
          {error && <Text style={styles.inputError}>{errorText}</Text>}
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.validateButton}
            onPress={validate}
          >
            <Text style={styles.buttonText}>{'Continuer'}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  backgroundOverlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.6,
    position: 'absolute',
    zIndex: 0,
    elevation: 0,
  },
  buttonText: {
    color: 'white',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 10,
  },
  validateButton: {
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
    width: '80%',
    backgroundColor: '#fb7185',
    alignItems: 'center',
  },
  viewOverlay: {
    width: '100%',
    height: '100%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputView: {
    width: 300,
    alignItems: 'center',
  },
  inputTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    paddingBottom: 40,
  },
  inputError: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'red',
    paddingTop: 10,
  },
  input: {
    width: '100%',
    height: 50,
    padding: 5,
    marginBottom: 0,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#fb7185',
  },
});

export default InputModalOverlay;
