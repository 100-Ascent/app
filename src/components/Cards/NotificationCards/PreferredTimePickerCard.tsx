import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { Colors } from '../../../utils/colors';
import Text12Normal from '../../Text/Text12Normal';
import Text16Normal from '../../Text/Text16Normal';
import Text24 from '../../Text/Text24';
import Text32bold from '../../Text/Text32bold';
import PreferredTimeIcon from '../../../../assets/icons/preferred-time-icon.svg';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

interface Props{
}

export type AndroidMode = 'date' | 'time';

const PreferredTimePickerCard: React.FC<Props> = ({ }) => {

//State variables
  const [time, setTime] = useState(new Date());
  const [timeToShow, setTimeToShow] = useState("07:00") ;
  const [mode, setMode] = useState<AndroidMode>('time');
  const [show, setShow] = useState(false);

//Async functions
  const onChange = (event, selectedDateTime) => {
    if(selectedDateTime!==undefined){
        let timeToSend = moment.utc(selectedDateTime).format("HH:mm");
        let timeToShow = moment(selectedDateTime).format("HH:mm");
        setShow(false);
        setTimeToShow(timeToShow);
        console.log(timeToSend);
    }else{
        setShow(false);
    }
         
  };
//Component functions
const getTime = (timeToShow : string) => {
    let time = timeToShow;
    let hours = time.split(":")[0];
    let minutes = time.split(":")[1];
    let hoursInInt = parseInt(hours) > 12 ? parseInt(hours)%12 : parseInt(hours); 
    return hoursInInt < 10 ? "0" + hoursInInt + ":" + minutes : hoursInInt + ":" + minutes;
}

return <View style={{ flex:1, backgroundColor: Colors.TEXT, elevation: 5, borderRadius: 10, paddingBottom: 20, marginHorizontal: 10, overflow: 'hidden' }}>
    <View style={{ flex:1, justifyContent: 'flex-end', flexDirection: 'row', paddingRight: 10, paddingTop: 10 }}>
        <Icon name="edit" size={18} onPress={()=>setShow(true)} />  
        <View style={{ paddingLeft: 5 }}/>
        <TouchableOpacity onPress={()=>setShow(true)}>
        <Text12Normal text={"Edit"} textColor={Colors.BLACK2}/>
        </TouchableOpacity>              
    </View>
    <View style={{ alignItems: 'center' }}>
        <Text16Normal text={"I usually workout at"} textColor={Colors.BLACK2} textStyle={{ fontFamily: 'Quicksand-SemiBold' }}/>        
    </View>
    <View style={{ paddingTop: 5, flexDirection: 'row', justifyContent: 'center' }}>
        <View style={{ justifyContent:'flex-end' }}>
            <Text32bold text={getTime(timeToShow)} textColor={Colors.TEXTDARK}/>     
        </View>
        <View style={{ paddingLeft: 5, alignItems: 'flex-start', justifyContent:'flex-end', paddingBottom: 3 }}>
        <Text24 text={timeToShow.split(":")[0] >= '12' ? "PM" : "AM"} textColor={Colors.TEXTDARK}/>
        </View>        
    </View>
    <View style={{ alignItems: 'center', paddingLeft: 10 }}>
        <Text12Normal text={"We'll remind you 15 minutes prior"} textColor={Colors.BLACK2}/>        
    </View>
    <View style={{ position: 'relative', left: -160, bottom: 80, opacity: 0.6 }}>
        <PreferredTimeIcon/>
    </View>

    {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={time}
          mode={mode}
          is24Hour={false}
          display="clock"
          onChange={onChange}
        />
      )}
</View>;
}

export default PreferredTimePickerCard;