import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, View, TextInput } from "react-native";
import Title from "../title";
import Label from "../label";
import Button from "../button";
import useAPI from "../../hooks/useAPI";
import { useDispatch, useSelector } from "react-redux";
import { setWalletPoints } from "../../redux/reducers/userReducer";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import Clipboard from "@react-native-clipboard/clipboard";

const RedeemCodeModal = ({ modalVisible, onRequestClose, reward }) => {
  const api = useAPI();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [code, setCode] = useState("");

  useEffect(() => {
    if (modalVisible) getCode();
  }, [modalVisible]);

  const getCode = async () => {
    try {
      const customerId = user.uuid;
      const response = await api.put(
        `customers/${customerId}/rewards/${reward.uuid}/redeem`
      );
      console.log({ response });

      setCode(response.data.redeemCode);
    } catch (error) {
      console.log({ error });
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
            <View
              style={{
                alignItems: "center",
                marginBottom: 12,
                paddingHorizontal: 16,
              }}
            >
              <Title size={18} style={{ textAlign: "center" }}>
                {reward?.name.toUpperCase()}
              </Title>
              <View style={{ height: 12 }} />
            </View>
            <Label>{reward?.description}</Label>

            <View style={{ height: 30 }} />
            <Title size={18}>Código</Title>
            <View
              style={{
                marginVertical: 12,
                padding: 8,
                borderRadius: 8,
                borderWidth: 1,
              }}
            >
              <Label>{code}</Label>
            </View>
            <Button
              label={"Copiar código"}
              inverse
              onPress={() => {
                Clipboard.setString(code);
                Toast.show({
                  type: "success",
                  text1: "SUCESSO!",
                  text2: "Código copiado para sua área de transferência",
                });
              }}
            />
            <View style={{ height: 12 }} />
            <Button label={"Fechar"} onPress={onRequestClose} />
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
    backgroundColor: "#00000035",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 16,
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
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
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

export default RedeemCodeModal;
