import React, {useState} from 'react';
import {View, Text} from 'react-native';
import GoogleFit, {Scopes} from 'react-native-google-fit';
import {RootNavProp} from '../routes/RootStackParamList';

interface Props {
  navigation: RootNavProp<'GoogleFitScreen'>;
}
const GoogleFitScreen: React.FC<Props> = () => {
  const [dailySteps, setdailySteps] = useState(0);
  const [heartRate, setHeartRate] = useState(0);
  const [calories, setCalories] = useState(0);
  const [hydration, setHydration] = useState(0);
  const [sleep, setSleep] = useState(0);
  const [weight, setWeight] = useState(0);
  const [bloodPressure, setBloodPressure] = useState({});
  const [loading, setLoading] = useState(true);
  const options = {
    scopes: [
      Scopes.FITNESS_ACTIVITY_READ,
      Scopes.FITNESS_ACTIVITY_WRITE,
      Scopes.FITNESS_BODY_READ,
      Scopes.FITNESS_BODY_WRITE,
      Scopes.FITNESS_BLOOD_PRESSURE_READ,
      Scopes.FITNESS_BLOOD_PRESSURE_WRITE,
      Scopes.FITNESS_BLOOD_GLUCOSE_READ,
      Scopes.FITNESS_BLOOD_GLUCOSE_WRITE,
      Scopes.FITNESS_NUTRITION_WRITE,
      Scopes.FITNESS_SLEEP_READ,
    ],
  };
  var today = new Date();
  var lastWeekDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 8,
  );
  const opt = {
    startDate: lastWeekDate.toISOString(), // required ISO8601Timestamp
    endDate: today.toISOString(), // required ISO8601Timestamp
    bucketUnit: 'DAY', // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
    bucketInterval: 1, // optional - default 1.
  };

  let fetchStepsData = async opt => {
    const res = await GoogleFit.getDailyStepCountSamples(opt);
    if (res.length !== 0) {
      for (var i = 0; i < res.length; i++) {
        if (res[i].source === 'com.google.android.gms:estimated_steps') {
          let data = res[i].steps.reverse();
          const dailyStepCount = res[i].steps;
          setdailySteps(data[0].value);
        }
      }
    } else {
      console.log('Not Found');
    }
  };
  GoogleFit.checkIsAuthorized().then(() => {
    var authorized = GoogleFit.isAuthorized;
    console.log(authorized);
    if (authorized) {
      // if already authorized, fetch data
      fetchStepsData(opt);
    } else {
      // Authentication if already not authorized for a particular device
      GoogleFit.authorize(options)
        .then(authResult => {
          if (authResult.success) {
            console.log('AUTH_SUCCESS');
            fetchStepsData(opt);

            // if successfully authorized, fetch data
          } else {
            console.log('AUTH_DENIED ');
          }
        })
        .catch(() => {
          dispatch('AUTH_ERROR');
        });
    }
  });

  return (
    <View>
      <Text>Daily steps is {dailySteps}</Text>
    </View>
  );
};
export default GoogleFitScreen;
function dispatch(arg0: string) {
  throw new Error('Function not implemented.');
}
