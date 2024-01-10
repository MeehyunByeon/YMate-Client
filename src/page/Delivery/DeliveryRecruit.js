import React, { useState, useRef, useEffect  } from "react";
import { Text, StyleSheet, Image,TextInput, Pressable, View, Alert, TouchableWithoutFeedback, Keyboard, AsyncStorage} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {styles} from "../Style"
import {BottomButton, Header, ErrorText} from "../../components"
import { getUserInfo, getAccessTokenInfo } from '../../components/utils'
import ModalDropdown from "react-native-modal-dropdown";
import foodTypeToNumber from '../../components/TypeToNumber/FoodTypeToNumber';
import locationTypeToNumber from '../../components/TypeToNumber/LocationTypeToNumber';
import timeTypeToNumber from '../../components/TypeToNumber/TimeTypeToNumber';
import foods from '../../constant/FoodDatas';
import locations from '../../constant/LocationDatas'
import times from '../../constant/TimeDatas'
import axios from 'axios';
import LocationModal from "../Modal/LocationModal";
// import FoodModal from "../Modal/FoodModal";
// import foodData from "../../constant/FoodData";
import locationData from '../../constant/LocationData'

const DeliveryRecruit = ({navigation, route}) => {
  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [link, setLink] = useState('');
  const [error, setError] = useState('');
  const foodDropdownRef = useRef();
  const timeDropDownRef = useRef();
  const [did, setDid] = useState(route.params?.did || null);
  const headerTitle = did ? "배달 모집 글 수정" : "배달 모집 글 작성";
  const buttonTitle = did ? "모집 글 수정" : "모집 글 작성";
  const [isModalVisible, setModalVisible] = useState(false);
  const [locationText, setLocationText] = useState('');

  useEffect(() => {
    locationToText()
    // foodToText()
    console.log('locationText: ', locationText)
    console.log('location: ', selectedLocation)
  }, [locationText, selectedLocation])

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = (modalValue1, modalValue2) => {
    setModalVisible(false);
    if (modalValue1 !== undefined && modalValue2 !== undefined) {
      // 모달에서 전달받은 두 값 처리
      setSelectedLocation(modalValue1);
      setLocationText(modalValue2);
      console.log('Modal Value 1:', modalValue1);
      console.log('Modal Value 2:', modalValue2);
    }
  };

  const locationToText = () => {
    if(selectedLocation !== 0){
      const index = locationData.findIndex((item) => item.code === selectedLocation);
      const newText = locationData[index]?.name
      setLocationText(newText)
    }
  }

  // const foodToText = () => {
  //   if(selectedLocation !== 0){
  //     const index = foodData.findIndex((item) => item.code === selectedLocation);
  //     const newText = foodData[index]?.name
  //     setLocationText(newText)
  //   }
  // }

  const toggleFoodDropdown = () => {
    foodDropdownRef.current.show();
    handleChange();
  };
  const toggleLocationDropdown = () => {
    locationDropdownRef.current.show();
    handleChange();
  };
  const toggleTimeDropdown = () => {
    timeDropDownRef.current.show();
    handleChange();
  };
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleChange = () =>{
    setError('');
  }

  const getDueDate = () =>{
    const currentDate = new Date();
    const nHoursLater = new Date(currentDate.getTime() + (selectedTime+9) * 60 * 60 * 1000);

    const formattedDate = nHoursLater.toISOString().slice(0, 19).replace("T", " ");
    console.log(formattedDate);
    return formattedDate;
  }
  
  const handletDeliveryRecruit = async () => {
    if (!title || !contents || !selectedFood || !locationText || !selectedTime) {
      setError("모든 값을 입력해주세요.");
    }
    else{
      const userInfo = await getUserInfo(); 
      const accessTokenInfo = await getAccessTokenInfo();
      const dueDate = getDueDate();
      const apiEndpoint = did ? `${API_URL}/delivery/update` : `${API_URL}/delivery/create`;
      const response = await axios.post(apiEndpoint,
          {
            dId: did,
            student_id: userInfo,
            title: title,
            contents: contents,
            due: dueDate,
            food: selectedFood,
            location: selectedLocation,
            link: link,
          }, {
            headers: {"Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Bearer ${accessTokenInfo}`,
          },
            withCredentials: true // 클라이언트와 서버가 통신할 때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
          }).then((res) => {
            console.log('>>> [deliveryRecruit] ✅ SUCCESS', res.data);
            if (res.status === 200) {
              alert('배달 글 작성 완료');
              navigation.goBack();
            }
        }).catch((error) => {
          console.log('>>> [deliveryRecruit] 🤬 ERROR', error);
          setError("AccessToken만료");
        });
       
    }
  }

  return (
    <SafeAreaView style={styles.mainScreen}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={[styles.mainBackground, styles.backgroundWhite]}>
          <Header title = {headerTitle} onPressBack={() => navigation.goBack()}/>
          <KeyboardAwareScrollView>
            <View style={[styles.recruitSection]}>
              <View style={styles.rowView}>
                <View style={[styles.flexView]}>
                  <Text style={styles.text12}>마감시간</Text>
                  <View style={[styles.recruitInput, styles.rowView]}>
                      {/* inputbox */}
                      <ModalDropdown
                        ref={timeDropDownRef}
                        options={times}
                        onSelect={(index, value) => setSelectedTime(timeTypeToNumber(value))}
                        defaultValue={"선택하세요"}
                        
                        style={[styles.textAlignLeft,styles.marginLeft6,styles.defaultText11]}
                        renderButtonText={(rowData) => (
                          <Text style={styles.text11}>{rowData}</Text>
                        )}
                      />
                    <View style={[styles.recruitInputDropdown]} onTouchEnd={toggleTimeDropdown}>
                      <Image style={styles.icon16} resizeMode="cover" source={require("../../assets/images/down_blue.png")}/>
                    </View>
                  </View>
                </View>
                <View style={[styles.flexView, styles.marginLeft6]}>
                  <Text style={styles.text12}>수령위치</Text>
                  <Pressable style={[styles.recruitInput, styles.rowView]} onPress={openModal}>
                    {locationText?
                      <Text style={[styles.textAlignLeft,styles.marginLeft6,styles.text11]}>
                        {locationText}
                      </Text>
                      :
                      <Text style={[styles.textAlignLeft,styles.marginLeft6,styles.defaultText11]}>
                        선택하세요
                      </Text>
                    }
                      {/* inputbox
                      <ModalDropdown
                        ref={locationDropdownRef}
                        options={locations}
                        onSelect={(index, value) => setSelectedLocation(locationTypeToNumber(value))}
                        defaultValue={"선택하세요"}
                        style={[styles.textAlignLeft,styles.marginLeft6,styles.defaultText11]}
                        renderButtonText={(rowData) => (
                          <Text style={styles.text11}>{rowData}</Text>
                        )}
                      /> */}
                    <View style={[styles.recruitInputDropdown]} onTouchEnd={toggleLocationDropdown}>
                      <Image style={styles.icon16} resizeMode="cover" source={require("../../assets/images/down_blue.png")}/>
                    </View>
                  </Pressable>
                </View>
              </View>

              <View style={[styles.margintop9]}>
                <Text style={styles.text12}>제목</Text>
                <TextInput style={[styles.recruitInput, styles.text11]} maxLength={50}
                  placeholder="최대 50자까지 입력가능합니다."
                  placeholderTextColor="#a0a0a0"
                  value={title}
                    onChangeText={(text) => {
                      setTitle(text);
                    }}
                    onEndEditing={() => {
                      handleChange();
                    }}
                />
              </View>
              <View style={[styles.margintop9]}>
                <Text style={styles.text12}>내용</Text>
                <TextInput style={[styles.recruitInput, styles.recruitContent, styles.text11]} multiline textAlignVertical="top"
                  value={contents}
                  onChangeText={(text) => {
                    setContents(text);
                  }}
                  onEndEditing={() => {
                    handleChange();
                  }}
                />
              </View>
              <View style={[styles.margintop9]}>
                <Text style={styles.text12}>음식</Text>
                <View style={[styles.recruitInput, styles.rowView]}>
                      {/* inputbox */}
                      <ModalDropdown
                        ref={foodDropdownRef}
                        options={foods}
                        onSelect={(index, value) => setSelectedFood(foodTypeToNumber(value))}
                        defaultValue={"선택하세요"}
                        style={[styles.textAlignLeft,styles.marginLeft6,styles.defaultText11]}
                        renderButtonText={(rowData) => (
                          <Text style={styles.text11}>{rowData}</Text>
                        )}
                      />
                    <View style={[styles.recruitInputDropdown]} onTouchEnd={toggleFoodDropdown}>
                      <Image style={styles.icon16} resizeMode="cover" source={require("../../assets/images/down_blue.png")}/>
                    </View>
                  </View>
              </View>
              <View style={[styles.margintop9]}>
                <Text style={styles.text12}>배달 링크 (선택)</Text>
                <TextInput style={[styles.recruitInput, styles.text11]} 
                  value={link}
                  onChangeText={(text) => {
                    setLink(text);
                    }
                  }
                />
              </View>
              <Text style={[styles.text11, styles.rightGrayText, styles.margintop9]}>
                  {`배달 링크는 수락받은 신청자에게만 노출됩니다.
  배달 앱의 함계 주문하기 링크를 입력해주세요.`}
              </Text>
            </View>
          </KeyboardAwareScrollView>
          <ErrorText isError={error} errorMessage={error} style={[styles.marginRight20]}/>
          <BottomButton title={buttonTitle} onPress={handletDeliveryRecruit}/>
      </View>
      </TouchableWithoutFeedback>
      <LocationModal isVisible={isModalVisible} onClose={closeModal} />    
    </SafeAreaView>
  );
};


export default DeliveryRecruit;
