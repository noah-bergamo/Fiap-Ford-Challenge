import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Colors } from "../../utils/colors";
import Title from "../../components/title";
import Label from "../../components/label";
import Button from "../../components/button";
import RedeemCodeModal from "../../components/RedeemCodeModal";
import useAPI from "../../hooks/useAPI";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const HistoryScreen = () => {
  const { user } = useSelector((state) => state.user);
  const api = useAPI();
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const getImage = (carName) => {
    switch (carName) {
      case "Ford Bronco Sport":
        return "data:image/jpeg;base64,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";

      case "Ford Territory ":
      case "Ford Territory (CHL)":
      case "Ford Territory (ESP)":
        return "https://cdn.autopapo.com.br/carro/ford/territory-titanium-15-turbo-aut-2021/destaque.png";

      case "Ford Maverick (ARG)":
      case "Ford Maverick":
        return "https://viaforveiculos.com.br/assets/images/versoes/5353767.png";
      case "Ford Ranger":
        return "https://production.autoforce.com/uploads/version/profile_image/1327/Comprar-Ford-Nova-Ranger-Limited-3_7dff769b9d_6f775f7425.png";
      case "Ford Mustang Mach 1":
        return "https://viaforveiculos.com.br/assets/images/versoes/9238704.png";
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = async () => {
    try {
      const customerId = user.uuid;
      const response = await api.get(
        `customers/${customerId}/rewards/redeemed`
      );
      const obj = formatHistoryArray(response.data);
      console.log({ obj });
      setHistoryData(obj);
    } catch (error) {
      console.log({ error });
      Toast.show({
        type: "error",
        text1: "Resgate de pontos",
        text2: "Houve um problema ao verificar o código",
      });
    }
  };
  const formatHistoryArray = (array) => {
    const formattedArray = [];
    array.map((item, index) => {
      item.redeemedRewards.map((reward) => formattedArray.push(reward));
    });
    return formattedArray;
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <View style={{ marginHorizontal: 16, marginTop: 16, marginBottom: 24 }}>
        <Title size={20}>
          {showHistory ? "Histórico de cupons" : "Meus cupons"}
        </Title>
      </View>
      <FlatList
        data={showHistory ? historyData : user.rewards}
        renderItem={({ item }) => {
          const hasPhoto =
            item.category.uuid === "3b4654bc-f25b-4412-ade3-a7c096d6f51b" ||
            item.category.uuid === "1d786a5d-7134-42c0-87fa-ff804ad29c72";
          return (
            <TouchableOpacity
              style={{
                // backgroundColor: "red",
                flex: 1,
                height: 90,
                alignItems: "center",
                paddingHorizontal: 16,
                marginVertical: 4,
                backgroundColor: Colors.WHITE,
                marginHorizontal: 16,
                borderRadius: 8,
                flexDirection: "row",
              }}
              onPress={() => {
                if (showHistory) return;
                setSelectedReward(item);
                setShowCodeModal(true);
              }}
            >
              <View style={{ flex: 1 }}>
                <Title size={20}>
                  {item.category.name === "Assinaturas"
                    ? "Ford GO"
                    : item.category.name}
                </Title>
                <Label>{item.name}</Label>
              </View>
              {hasPhoto && (
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                  <Image
                    source={{ uri: getImage(item.name) }}
                    style={{ width: 150, height: 80 }}
                    resizeMethod="resize"
                    resizeMode="cover"
                  />
                </View>
              )}
            </TouchableOpacity>
          );
        }}
      />
      <View
        style={{
          backgroundColor: Colors.MAIN,
          paddingVertical: 24,
          paddingHorizontal: 16,
        }}
      >
        {showHistory ? (
          <View />
        ) : (
          <RedeemCodeModal
            modalVisible={showCodeModal}
            reward={selectedReward}
            onRequestClose={() => setShowCodeModal(false)}
          />
        )}
        <Button
          label={`Ver ${showHistory ? "cupons disponíveis" : "histórico"}`}
          onPress={() => setShowHistory(!showHistory)}
        />
      </View>
    </View>
  );
};

export default HistoryScreen;
