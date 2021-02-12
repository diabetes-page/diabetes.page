import React from 'react';
import { StyleSheet } from 'react-native';
import { List, Menu, Text } from 'react-native-paper';
import { useSelector } from '../../redux/root/hooks';
import { useMenu } from '../../utilities/hooks/hooks';

export function UserMenu(): JSX.Element {
  const name = useSelector((state) => state.user.name);
  const { visible, openMenu, closeMenu } = useMenu();

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      style={styles.menu}
      anchor={
        <Text onPress={openMenu} style={styles.nameWrapper}>
          <List.Icon icon="account-circle" style={styles.nameIcon} />
          {name}
          <List.Icon icon="chevron-down" style={styles.nameIcon} />
        </Text>
      }
    >
      <Menu.Item onPress={() => void 0} title="Logout" />
    </Menu>
  );
}

const styles = StyleSheet.create({
  menu: {
    // @ts-ignore: React native only allows transforms like specified in https://reactnative.dev/docs/transforms
    // Percentages are not possible. It works for web though.
    transform: 'translateY(50%)',
  },
  nameWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  nameIcon: {
    margin: 0,
  },
});
