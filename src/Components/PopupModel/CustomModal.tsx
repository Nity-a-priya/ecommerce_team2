import React from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

const CustomModal: React.FC<Props> = ({isVisible, onClose}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.text}>Order Placed Successfully</Text>

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Ok</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 40,
    borderRadius: 10,
    elevation: 5, // shadow on Android
  },

  button: {
    borderRadius: 20,
    backgroundColor: 'green',
    width: 100,
    paddingVertical: 5,
    marginTop: 30,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white', // Change to your desired color
    fontSize: 16,
    textAlign: 'center',
  },
  text: {
    color: 'black', // Change to your desired color
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CustomModal;
