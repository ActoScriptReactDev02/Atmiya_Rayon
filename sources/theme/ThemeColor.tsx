import { useMemo } from 'react';
import { useTheme } from '../common/RNThemeContext';

const LightTheme = {
  Black: '#000000',
  White: '#ffffff',
  Transparent: 'transparent',
  Red: '#BF292C',
  Grey: '#E9E9E9',
  DarkGrey: '#9D9D9D',
  GreyLight: '#5A5A5A',
  Purple: '#942FFA',
  Placeholder: '#9A9A9A',
  OfWhiteColor: '#EEEEEE',
  Border: '#E2E2E2',
  BulrTextColor: '#00000090',
  darkBackground: '#EAE7ED',
  lightPurple: '#E2D0F4',
};

const DarkTheme = {
  Black: '#ffffff',
  White: '#141414',
  Transparent: 'transparent',
  Red: '#BF292C',
  Grey: '#272727',
  DarkGrey: '#575757',
  GreyLight: '#888888',
  Purple: '#942FFA',
  Placeholder: '#9A9A9A',
  OfWhiteColor: '#202020',
  Border: '#464646',
  BulrTextColor: '#888888',
  darkBackground: '#26232A',
  lightPurple: '#28232C',
};

export const useThemeColors = () => {
  const { colorScheme } = useTheme();
  return useMemo(() => {
    return colorScheme === 'dark' ? DarkTheme : LightTheme;
  }, [colorScheme]);
};
