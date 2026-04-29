import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import ISelectOptions from '../Interfaces/ISelectOptions';

interface IConfigSelect
{
    current_value:string,
    options: ISelectOptions[],
    onSelectChange: (value: string) => void;
}

export default function LanguageSelector(props:IConfigSelect)
{
  const [currentValue, setCurrentValue] = useState(props.current_value);
  const [showMenu, setShowMenu] = useState(false);

  const handleSelect = (value:string) => {
    props.onSelectChange(value);
    setCurrentValue(value);
    setShowMenu(false);
  };

  return (
    <View style={styles.container} accessible={true}>
      <TouchableOpacity style={styles.selectorButton} onPress={() => setShowMenu(!showMenu)}>
        <Text style={styles.languageText}>
          {currentValue.toUpperCase()}
        </Text>
        <Text style={styles.arrowIcon} accessibilityLabel="Selector de idiomas" accessibilityRole="text">{showMenu ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {showMenu && (
        <View style={styles.menu} accessible={true} accessibilityLabel="Opciones" accessibilityRole="text">
          {
            props.options.map((currentValue,index)=>(
                <TouchableOpacity  accessible={true} accessibilityLabel={`Idioma ${currentValue.label}`} accessibilityRole="text" key={index} onPress={() => handleSelect(currentValue.value)} style={styles.menuItem}>
                    <Text style={styles.menuText}>{currentValue.label}</Text>
                </TouchableOpacity>
            ))
          }
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 40,
    right: 15,
    zIndex: 100,
  },
  selectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#555',
  },
  languageText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    minWidth: 20,
    textAlign: 'center',
  },
  arrowIcon: {
    margin:5,
    color: 'white',
    fontSize: 10,
    marginLeft: 4,
  },
  menu: {
    position: 'absolute',
    margin:5,
    top: 28,
    right: 0,
    backgroundColor: '#333',
    borderRadius: 6,
    //overflow: 'hidden',
    width: 70,
  },
  menuItem: {
    paddingVertical: 8,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#555',
  },
  menuText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

