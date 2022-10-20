import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../utils/colors";
import { useRoute } from "@react-navigation/native";
import Title from "../../components/title";
import Button from "../../components/button";
import Label from "../../components/label";
import Icon from "react-native-vector-icons/FontAwesome5";
import { getCountryFlagURI } from "../../utils/helpers";
import useAPI from "../../hooks/useAPI";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { setRewards, setWalletPoints } from "../../redux/reducers/userReducer";

const cardData = {
  id: 0,
  year: 2023,
  type: "Automático",
  tankSize: 45,
  hasAC: true,
};

const RewardDetailsScreen = () => {
  const route = useRoute();
  const api = useAPI();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { reward, isCarInfoDetail } = route.params;
  console.log({ reward });
  const { title, image, points, destination, country } = reward;
  const { details } = reward.details;
  const [actualDetails, setActualDetails] = useState([]);

  const redeem = async () => {
    try {
      const response = await api.put(
        `customers/${user.uuid}/rewards/${reward.uuid}`
      );
      if (response.status === 200) {
        dispatch(setWalletPoints(response.data.wallet));
        dispatch(setRewards(response.data.rewards));
        Toast.show({
          type: "success",
          text1: "PARABÉNS!",
          text2: "Resgate de recompensa efetuado com sucesso!",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Houve um problema ao resgatar recompensa.",
      });
    }
  };

  useEffect(() => {
    setActualDetails(formatDetails());
  }, []);
  const formatDetails = () => {
    const formattedDetails = [];
    details.map((item, i) => {
      const name = Object.keys(details[i])[0];

      const value = Object.values(details[i])[0];
      const detail = {
        name,
        value:
          value == "true"
            ? true
            : value == "false"
            ? false
            : !isNaN(value)
            ? parseFloat(value)
            : value,
      };
      formattedDetails.push(detail);
    });
    return formattedDetails;
  };
  const renderFooter = () => {
    return (
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
          <Button
            inverse
            label={points > user.wallet ? "Sem Saldo" : "Resgatar"}
            onPress={redeem}
            disabled={points > user.wallet}
          />
        </View>
      </View>
    );
  };

  const renderInfo = () => {
    return (
      <View style={{ flex: 4, justifyContent: "center" }}>
        <View
          style={{
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
              borderBottomWidth: 1,
              borderBottomColor: Colors.WHITE,
              paddingBottom: 10,
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
              paddingBottom: 10,
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
      </View>
    );
  };

  const renderTitle = () => {
    return (
      <View
        style={{
          marginVertical: 4,
          justifyContent: "center",
        }}
      >
        <Title
          color={Colors.WHITE}
          size={22}
          style={{ textAlign: "center", marginHorizontal: 12 }}
        >
          {reward.name.toUpperCase()}
        </Title>
      </View>
    );
  };

  const renderImage = () => {
    return (
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
          <View style={{ flexDirection: "row", marginTop: 4, marginTop: 8 }}>
            <Image
              source={{ uri: getCountryFlagURI(destination.country) }}
              style={{ width: 30, height: 20, marginRight: 8 }}
            />
            <Title medium size={14}>
              {destination.takeOut || destination.country}
            </Title>
          </View>
        </View>
        <Image
          source={{
            uri:
              image ||
              "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg",
          }}
          style={{ width: 300, height: 200 }}
          resizeMethod="resize"
          resizeMode="contain"
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.MAIN }}>
      {renderImage()}
      {renderTitle()}
      {isCarInfoDetail ? renderInfo() : <View style={{ flex: 4 }} />}
      {renderFooter()}
    </View>
  );
};

export default RewardDetailsScreen;
