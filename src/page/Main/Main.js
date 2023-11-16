import * as React from "react";
import { Image, StyleSheet, Text, View, Pressable, ScrollView, SafeAreaView, Alert, RefreshControl, FlatList} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Padding, FontSize, FontFamily, Border } from "../GlobalStyles";
import {styles} from "../Style"


const Main = () => {
	const [refreshing, setRefreshing] = React.useState(false)

	const DeliveryData = [
		{
			dId: 123123123,
			title: "장충동 왕족발보쌈",
			due: 11222333344,
			food: 332211,
			location: 332211,
			createAt: 3322111,
		},
		{
			dId: 123123124,
			title: "장충동 왕족발보쌈",
			due: 11222333344,
			food: 332211,
			location: 332211,
			createAt: 3322111,
		},
		{
			dId: 123123125,
			title: "장충동 왕족발보쌈",
			due: 11222333344,
			food: 332211,
			location: 332211,
			createAt: 3322111,
		},
		{
			dId: 123123126,
			title: "장충동 왕족발보쌈",
			due: 11222333344,
			food: 332211,
			location: 332211,
			createAt: 3322111,
		},
		{
			dId: 123123127,
			title: "장충동 왕족발보쌈",
			due: 11222333344,
			food: 332211,
			location: 332211,
			createAt: 3322111,
		}
	]

	const TaxiData = [
		{
			tId: 123123123,
			title: "집 가고싶다",
			due: 11222333344,
			food: 332211,
			location: 332211,
			createAt: 3322111,
		},
		{
			tId: 123123124,
			title: "집 가고싶다",
			due: 11222333344,
			food: 332211,
			location: 332211,
			createAt: 3322111,
		},
		{
			tId: 123123125,
			title: "집 가고싶다",
			due: 11222333344,
			food: 332211,
			location: 332211,
			createAt: 3322111,
		},
		{
			tId: 123123126,
			title: "집 가고싶다",
			due: 11222333344,
			food: 332211,
			location: 332211,
			createAt: 3322111,
		},
		{
			tId: 123123127,
			title: "집 가고싶다",
			due: 11222333344,
			food: 332211,
			location: 332211,
			createAt: 3322111,
		}
	]

	const NoticeData = [
		{
			noticeId: 123123123,
			title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉"
		},
		{
			noticeId: 123123124,
			title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉"
		},
		{
			noticeId: 123123125,
			title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉"
		},
		{
			noticeId: 123123126,
			title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉"
		},
		{
			noticeId: 123123127,
			title: "1.2.1123 업데이트 내용:이이이잉잉이잉이이이이이잉"
		}
	]

	const DeliveryItem = ({title, dId}) => (
		<Pressable style={styles.smallCard} onPress={()=>Alert.alert(`${dId}`)}>
				{/* change view to image */}
				<View style={styles.tempViewToImage} />
				<View style={styles.smallCardContent}>
					<View style={styles.locationTag}>
							<Text style={styles.centerText9}>에융대</Text>
					</View>
					<Text style={styles.centerText10}>3분 후 마감</Text>
				</View>
				<View style={styles.smallCardContent}>
					<Text style={styles.cardTitle} numberOfLines={1}>{title}</Text>
				</View>
		</Pressable>
	)

	const TaxiItem = ({title, tId}) => ( 
		<Pressable style={styles.smallCard} onPress={()=>Alert.alert(`${tId}`)}>
			{/* change view to image */}
			<View style={styles.tempViewToImage} />
			<View style={styles.smallCardContent}>
				<View name="taxi location" flexDirection="row">
					<View style={styles.locationTag}>
							<Text style={styles.centerText9}>에융대</Text>
					</View>
					<Image style={styles.icon17} resizeMode="cover" source={require("../../assets/images/화살표.png")}/>
					<View style={styles.locationTag}>
							<Text style={styles.centerText9}>에융대</Text>
					</View>
				</View>
				<Text style={styles.centerText10}>3분 후 마감</Text>
			</View>
			<View style={styles.smallCardContent}>
				<Text style={styles.cardTitle} numberOfLines={1}>{title}</Text>
				<Text style={styles.centerText10}>3/4</Text>
			</View>
		</Pressable>
	)

	const noticeCard = NoticeData.map((notice) => 
		<Pressable key={notice.noticeId} style={styles.smallNoticeCard} onPress={()=>Alert.alert(`${notice.noticeId}`)}>
				<Text style={styles.noticeTitle} numberOfLines={1}>{notice.title}</Text>
				<Text style={styles.centerText10}>10.30</Text>
		</Pressable>
	)

  	return (
		<>
    		<SafeAreaView style={styles.mainScreen}>
      			<View style={styles.mainBackground}>
					<View style={styles.uppermenu}>
						<Pressable style={styles.locationbutton} onPress={()=>Alert.alert("위치재설정버튼")}>
							<Image style={styles.icon24} resizeMode="cover" source={require("../../assets/images/위치아이콘.png")}/>
							<Text style={styles.locationText}>AI융합대학</Text>
							<Image style={[styles.icon16, styles.marginLeft3]} resizeMode="cover" source={require("../../assets/images/드랍다운아이콘.png")}/>
						</Pressable>
						<Pressable name="alramButton" onPress={()=>Alert.alert("알림버튼")}>
							<Image style={styles.icon26} resizeMode="cover" source={require("../../assets/images/알림아이콘.png")}/>
							<Image style={styles.activAlramIcon} resizeMode="cover" source={require("../../assets/images/activAlram.png")}/>
						</Pressable>
					</View>
					<View style={styles.mainBody}>
						<ScrollView contentContainerStyle={{paddingBottom:20}} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>Alert.alert("새로고침")}/>}>
							<Image style={styles.advertiseImage} resizeMode="cover" source={require("../../assets/images/advertise.png")}/>
							<View name="deliverySection" style={styles.mainSection}>
								<View style={styles.mainSectionTitle}>
									<View style={styles.rowView}>
										<Image style={styles.icon24} resizeMode="cover" source={require("../../assets/images/image16.png")}/>
										<Text style={[styles.centerText18, styles.marginLeft3]}>같이 배달</Text>
									</View>
									<Pressable style={styles.rowView} onPress={()=>Alert.alert("배달더보기")}>
										<Text style={styles.clickText13}>더보기</Text>
										<Image style={styles.icon15} resizeMode="cover" source={require("../../assets/images/드랍다운아이콘2.png")}/>
									</Pressable>
								</View>
								<View style={styles.mainSectionList}>
									<FlatList
										contentContainerStyle={styles.smallCardScroll}
										horizontal
										showsHorizontalScrollIndicator={false}
										data={DeliveryData}
										renderItem={({item}) => <DeliveryItem title={item.title} dId={item.dId}/>}
										keyExtractor={item => item.dId}
									/>
								</View>
							</View>
							<View style={styles.mainSection}>
								<View style={styles.mainSectionTitle}>
									<View style={styles.rowView}>
										<Image style={styles.icon24} resizeMode="cover" source={require("../../assets/images/image14.png")}/>
										<Text style={[styles.centerText18, styles.marginLeft3]}>같이 택시</Text>
									</View>
									<Pressable style={styles.rowView} onPress={()=>Alert.alert("택시더보기")}>
										<Text style={styles.clickText13}>더보기</Text>
										<Image style={styles.icon15} resizeMode="cover" source={require("../../assets/images/드랍다운아이콘2.png")}/>
									</Pressable>
								</View>
								<View style={styles.mainSectionList}>
									<FlatList
										contentContainerStyle={styles.smallCardScroll}
										horizontal
										showsHorizontalScrollIndicator={false}
										data={TaxiData}
										renderItem={({item}) => <TaxiItem title={item.title} tId={item.tId}/>}
										keyExtractor={item => item.tId}
									/>
								</View>
							</View>
							<View style={styles.mainSection}>
								<View style={styles.mainSectionTitle}>
									<Text style={styles.centerText18}>공지사항</Text>
									<Pressable style={styles.rowView} onPress={()=>Alert.alert("공지더보기")}>
										<Text style={styles.clickText13}>더보기</Text>
										<Image style={styles.icon15} resizeMode="cover" source={require("../../assets/images/드랍다운아이콘2.png")}/>
									</Pressable>
								</View>
								<View style={styles.mainSectionList}>
									{noticeCard}
								</View>
							</View>
						</ScrollView>
					</View>
					<View style={styles.navigationBar}>
						<Pressable style={[styles.opacity70, styles.navigationButton]} onPress={()=>Alert.alert("배달버튼")}>
							<Image style={styles.icon30} resizeMode="cover" source={require("../../assets/images/restaurant_white1.png")}/>
							<Text style={[styles.text121, styles.textTypo]}>배달</Text>
						</Pressable>
						<Pressable style={[styles.opacity70, styles.navigationButton]} onPress={()=>Alert.alert("택시버튼")}>
							<Image style={styles.icon30} resizeMode="cover" source={require("../../assets/images/taxi_white1.png")}/>
							<Text style={[styles.text121, styles.textTypo]}>택시</Text>
						</Pressable>
						<Pressable style={styles.navigationButton} onPress={()=>Alert.alert("홈버튼")}>
							<Image style={styles.icon30} resizeMode="cover" source={require("../../assets/images/home_white1.png")}/>
							<Text style={[styles.text121, styles.textTypo]}>홈</Text>
						</Pressable>
						<Pressable style={[styles.opacity70, styles.navigationButton]} onPress={()=>Alert.alert("내가쓴글버튼")}>
							<Image style={styles.icon30} resizeMode="cover" source={require("../../assets/images/to-do-list_white1.png")}/>
							<Text style={[styles.text121, styles.textTypo]}>내가 쓴 글</Text>
						</Pressable>
						<Pressable style={[styles.opacity70, styles.navigationButton]} onPress={()=>Alert.alert("내정보버튼")}>
							<Image style={styles.icon30} resizeMode="cover" source={require("../../assets/images/user_white1.png")}/>
							<Text style={[styles.text121, styles.textTypo]}>내 정보</Text>
						</Pressable>
					</View>
      			</View>
    		</SafeAreaView>
			<Pressable style={[styles.writebutton, styles.view71FlexBox]} onPress={ ()=> Alert.alert("글작성버튼")}>
				<Image style={styles.icon23} resizeMode="cover" source={require("../../assets/images/글작성버튼.png")}/>
			</Pressable>
		</>);
};



export default Main;