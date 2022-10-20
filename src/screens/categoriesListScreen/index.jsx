import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Fonts } from "../../utils/fonts";
import { Colors } from "../../utils/colors";
import { useNavigation } from "@react-navigation/native";
import { navigationConstants } from "../../routes/constants";
import Title from "../../components/title";
import Button from "../../components/button";
import Icon from "react-native-vector-icons/FontAwesome5";
import useAPI from "../../hooks/useAPI";
import AddPointsModal from "../../components/addPointsModal";

const CategoriesListScreen = () => {
  const navigation = useNavigation();
  const api = useAPI();

  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const getIcon = (categoryName) => {
    switch (categoryName) {
      case "Cartão Presente":
        return "gift";
      case "Alugar Veículos":
        return "car";
      case "Assinaturas":
        return "pager";
      case "Combustível":
        return "gas-pump";
      case "Serviços":
        return "wrench";
      case "Ford com Você":
        return "plane-departure";

      default:
        break;
    }
  };

  const categoriesObjectArray = (categoriesArray) => {
    const objArr = [];
    categoriesArray.map((item, i) => {
      const obj = {
        id: item.uuid,
        name: item.name === "Assinaturas" ? "Ford GO" : item.name,
        icon: getIcon(item.name),
      };
      objArr.push(obj);
    });
    return objArr;
  };

  const getCategories = async () => {
    try {
      const response = await api.get("categories");
      const categories = categoriesObjectArray(response.data);
      setCategories(categories);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

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
      {showModal && (
        <AddPointsModal
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
        />
      )}
      <TouchableOpacity
        onPress={() => setShowModal(true)}
        style={{
          position: "absolute",
          width: 60,
          height: 60,
          borderRadius: 100,
          backgroundColor: "white",
          right: 16,
          bottom: 16,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon name="plus" color={Colors.MAIN} size={20} />
      </TouchableOpacity>
    </View>
  );
};

export { CategoriesListScreen };
