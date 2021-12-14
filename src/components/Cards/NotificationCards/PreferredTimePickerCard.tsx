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
import axios from 'axios';
import { USER_DETAILS_UPDATE } from '../../../utils/apis/endpoints';

interface Props{
    prefer_time: string;
}

export type AndroidMode = 'date' | 'time';

const PreferredTimePickerCard: React.FC<Props> = ({ prefer_time }) => {

    const getTime = (timeToShow : string) => {
        let time = timeToShow;
        let hours = parseInt(time.split(":")[0]);
        let minutes = parseInt(time.split(":")[1]);
        var offset = new Date().getTimezoneOffset();
        const hour_offset = Math.floor(offset/-60)
        const minute_offset = -( offset % 60 );
    
        hours = hours + hour_offset;
        minutes = minutes + minute_offset;
        
        hours = hours > 12 ? hours%12 : hours; 
    
        if(minutes>=60){
            minutes = minutes % 60;
            hours= hours + 1;        
            hours = hours >= 12 ? timeAMorPM === "PM" && hours !== 12  ?  hours%12 : hours ===12 ? hours%12 : hours : hours; 
        }
        return hours < 10 ? "0" + hours + ":" + (minutes< 10 ? "0" + minutes: minutes) : hours + ":" + (minutes< 10 ? "0" + minutes: minutes);
    }

    const getTimeIn24Hour = (timeToShow : string) => {
        let time = timeToShow;
        let hours = parseInt(time.split(":")[0]);
        let minutes = parseInt(time.split(":")[1]);
        var offset = new Date().getTimezoneOffset();
        const hour_offset = Math.floor(offset/-60)
        const minute_offset = -( offset % 60 );
    
        hours = hours + hour_offset;
        minutes = minutes + minute_offset;
        
        if(minutes>=60){
            minutes = minutes % 60;
            hours= hours + 1;
            hours = hours === 24 ? hours%24 : hours>12 ? hours % 12 :  hours; 
        }
        return hours < 10 ? "0" + hours + ":" + (minutes< 10 ? "0" + minutes: minutes) : hours + ":" + (minutes< 10 ? "0" + minutes: minutes);
    }


//State variables
  const [time, setTime] = useState(new Date());
  const [timeToShow, setTimeToShow] = useState(prefer_time);
  const [mode, setMode] = useState<AndroidMode>('time');
  const [show, setShow] = useState(false);
  const [timeAMorPM,setTimeAMorPm] = useState(parseInt(getTimeIn24Hour(prefer_time).split(":")[0]) >= 12 ? "PM" : "AM");

//Async functions
  const onChange = (event, selectedDateTime) => {
    if(selectedDateTime!==undefined){
        let timeToSend = moment.utc(selectedDateTime).format("HH:mm");
        let timeToShow = moment.utc(selectedDateTime).format("HH:mm");
        let timeAMorPM = parseInt(moment(selectedDateTime).format("HH:mm").split(":")[0]) >= 12 ? "PM" : "AM";
        setTimeAMorPm(timeAMorPM);
        setShow(false);
        setTimeToShow(timeToShow);
        handleEditPreferredTime(timeToSend);
    }else{
        setShow(false);
    }
         
  };
//Component functions



const handleEditPreferredTime = async (timeToSend) => {
    const data = {
        prefer_time : timeToSend
    }
    console.log(data.prefer_time);
    await axios
        .post(USER_DETAILS_UPDATE, data)
        .then(async res => {
        console.log(res.data);
        })
        .catch(err => {
        console.log('failed');
        console.log(err);
        });
}

return <View style={{ flex:1, backgroundColor: Colors.TEXT, elevation: 5, borderRadius: 10, paddingBottom: 20, marginHorizontal: 10, overflow: 'hidden' }}>
    <View style={{ flex:1, justifyContent: 'flex-end', flexDirection: 'row', paddingRight: 10, paddingTop: 10 }}>
        <TouchableOpacity onPress={()=>setShow(true)}>
            <View style={{ flexDirection: 'row' }}>
            <Icon name="edit" size={18} />  
            <View style={{ paddingLeft: 5 }}/>        
            <Text12Normal text={"Edit"} textColor={Colors.BLACK2}/>
            </View>
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
        <Text24 text={timeAMorPM} textColor={Colors.TEXTDARK}/>
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
          is24Hour={true}
          display="clock"
          onChange={onChange}
          minuteInterval={15}          
        />
      )}
</View>;
}

export default PreferredTimePickerCard;