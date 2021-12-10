import React from 'react';
import {Button, Linking, View} from 'react-native';
import CustomPopUp from '../components/PopUps/CustomPopUp';
import {RootNavProp} from '../routes/RootStackParamList';
import UpdateAppIcon from '../../assets/modal-icons/update-app.svg';
interface Props {}

const ForceUpdateScreen: React.FC<Props> = () => {
  //State variables

  //Async functions

  //Component functions

  return (
      <CustomPopUp
        icon={<UpdateAppIcon />}
        visible={true}
        onOk={() => Linking.openURL('market://details?id=com.tym.tym_100ascent')}
        isCancelable={false}
        oKText={'OKAY'}
        header={'Update Now'}
        description={'Please update the app to continue'}
        isCloseButton={false}   
        isDescriptionLong={false} 
      />
  );
};

export default ForceUpdateScreen;
