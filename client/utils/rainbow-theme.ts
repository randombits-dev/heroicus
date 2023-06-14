import {darkTheme} from '@rainbow-me/rainbowkit';

export const customRainbowTheme = darkTheme({
  accentColor: 'rgb(23,23,23)',
  accentColorForeground: '#ccc',
  // connectButtonInnerBackground: 'rgb(23,23,23)',
  // profileActionHover: 'none',
  fontStack: 'system',
  borderRadius: 'none',
  overlayBlur: 'small'
});

customRainbowTheme.colors.generalBorder = 'red';
customRainbowTheme.colors.connectionIndicator = 'red';
customRainbowTheme.shadows.connectButton = 'none';
customRainbowTheme.shadows.selectedWallet = 'none';
