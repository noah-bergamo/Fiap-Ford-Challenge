import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Title from "../../components/title";
import { Colors } from "../../utils/colors";
import Label from "../../components/label";
import { navigationConstants } from "../../routes/constants";
import { getCountryFlagURI } from "../../utils/helpers";
import { Fonts } from "../../utils/fonts";

const rewardList = [
  {
    id: 0,
    title: "Ford Maverick",
    location: "São Paulo",
    country: "BR",
    points: '2.000',
    image:
      "https://www.ford.com.br/content/ford/br/pt_br/home/jcr:content/par/tabpanel/cars0/splitter/splitter1/mediacarouselitem/image.imgs.full.high.png/1648164218008.png",
  },
  {
    id: 1,
    title: "Ford Territory",
    location: "Rio de Janeiro",
    country: "BR",
    points: '8.000',
    image:
      "https://www.ford.com.br/content/ford/br/pt_br/home/jcr:content/par/tabpanel/cars5/splitter/splitter22/mediacarouselitem/image.imgs.full.high.png/1650402215401.png",
  },
  {
    id: 2,
    title: "Ford Ranger",
    location: "Fortaleza",
    country: "BR",
    points: '3.000',
    image:
      "https://www.ford.com.br/content/ford/br/pt_br/home/jcr:content/par/tabpanel/cars5/splitter/splitter0/mediacarouselitem/image.imgs.full.high.jpg/1635293773055.jpg",
  },
  {
    id: 3,
    title: "Mustang Mach 1",
    location: "Madrid",
    country: "ES",
    points: '15.000',
    image:
      "https://www.ford.com.br/content/ford/br/pt_br/home/jcr:content/par/tabpanel/cars5/splitter/splitter23/mediacarouselitem/image.imgs.full.high.jpg/1650402203052.jpg",
  },
];

const CategoryDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { category } = route.params;
  const { name } = category;

  const renderRewardCard = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(navigationConstants.SCREENS.REWARD_DETAILS, {
            reward: item,
          })
        }
        style={{
          flex: 1,
          backgroundColor: Colors.WHITE,
          marginTop: 16,
          marginHorizontal: 16,
          borderRadius: 8,
          paddingBottom: 16,
        }}
      >
        <View
          style={{
            marginTop: 16,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            paddingLeft: 16,
          }}
        >
          <View
            style={{
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Image
              source={{
                uri: getCountryFlagURI(item.country),
              }}
              style={{
                width: 30,
                height: 30,
                marginRight: 10,
              }}
              resizeMethod="resize"
              resizeMode="contain"
            />
            <Label medium>{item.location}</Label>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 16,
          }}
        >
          <View
            style={{
              justifyContent: "center",
            }}
          >
            <Title size={20}>{item.title}</Title>
            <View style={{ height: 12 }} />
            <Title size={18}>
              {item.points}{" "}
              <Title size={18} medium>
                pontos
              </Title>
            </Title>
          </View>
          <View>
            <Image
              source={{
                uri: item.image,
              }}
              style={{ width: 170, height: 100 }}
              resizeMethod="resize"
              resizeMode="contain"
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.MAIN }}>
      <FlatList
        data={rewardList}
        ListHeaderComponent={() => (
          <Text
            style={{
              color: "white",
              fontFamily: Fonts.BOLD,
              fontSize: 20,
              marginBottom: 8,
              marginTop: 16,
              marginLeft: 16
            }}
          >
            Recompensas
          </Text>
        )}
        renderItem={renderRewardCard}
      />
    </View>
  );
};

export default CategoryDetailScreen;
