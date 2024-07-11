// Library import
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, {createRef, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// Local import
import ZSafeAreaView from '../../../components/common/ZSafeAreaView';
import {useSelector} from 'react-redux';
import {styles} from '../../../themes';
import {getHeight, moderateScale} from '../../../common/constants';
import ZText from '../../../components/common/ZText';
import {StackNav} from '../../../navigation/NavigationKeys';
import strings from '../../../i18n/strings';
import images from '../../../assets/images';
import ZButton from '../../../components/common/ZButton';
import {Inbox_Dark} from '../../../assets/svgs';
import SwitchAccont from '../../../components/models/SwitchAccont';
import ReelComponent from '../../../components/ReelComponent';
import {savedStorys, videoData} from '../../../api/constant';
import UserStories from '../home/UserStory/UserStories';

const UserDetail = [
  {
    title: strings.post,
    value: '247',
  },
  {
    title: strings.followers,
    value: '368K',
  },
  {
    title: strings.following,
    value: '374',
  },
];

export default function Profile({navigation}) {
  const colors = useSelector(state => state.theme.theme);
  const [isSelect, setIsSelect] = useState(0);
  const switchAccountRef = createRef(null);

  const categoryData = [
    {
      id: 0,
      icon: 'apps',
      onPress: () => setIsSelect(0),
      name: 'Feeds',
    },
    {
      id: 1,
      icon: 'lock-closed',
      onPress: () => setIsSelect(1),
      name: 'Shorts',
    },
    {
      id: 2,
      icon: 'bookmark',
      onPress: () => setIsSelect(2),
      name: 'Tags',
    },
  ];

  const onPressEditProfile = () => navigation.navigate(StackNav.EditProfile);

  const onPressSwitchAccount = () => switchAccountRef?.current?.show();

  const onPressSetting = () => navigation.navigate(StackNav.Setting);

  const onPressFindFriend = () => navigation.navigate(StackNav.FindFriends);

  const onPressMessage = item => {
    navigation.navigate(StackNav.Chat, {
      userName: 'Andrew Ainsley',
      userImage: 'https://i.ibb.co/9psxy8J/user4.png',
    });
  };

  const RenderUserDetail = ({item}) => {
    return (
      <View style={styles.itemsCenter}>
        <ZText type="b24" align={'center'}>
          {item.value}
        </ZText>
        <ZText type="m16" align={'center'} style={styles.mt10}>
          {item.title}
        </ZText>
      </View>
    );
  };

  const HeaderCategory = ({item}) => {
    return (
      <TouchableOpacity
        onPress={item.onPress}
        style={[
          localStyles.tabItemStyle,
          {
            borderBottomWidth: isSelect === item.id ? moderateScale(2) : 0,
            borderBottomColor:
              isSelect === item.id ? colors.primary : colors.bColor,
          },
        ]}>
        <Ionicons
          name={item.icon}
          size={moderateScale(30)}
          color={isSelect === item.id ? colors.primary : colors.iconColor}
        />
        <ZText type={'s16'}>{item.name}</ZText>
      </TouchableOpacity>
    );
  };

  const renderReelItem = ({item}) => (
    <ReelComponent data={item?.views} reelUrl={item?.poster} isPlay={true} />
  );

  return (
    <ZSafeAreaView>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={localStyles.root}>
        <View style={localStyles.headerContainer}>
          <TouchableOpacity onPress={onPressFindFriend}>
            <Ionicons
              name="person-add-outline"
              size={moderateScale(26)}
              color={colors.dark ? colors.white : colors.darkColor}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressSwitchAccount}
            style={styles.rowCenter}>
            <ZText type="b24">{'Andrew..'}</ZText>
            <Ionicons
              name="chevron-down-outline"
              size={moderateScale(24)}
              style={styles.ml5}
              color={colors.dark ? colors.white : colors.darkColor}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressSetting}>
            <Ionicons
              name="settings-outline"
              size={moderateScale(30)}
              color={colors.dark ? colors.white : colors.darkColor}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.itemsCenter}>
          <TouchableOpacity onPress={onPressEditProfile} style={styles.mt40}>
            <Image
              source={colors.dark ? images.userDark : images.userLight}
              style={localStyles.userImage}
            />
            <MaterialIcon
              name="pencil-box"
              size={moderateScale(30)}
              color={colors.primary}
              style={localStyles.editIcon}
            />
          </TouchableOpacity>
          <View style={styles.mv20}>
            <ZText type="b24" align={'center'}>
              {'Andrew Ainsley'}
            </ZText>
            <ZText type="m14" align={'center'} style={styles.mt10}>
              {'andrew_ainsley@yourdomain.com'}
            </ZText>
            <ZText type="m14" align={'center'} style={styles.mt10}>
              {
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.'
              }
            </ZText>
          </View>
        </View>
        <View style={[styles.flexRow, styles.justifyEvenly]}>
          {UserDetail.map((item, index) => (
            <RenderUserDetail item={item} key={index} />
          ))}
        </View>
        <View style={styles.rowSpaceBetween}>
          <ZButton
            title={strings.follow}
            // onPress={onPressEditProfile}
            color={colors.primary}
            textType="b18"
            style={styles.ml10}
            containerStyle={[
              localStyles.buttonContainer,
              {borderColor: colors.primary},
            ]}
            bgColor={colors.tranparent}
            frontIcon={
              <Ionicons
                name="person-add-sharp"
                size={moderateScale(20)}
                color={colors.primary}
              />
            }
          />
          <ZButton
            title={strings.message}
            onPress={onPressMessage}
            color={colors.primary}
            textType="b18"
            style={styles.ml10}
            containerStyle={[
              localStyles.buttonContainer,
              {borderColor: colors.primary},
            ]}
            bgColor={colors.tranparent}
            frontIcon={<Inbox_Dark />}
          />
        </View>
        <UserStories stories={savedStorys} />
        <View
          style={[
            localStyles.mainContainer,
            {
              borderBottomColor: colors.bColor,
              borderBottomWidth: moderateScale(2),
            },
          ]}>
          {categoryData.map((item, index) => (
            <HeaderCategory item={item} key={index} />
          ))}
        </View>
        <FlatList
          data={videoData}
          renderItem={renderReelItem}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.mt20}
        />
      </ScrollView>
      <SwitchAccont SheetRef={switchAccountRef} />
    </ZSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
    ...styles.ph20,
    ...styles.mb20,
  },
  headerContainer: {
    ...styles.flex,
    ...styles.flexRow,
    ...styles.alignCenter,
    ...styles.justifyBetween,
    ...styles.mt20,
  },
  userImage: {
    width: moderateScale(100),
    height: moderateScale(100),
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  buttonContainer: {
    ...styles.mt20,
    height: getHeight(45),
    width: '48%',
    borderRadius: moderateScale(22),
    borderWidth: moderateScale(1),
  },
  mainContainer: {
    ...styles.rowSpaceBetween,
    width: '90%',
    ...styles.mt15,
    alignSelf: 'center',
  },
  tabItemStyle: {
    width: '25%',
    ...styles.itemsCenter,
    ...styles.pv15,
    ...styles.rowSpaceBetween,
  },
});
