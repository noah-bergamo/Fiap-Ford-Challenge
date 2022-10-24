import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import Title from "../../components/title/";
import Button from "../../components/button/";
import { Fonts } from "../../utils/fonts";
import useAPI from "../../hooks/useAPI";
import { useDispatch } from "react-redux";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { setUser } from "../../redux/reducers/userReducer";

const SignUpScreen = () => {
  const api = useAPI();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [loading, setLoading] = useState(false);

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

  const validateFields = () => {
    if (name === "" || lastName === "" || email === "" || cpf === "") {
      return false;
    }
    return true;
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const validFields = validateFields();
      if (!validFields) {
        Toast.show({
          type: "error",
          text1: "Campos incompletos",
          text2: "Todos os campos são obrigatórios.",
        });
        return;
      }

      const response = await api.post(
        "customers",
        {
          firstName: name,
          lastName: lastName,
          email: email,
          document: cpf,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        Toast.show({
          type: "success",
          text1: "Bem vindo!",
        });
        const userData = formatUser(response.data);
        dispatch(setUser(userData));
        return;
      }

      Toast.show({
        type: "error",
        text1: "NAO 201!",
        text2: "Houve algum problema. Tente novamente.",
      });
    } catch (error) {
      console.log({ error });
      Toast.show({
        type: "error",
        text1: "CATCH!",
        text2: "Houve algum problema. Tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Title>Nome</Title>
      <TextInput
        style={{
          borderBottomWidth: 1,
          padding: 0,
          width: "80%",
          borderRadius: 4,
          marginVertical: 24,
          color: "black",
          fontFamily: Fonts.MEDIUM,
          textAlign: "center",
          fontSize: 18,
        }}
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <Title>Sobrenome</Title>
      <TextInput
        style={{
          borderBottomWidth: 1,
          padding: 0,
          width: "80%",
          borderRadius: 4,
          marginVertical: 24,
          color: "black",
          fontFamily: Fonts.MEDIUM,
          textAlign: "center",
          fontSize: 18,
        }}
        onChangeText={(text) => setLastName(text)}
        value={lastName}
      />
      <Title>E-mail</Title>
      <TextInput
        style={{
          borderBottomWidth: 1,
          padding: 0,
          width: "80%",
          borderRadius: 4,
          marginVertical: 16,
          color: "black",
          fontFamily: Fonts.MEDIUM,
          textAlign: "center",
          fontSize: 18,
        }}
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <Title>CPF</Title>
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
      <View style={{ width: "80%", marginTop: 60 }}>
        <Button
          inverse
          label={"Cadastrar"}
          onPress={() => signUp()}
          loading={loading}
        />
      </View>
    </View>
  );
};

export default SignUpScreen;
