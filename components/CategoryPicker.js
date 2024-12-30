import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { colors } from '../styles';
import { Ionicons } from '@expo/vector-icons';

const ALL_CATEGORIES = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

const CategoryPicker = ({ selectedCategories = [], setSelectedCategories }) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(
    ALL_CATEGORIES.map((category) => ({
      label: category.name,
      value: category.id,
    }))
  );

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={selectedCategories}
        items={items}
        setOpen={setOpen}
        setValue={setSelectedCategories}
        setItems={setItems}
        multiple={true}
        mode="BADGE"
        placeholder="Categories"
        onSelectItem={() => setOpen(false)}
        badgeStyle={styles.badge}
        badgeTextStyle={styles.badgeText}
        placeholderStyle={styles.placeholder}
        listItemLabelStyle={styles.listItemLabel}
        arrowIconStyle={styles.arrowIcon}
        listItemContainerStyle={styles.listItemContainer}
        showBadgeDot={false}
        badgeColors={['#212121']}
        dropDownContainerStyle={styles.dropdown}
        style={styles.dropdownPicker}
        TickIconComponent={() => (
          <Ionicons name="checkmark-outline" color={colors.grey100} size={16} />
        )}
        ArrowDownIconComponent={() => (
          <Ionicons
            name="chevron-down-outline"
            color={colors.grey100}
            size={16}
          />
        )}
        ArrowUpIconComponent={() => (
          <Ionicons
            name="chevron-up-outline"
            color={colors.grey100}
            size={16}
          />
        )}
        itemSeparator={true}
        itemSeparatorStyle={styles.itemSeparator}
        CloseIconComponent={() => (
          <Ionicons
            name="chevron-up-outline"
            color={colors.grey100}
            size={16}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 20,
  },
  dropdownPicker: {
    backgroundColor: '#343434',
    borderColor: '#343434',
    borderWidth: 1,
    minHeight: 40,
  },
  dropdown: {
    backgroundColor: '#2a2a2a',
    borderColor: '#2a2a2a',
    borderRadius: 15,
  },
  badge: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    backgroundColor: '#212121',
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  placeholder: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  listItemLabel: {
    fontSize: 14,
    color: '#d5d4d4',
    fontWeight: '600',
  },
  arrowIcon: {
    color: '#adadad',
  },
  listItemContainer: {
    height: 40,
  },
  itemSeparator: {
    backgroundColor: '#212121',
  },
});

export default CategoryPicker;
