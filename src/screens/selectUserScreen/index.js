import { View, TextInput, Image } from "react-native";
import React, { useState } from "react";
import useAPI from "../../hooks/useAPI";
import { setUser } from "../../redux/reducers/userReducer";
import { useDispatch } from "react-redux";

import Title from "../../components/title";
import Button from "../../components/button";
import { Fonts } from "../../utils/fonts";
import { Colors } from "../../utils/colors";

const SelectUserScreen = () => {
  const api = useAPI();
  const dispatch = useDispatch();
  const [cpf, setCpf] = useState("34370954800");

  const formatUser = (userData) => {
    const { firstName, lastName, wallet, email, rewards, uuid } = userData;

    const newObj = {
      uuid,
      firstName,
      lastName,
      wallet,
      email,
      rewards,
    };
    return newObj;
  };

  const login = async () => {
    try {
      const response = await api.get(`customers/${cpf}`);
      const userData = formatUser(response.data);
      dispatch(setUser(userData));
    } catch (e) {
      console.log({ e });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.WHITE,
      }}
    >
      <Image
        source={{
          uri: "https://www.pellcityford.com/static/dealer-14925/fordpassrewards_blue_cmyk_v1.jpg",
        }}
        style={{ width: 300, height: 200 }}
        resizeMethod="resize"
        resizeMode="contain"
      />
      <Title>Digite o CPF do usuário:</Title>
      <TextInput
        style={{
          borderBottomWidth: 1,
          padding: 0,
          width: "80%",
          borderRadius: 4,
          marginTop: 16,
          color: "black",
          fontFamily: Fonts.MEDIUM,
          textAlign: "center",
          fontSize: 18,
        }}
        onChangeText={(text) => setCpf(text)}
        value={cpf}
      />
      <View style={{ width: "80%", marginTop: 40 }}>
        <Button label="Entrar" inverse onPress={() => login()} />
      </View>
    </View>
  );
};

export default SelectUserScreen;
