import { View, Image, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import Title from "../title";
import { Colors } from "../../utils/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { navigationConstants } from "../../routes/constants";

const user = {
  name: "Guilherme de Mira",
  photo:
    "https://media-exp1.licdn.com/dms/image/C4D03AQHuPGnjIXjYRg/profile-displayphoto-shrink_200_200/0/1598300039292?e=2147483647&v=beta&t=DI1z2LuiEVxMnHDaV_XbsLuzRdqglZ5Ho5IwAymxENM",
  points: "30.000",
};

const Header = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const canGoBack = route.name !== navigationConstants.SCREENS.CATEGORIES_LIST;
  const renderBackIcon = () => {
    return (
      <TouchableOpacity
        style={{
          justifyContent: "center",
          flex: 0.1,
          alignItems: "center",
        }}
        onPress={() => navigation.goBack()}
      >
        <Icon name="angle-left" size={30} />
      </TouchableOpacity>
    );
  };
  const renderTitle = () => {
    return (
      <View
        style={{
          flex: 0.8,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Title size={20}>FordPass Rewards</Title>
      </View>
    );
  };
  const renderAvatar = () => {
    return (
      <View
        style={{
          backgroundColor: Colors.MAIN,
          width: 48,
          height: 48,
          borderRadius: 200,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: user.photo }}
          resizeMethod="resize"
          resizeMode="contain"
          style={{ width: 48, height: 48, borderRadius: 200 }}
        />
      </View>
    );
  };
  return (
    <View
      style={{
        marginTop: 60,
        minHeight: 100,
        backgroundColor: Colors.WHITE,
        borderBottomColor: Colors.MAIN,
        borderBottomWidth: 2,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 16,
        }}
      >
        {canGoBack ? (
          renderBackIcon()
        ) : (
          <View
            style={{
              justifyContent: "center",
              flex: 0.1,
              alignItems: "center",
            }}
          />
        )}
        {renderTitle()}
      </View>
      <View
        style={{
          paddingHorizontal: 16,
          flexDirection: "row",
          paddingVertical: 16,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {renderAvatar()}
          <View style={{ width: 8 }} />
          <Title numberOfLines={2} style={{ maxWidth: 130 }}>
            {user.name}
          </Title>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Title medium>Seu saldo é de</Title>
          <Title medium>
            <Title size={20}>{user.points} </Title>pontos
          </Title>
        </View>
      </View>
    </View>
  );
};

export default Header;
