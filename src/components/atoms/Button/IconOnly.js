import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {IconDelete} from '../../../assets';

const IconOnly = ({onPress, icon}) => {
  const Icon = () => {
    if (icon === 'icon-delete') {
      return <IconDelete />;
    }
    return <IconDelete />;
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon />
    </TouchableOpacity>
  );
};
export default IconOnly;
