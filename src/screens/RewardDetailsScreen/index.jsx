import { View, Text, Image } from "react-native";
import React from "react";
import { Colors } from "../../utils/colors";
import { useRoute } from "@react-navigation/native";
import Title from "../../components/title";
import Button from "../../components/button";
import Label from "../../components/label";
import Icon from "react-native-vector-icons/FontAwesome5";
import { getCountryFlagURI } from "../../utils/helpers";

const cardData = {
  id: 0,
  year: 2023,
  type: "Automático",
  tankSize: 45,
  hasAC: true,
};

const RewardDetailsScreen = () => {
  const route = useRoute();
  const { reward } = route.params;
  const { title, image, points, location, country } = reward;
  return (
    <View style={{ flex: 1, backgroundColor: Colors.MAIN }}>
      <View
        style={{
          backgroundColor: Colors.WHITE,
          justifyContent: "center",
          alignItems: "center",
          padding: 16,
        }}
      >
        <View style={{ alignSelf: "flex-start" }}>
          <Title>Local de retirada</Title>
          <View style={{ flexDirection: "row", marginTop: 4 }}>
            <Image
              source={{ uri: getCountryFlagURI(country) }}
              style={{ width: 30, height: 20, marginRight: 8 }}
            />
            <Title medium size={14}>
              {location}
            </Title>
          </View>
        </View>
        <Image source={{ uri: image }} style={{ width: 300, height: 200 }} />
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 16,
        }}
      >
        <Title color={Colors.WHITE} size={24}>
          {title}
        </Title>
      </View>
      <View
        style={{
          height: 100,
          marginHorizontal: 16,
          flexDirection: "row",
          marginTop: 24,
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderRightWidth: 1,
            borderColor: Colors.WHITE,
            borderBottomWidth: 1,
            borderBottomColor: Colors.WHITE,
          }}
        >
          <Title size={18} color={Colors.WHITE}>
            ANO
          </Title>
          <View style={{ height: 10 }} />
          <Label size={18} color={Colors.WHITE}>
            {cardData.year}
          </Label>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderBottomWidth: 1,
            borderBottomColor: Colors.WHITE,
          }}
        >
          <Title size={18} color={Colors.WHITE}>
            TIPO
          </Title>
          <View style={{ height: 10 }} />
          <Label size={18} color={Colors.WHITE}>
            {cardData.type}
          </Label>
        </View>
      </View>

      <View
        style={{
          height: 100,
          marginHorizontal: 16,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderRightWidth: 1,
            borderColor: Colors.WHITE,
          }}
        >
          <Title size={18} color={Colors.WHITE}>
            AR
          </Title>
          <View style={{ height: 10 }} />
          <Icon
            name={cardData.hasAC ? "check" : "window-close"}
            color={Colors.WHITE}
            size={20}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Title size={18} color={Colors.WHITE}>
            TANQUE
          </Title>
          <View style={{ height: 10 }} />
          <Label size={18} color={Colors.WHITE}>
            {cardData.tankSize} L
          </Label>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          width: "100%",
          backgroundColor: Colors.WHITE,
          alignSelf: "flex-end",
          paddingHorizontal: 16,
          flexDirection: "row",
          paddingVertical: 16,
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginRight: 16,
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Title size={24}>{points}</Title>
          <Title medium style={{ marginBottom: 5, marginLeft: 8 }}>
            pontos
          </Title>
        </View>
        <View style={{ flex: 1 }}>
          <Button inverse label="Resgatar" />
        </View>
      </View>
    </View>
  );
};

export default RewardDetailsScreen;
