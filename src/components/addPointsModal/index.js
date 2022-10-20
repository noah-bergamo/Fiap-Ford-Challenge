import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from "react-native";
import Title from "../title";
import Label from "../label";
import Button from "../button";
import useAPI from "../../hooks/useAPI";
import { useDispatch, useSelector } from "react-redux";
import { setWalletPoints } from "../../redux/reducers/userReducer";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const App = ({ modalVisible, onRequestClose }) => {
  const api = useAPI();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [code, setCode] = useState("FIAP12LFORDCODEBL340DM09000");

  const onFinish = async () => {
    try {
      const customerId = user.uuid;
      const response = await api.put(`customers/${customerId}/points/${code}`);
      if (response.status === 200) {
        Toast.show({
          type: "success",
          text1: "Resgate de pontos",
          text2: "Pontos resgatados com sucesso",
        });
        dispatch(setWalletPoints(response.data.wallet));
        onRequestClose();
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Resgate de pontos",
        text2: "Houve um problema ao verificar o código",
      });
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onRequestClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ alignItems: "center", marginBottom: 12 }}>
              <Title>RESGATE DE PONTOS</Title>
              <View style={{ height: 12 }} />
              <Label>
                Digite o código para adicionar pontos à sua carteira
              </Label>
            </View>
            <TextInput
              style={{
                padding: 0,
                borderWidth: 1,
                height: 44,
                color: "black",
                paddingHorizontal: 12,
              }}
              onChangeText={(text) => setCode(text)}
              value={code}
            />
            <View style={{ height: 30 }} />
            <Button label={"Adicionar"} inverse onPress={onFinish} />
            <View style={{ height: 12 }} />
            <Button label={"Cancelar"} onPress={onRequestClose} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000030",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default App;
