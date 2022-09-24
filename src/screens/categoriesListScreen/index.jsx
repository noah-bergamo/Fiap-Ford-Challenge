import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { Fonts } from "../../utils/fonts";
import { Colors } from "../../utils/colors";
import Label from "../../components/label";
import { useNavigation } from "@react-navigation/native";
import { navigationConstants } from "../../routes/constants";
import Title from "../../components/title";
import Icon from "react-native-vector-icons/FontAwesome5";
const categories = [
  { id: 0, name: "Cartão Presente", icon: "gift" },
  { id: 1, name: "Alugar Veículos", icon: "car" },
  { id: 2, name: "Assinaturas", icon: "pager" },
  { id: 3, name: "Combustível", icon: "gas-pump" },
  { id: 4, name: "Serviços", icon: "wrench" },
  { id: 5, name: "Ford com Você", icon: "plane-departure" },
];
const CategoriesListScreen = () => {
  const navigation = useNavigation();

  const renderCategoryCard = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(navigationConstants.SCREENS.CATEGORY_DETAILS, {
            category: item,
          })
        }
        style={{
          backgroundColor: Colors.WHITE,
          borderColor: Colors.WHITE,
          borderWidth: 2,
          flex: 1,
          height: 120,
          marginTop: 16,
          marginRight: index % 2 ? 16 : 0,
          marginLeft: !(index % 2) ? 0 : 16,
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 4,
          paddingVertical: 20,
        }}
      >
        <Title medium>{item.name}</Title>
        <Icon name={item.icon} size={40} color={Colors.MAIN} />
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.MAIN,
        justifyContent: "center",
        paddingHorizontal: 16,
      }}
    >
      <FlatList
        data={categories}
        ListHeaderComponent={() => (
          <Text
            style={{
              color: "white",
              fontFamily: Fonts.BOLD,
              fontSize: 20,
              marginBottom: 8,
              marginTop: 16,
            }}
          >
            Categorias
          </Text>
        )}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-around",
        }}
        renderItem={renderCategoryCard}
      />
    </View>
  );
};

export { CategoriesListScreen };
