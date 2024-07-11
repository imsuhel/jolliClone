// Library import
import React from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Local import
import {StackRoute, TabRoute} from '../NavigationRoutes';
import {StackNav, TabNav} from '../NavigationKeys';
import {checkPlatform} from '../../utils/helpers';
import {getHeight, moderateScale} from '../../common/constants';
import ZText from '../../components/common/ZText';
import strings from '../../i18n/strings';
import {
  Add_Icon,
  Discover_Dark,
  Discover_Light,
  Home_Dark,
  Home_Light,
  Inbox_Dark,
  Inbox_Light,
  Profile_Dark,
  Profile_Light,
} from '../../assets/svgs';
import {styles} from '../../themes';
import ProfilePicture from '../../components/models/ProfilePicture';

export default function TabBarNavigation({navigation}) {
  const colors = useSelector(state => state.theme.theme);
  const Tab = createBottomTabNavigator();
  const ProfilePictureSheetRef = React.createRef();

  const TabText = ({text, focused, icon}) => (
    <View style={localStyles.tabViewContainer}>
      {icon}
      {!!text && (
        <ZText
          type={focused ? 'b14' : 'm14'}
          numberOfLines={1}
          style={styles.mt5}
          color={focused ? colors.primary : colors.grayScale5}>
          {text}
        </ZText>
      )}
    </View>
  );

  const onPressAdd = () => ProfilePictureSheetRef?.current?.show();

  const onPressPost = () => {
    ProfilePictureSheetRef?.current?.hide();
    navigation.navigate(StackNav.PostDetail);
  };

  const onPressLive = () => {
    ProfilePictureSheetRef?.current?.hide();
    navigation.navigate(StackNav.Live);
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: [
          localStyles.tabBarStyle,
          {
            backgroundColor: colors.backgroundColor,
          },
        ],
        tabBarShowLabel: false,
      }}
      initialRouteName={TabNav.Home}>
      <Tab.Screen
        name={TabNav.Home}
        component={TabRoute.Home}
        options={{
          tabBarIcon: ({focused}) => (
            <TabText
              text={strings.home}
              focused={focused}
              icon={focused ? <Home_Dark /> : <Home_Light />}
            />
          ),
        }}
      />
      <Tab.Screen
        name={TabNav.Discover}
        component={TabRoute.Discover}
        options={{
          tabBarIcon: ({focused}) => (
            <TabText
              text={strings.discover}
              focused={focused}
              icon={focused ? <Discover_Dark /> : <Discover_Light />}
            />
          ),
        }}
      />
      <Tab.Screen
        name={StackNav.Search}
        component={StackRoute.Search}
        listeners={{tabPress: e => e.preventDefault()}}
        options={{
          tabBarIcon: ({focused}) => (
            <TouchableOpacity
              onPress={onPressAdd}
              style={localStyles.tabViewContainer}>
              <Add_Icon />
              <ProfilePicture
                SheetRef={ProfilePictureSheetRef}
                post={true}
                live={true}
                title={strings.choose}
                onPressCamera={onPressPost}
                onPressGallery={onPressLive}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name={TabNav.Shorts}
        component={TabRoute.Shorts}
        options={{
          tabBarIcon: ({focused}) => (
            <TabText
              text={strings.shorts}
              focused={focused}
              icon={focused ? <Inbox_Dark /> : <Inbox_Light />}
            />
          ),
        }}
      />
      <Tab.Screen
        name={TabNav.Profile}
        component={TabRoute.Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <TabText
              text={strings.profile}
              focused={focused}
              icon={focused ? <Profile_Dark /> : <Profile_Light />}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const localStyles = StyleSheet.create({
  tabBarStyle: {
    height: checkPlatform() === 'ios' ? getHeight(100) : getHeight(70),
    paddingHorizontal: moderateScale(10),
  },
  tabViewContainer: {
    ...styles.center,
  },
});
