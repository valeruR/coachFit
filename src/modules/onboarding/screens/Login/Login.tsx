import React, { useState, useEffect, useContext } from 'react';
import {
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { Context } from '../../../../utils/context';

import { fitClassBackground } from '../../../../assets';

import InputModalOverlay from '../../components/InputModalOverlay';

const Login = () => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const context = useContext(Context);

  // Handle user state changes
  function onAuthStateChanged(u: FirebaseAuthTypes.User | null) {
    context?.setUser(u);
  }

  const onValidateCredentials = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log('User account created & signed in!');
        console.log('res:', res);
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          auth()
            .signInWithEmailAndPassword(email, password)
            .then((res) => {
              console.log('Sign in attempt');
              console.log('res:', res);
            });
        } else if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        } else {
          console.error(error);
        }
      });
    setShowModal(false);
    setStep(1);
    setPassword('');
  };

  function onValidateEmail() {
    const expression =
      /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    const isEmailValid = expression.test(String(email).toLowerCase());
    if (emailError !== !isEmailValid) {
      setEmailError(!isEmailValid);
    }
    if (isEmailValid) {
      setStep(2);
    }
  }

  function onValidatePassword() {
    const isPasswordValid = password.length >= 8;
    if (passwordError !== !isPasswordValid) {
      setPasswordError(!isPasswordValid);
    }
    if (isPasswordValid) {
      onValidateCredentials();
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ImageBackground source={fitClassBackground} style={styles.background}>
      {showModal ? (
        <>
          {step === 1 ? (
            <InputModalOverlay
              title="Quel est votre email?"
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              setValue={setEmail}
              onPressBack={() => {
                setShowModal(false);
                setEmailError(false);
              }}
              validate={onValidateEmail}
              error={emailError}
              errorText={'Email incorrect'}
            />
          ) : (
            <InputModalOverlay
              title="Quel est votre mot de passe?"
              placeholder="Mot de passe"
              value={password}
              setValue={setPassword}
              onPressBack={() => {
                setStep(1);
                setPasswordError(false);
              }}
              validate={onValidatePassword}
              error={passwordError}
              errorText={'Mot de passe incorrect: 8 caractères minimum'}
              secureTextEntry={true}
            />
          )}
        </>
      ) : (
        <SafeAreaView>
          <View style={styles.sectionContainer}>
            <Text style={styles.logoText}>FITCLASS</Text>
            <Text style={styles.text}>WORKOUT EVERYWHERE</Text>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.button}
              onPress={() => setShowModal(true)}
            >
              <Text style={styles.buttonText}>{'Sign in with email'}</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  // Login
  background: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
  },
  logoText: {
    color: 'white',
    fontSize: 20,
    letterSpacing: 1,
    fontWeight: 'bold',
  },
  button: {
    padding: 10,
    borderRadius: 10,
    width: '80%',
    backgroundColor: '#fb7185',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    padding: 15,
    letterSpacing: 1,
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    spacing: 10,
    alignItems: 'center',
    flexDirection: 'column',
    paddingBottom: 50,
  },
});

export default Login;
