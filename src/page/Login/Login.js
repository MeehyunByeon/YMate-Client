import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity,Pressable } from 'react-native';
import Signup from '../Signup/Signup';
import Main from '../Main/Main';
import Password from '../Password/Password';

const Login = ({ navigation }) => {
    const [studentId, setStudentId] = useState('');
  const [pwd, setpwd] = useState('');

  const handleLogin = () => {
    if (!studentId || !pwd) {
      alert('학번과 비밀번호를 모두 입력해주세요.');
        navigation.navigate('Main');
      return;
    }
    // const apiUrl = 'https://example.com/api/login';

    // try {
    //   // Send a POST request to the authentication endpoint
    //   const response = await fetch(apiUrl, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       studentId,
    //       password: pwd,
    //     }),
    //   });
  
    //   // Check if the response is successful
    //   if (response.ok) {
    //     // Successful login
    //     alert('로그인 성공!');
    //     // You may want to navigate to another screen or perform other actions
    //   } else {
    //     // Handle failed login
    //     alert('로그인 실패. 올바른 학번과 비밀번호를 입력하세요.');
    //   }
    // } catch (error) {
    //   console.error('Error during login:', error);
    //   alert('로그인 중 오류가 발생했습니다.');
    // }
  };



  return (
    <View style={styles.container}>
      <View style={styles.mainLogo}>
        <Image
          source = {require('../../assets/images/ymate_logo.png')}
          style={styles.image}
        />
      </View>
      <Text style={styles.title}>YMATE</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <Text style={styles.smalltitle}>학번</Text>
          <TextInput
            style={[styles.input, styles.rounded]}
            value={studentId}
            onChangeText={(text) => setStudentId(text)}
          />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.smalltitle}>비밀번호</Text>
          <TextInput
            style={[styles.input, styles.rounded]}
            value={pwd}
            onChangeText={(text) => setpwd(text)}
            secureTextEntry={true}
          />
        </View>
        <Pressable onPress={() => {navigation.navigate(Password)}}>
          <Text style={styles.forgotPassword}>비밀번호 찾기</Text>
        </Pressable>
      </View>
      <Pressable style = {styles.buttonContainer} onPress={handleLogin}>
          <Text style={styles.buttonText}>로그인</Text>
      </Pressable>
      <View style={styles.signupLink}>
      <Text style={[styles.signupText]}>
              아직 회원이 아니신가요?
        </Text>
        <Pressable onPress={() => {navigation.navigate(Signup)}}>
          <Text style={[styles.blueText]}>회원가입</Text>
         </Pressable>
         </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainLogo:{
    width:120,
    overflow: "hidden",
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start', // 상단 정렬로 변경
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  buttonText: {
    color: 'white',
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: 30,
    fontSize: 30,
    color: '#000',
  },
  smalltitle: {
    fontSize: 15,
    width: 60,
    color: '#000'
  },
  inputContainer: {
    width: '80%',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    paddingLeft: 10,
  },
  buttonContainer: {
    width: '50%',
    height: 30,
    borderRadius: 10,
    backgroundColor:'#22A2F2',
    justifyContent: "center",
    alignItems: "center",
  },
  rounded: {
    borderRadius: 10,
  },
  image: {
    marginTop: 100,
    width: '90%',
    height: 110,
  },
  forgotPassword: {
    color: 'red',
    fontSize: 12,
    textAlign: 'right',
    marginBottom: 10,
  },
  signupLink: {
    marginTop: 10,
    flexDirection: "row",
  },
  signupText: {
    fontSize: 14,
    color: '#000',
  },
  blueText: {
    color: '#22A2F2',
  },

});

export default Login;