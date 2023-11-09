import React,{useState} from "react";
import {View,Text,Picker,Modal} from "react-native";


function ComboBox({ options, selectedValue, onValueChange }) {
    const [modalVisible, setModalVisible] = useState(false);
  
    return (
      <View>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={{ height: 50, width: 200 }}
        >
          {options.map((option, index) => (
            <Picker.Item key={index} label={option.label} value={option.value} />
          ))}
        </Picker>
        <Text
          onPress={() => setModalVisible(true)}
          style={{ color: 'blue' }}
        >
          Open
        </Text>
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={false}
          onRequestClose={() => setModalVisible(false)}
        >
          <View>
            <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue) => {
                onValueChange(itemValue);
                setModalVisible(false);
              }}
            >
              {options.map((option, index) => (
                <Picker.Item key={index} label={option.label} value={option.value} />
              ))}
            </Picker>
          </View>
        </Modal>
      </View>
    );
  }
  
  export default ComboBox;
  