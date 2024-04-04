import { motion } from 'framer-motion';
import React, { useState } from 'react';

interface SwitchProps {
  colorOn?: string;
  colorOff?: string;
  onChange?: (isOn: boolean) => void;
}

const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
};

const bgcolorSwitch = 'rgba(255, 255, 255, 0.4)';

const switchStyles = {
  width: '60px', // Reducir aún más el ancho del switch
  height: '30px', // Reducir aún más la altura del switch
  //backgroundColor: bgcolorSwitch,
  display: 'flex',
  justifyContent: 'flex-start',
  borderRadius: '15px', // Reducir aún más el radio del borde del switch
  padding: '2px', // Reducir aún más el padding para que el switch sea más compacto
  cursor: 'pointer',
};

const handleStyles = {
  width: '25px', // Reducir aún más el ancho del asa
  height: '25px', // Reducir aún más la altura del asa
  backgroundColor: 'white',
  borderRadius: '50%', // Hacer el asa más redonda
};

export const Switch: React.FC<SwitchProps> = ({
  colorOff,
  colorOn,
  onChange,
}) => {
  const [isOn, setIsOn] = useState(false);
  const toggleSwitch = () => {
    setIsOn(!isOn);
    onChange && onChange(isOn);
  };

  return (
    <div
      style={{
        ...switchStyles,
        backgroundColor: isOn
          ? colorOn || bgcolorSwitch
          : colorOff || bgcolorSwitch,
        justifyContent: isOn ? 'flex-end' : 'flex-start',
      }}
      data-isOn={isOn}
      onClick={toggleSwitch}
    >
      <motion.div style={handleStyles} layout transition={spring} />
    </div>
  );
};
