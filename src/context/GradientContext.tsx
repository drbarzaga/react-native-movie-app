import React, {createContext, useState} from 'react';

type ImageColors = {
  primary: string;
  secondary: string;
};

type ContextProps = {
  colors: ImageColors;
  prevColors: ImageColors;
  setMainColors: (payload: ImageColors) => void;
  setMainPrevColors: (payload: ImageColors) => void;
};

// Context
export const GradientContext = createContext({} as ContextProps);

// Provider

export const GradientProvider = ({children}: any) => {
  const [colors, setColors] = useState<ImageColors>({
    primary: 'red',
    secondary: 'blue',
  });

  const [prevColors, setPrevColors] = useState<ImageColors>({
    primary: 'transparent',
    secondary: 'transparent',
  });

  const setMainColors = (payload: ImageColors) => setColors(payload);

  const setMainPrevColors = (payload: ImageColors) => setPrevColors(payload);

  return (
    <GradientContext.Provider
      value={{
        colors,
        prevColors,
        setMainColors,
        setMainPrevColors,
      }}>
      {children}
    </GradientContext.Provider>
  );
};
