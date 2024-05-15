import {
    TextInput as RNTextInput,
    View,
    StyleSheet,
    TouchableOpacity,
    Platform,
  } from "react-native";
  import React, { useState, useRef } from "react";

  import { heightPercentage, isIpad } from "../utils";
  
  const TextField = ({
    editable,
    initialValue,
    label,
    error,
    labelColor,
    renderRightComponent,
    hideError,
    onChange,
    secureTextEntry,
    multiline,
    textFieldStyle,
    inputFocused,
    maxLength,
    keyboardType,
    blurOnSubmit,
    textAlignVertical,
    onSubmitEditing,
    textFieldRef,
    icon_name,
    CustomeIcon,
    backgroundColor,
    placeholderTextColor,
    mainContainerStyle={},
    ...otherProps
  }) => {
    const [isFocused, setFocused] = useState(false);
    const [value, setValue] = useState(initialValue);
    const [isSecureVisible, setSecureVisible] = useState(false);
  
    const inputRef = useRef(null);
  
  
  
    return (
      <View>
        <View
          style={[
            styles.inputContainer,
            isFocused && styles.inputContainerActive,
            error && styles.inputContainerError,
            mainContainerStyle
          ]}
        >
        {CustomeIcon ? CustomeIcon() : ""}
  
          <RNTextInput
            editable={editable}
            defaultValue={initialValue}
            value={value}
            style={[styles.input, multiline && styles.textarea]}
            autoCapitalize="none"
            onFocus={() => setFocused(true)}
            placeholderTextColor={placeholderTextColor}
            // onEndEditing={() => setFocused(false)}
            ref={
              textFieldRef
                ? textFieldRef
                : (ref) => {
                    inputRef.current = ref;
                  }
            }
            onChange={setValue}
            onChangeText={setValue}
            underlineColorAndroid="transparent"
            secureTextEntry={isSecureVisible}
            textAlignVertical={textAlignVertical}
            multiline={multiline}
            {...otherProps}
            maxLength={maxLength ? maxLength : 1000}
            keyboardType={keyboardType}
            onSubmitEditing={onSubmitEditing}
            blurOnSubmit={blurOnSubmit}
          />
  
        </View>
      </View>
    );
  };
  

  
  TextField.defaultProps = {
    editable: true,
    value: null,
    error: null,
    label: null,
    mainContainerStyle: {},
    labelColor: "white",
    initialValue: "",
    renderRightComponent: null,
    hideError: false,
    secureTextEntry: false,
    multiline: false,
  };
  
  const styles = StyleSheet.create({
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 10,
      marginBottom:3,
    //   borderWidth: 1.2,
    //   borderColor: "gray",
      backgroundColor: "#f2f7f6"
      // flex: 1,
    },
    input: {
      height:Platform.isPad ? 33:40,
      flex: 1,
      // padding:15,
      paddingVertical: 5,
      paddingHorizontal: 10,
      color: "gray",
      borderRadius: 20,
      fontSize:isIpad?25:14,
    },
    inputContainerActive: {
      borderColor: "gray",
    },
    inputContainerError: {
      borderColor: "red",
    },
    error: {
      marginBottom: 4,
      fontSize: Platform.isPad ? heightPercentage(2) : heightPercentage(1.7),
      color: "red",
    },
    rightContainer: {
      marginRight: 15,
    },
    textarea: {
      minHeight: 200,
    },
    text: {
      // fontSize: isIpad ? heightPercentage(1.9) : heightPercentage(1.8),
    },
  });
  
  export default TextField;
  