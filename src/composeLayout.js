import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { TYSdk, Theme } from 'tuya-panel-kit';
import { devInfoChange, deviceChange, responseUpdateDp } from './redux/modules/common';
import theme from './config/theme';
import Video from 'react-native-video';
import { commonApi } from '@tuya/tuya-panel-api';
// import Btn from './demo'
   

const TYEvent = TYSdk.event;
const TYDevice = TYSdk.device;

const composeLayout = (store, component) => {
  const NavigatorLayoutContainer = connect(_.identity)(component);
  const { dispatch } = store;

  TYEvent.on('deviceDataChange', data => {
    switch (data.type) {
      case 'dpData':
        dispatch(responseUpdateDp(data.payload));
        break;
      default:
        dispatch(deviceChange(data.payload));
        break;
    }
  });

  TYEvent.on('networkStateChange', data => {
    dispatch(deviceChange(data));
  });

  class PanelComponent extends Component {
    static propTypes = {
      devInfo: PropTypes.object.isRequired,
    };

    constructor(props) {
      super(props);
      
      TYSdk.device.getDeviceState()
.then(data => {
  console.group('111')
    console.log('data :>> ', data);
    console.groupEnd('end')
  })
  .catch(error => {
    console.log('error :>> ', error);
  });




      //
      if (props && props.devInfo && props.devInfo.devId) {
        TYDevice.setDeviceInfo(props.devInfo);
        TYDevice.getDeviceInfo().then(data => dispatch(devInfoChange(data)));
        // eslint-disable-next-line
      } else if (props.preload) {
        // do something
      } else {
        TYDevice.getDeviceInfo().then(data => dispatch(devInfoChange(data)));
      }
    }

    render() {
      return (
        <Provider store={store}>
          <Theme theme={theme}>
            <NavigatorLayoutContainer />
            {/* <Video
          style={{ width: 100, height: 100 }}
          source={{ uri: 'https://images.tuyacn.com/rms-static/316727e0-019d-11ec-bcdf-4bac2b1d3cd1-1629453519198.mp4?tyName=%E6%B6%82%E9%B8%A6%E5%93%81%E7%89%8C%E5%AE%A3%E4%BC%A0%E7%89%87-8.20.mp4' }}
          // source={{ uri: '../../res/1.mp3' }}
          paused={false}
          repeat={false}
          volume={1.0}
        /> */}
        {/* <Btn/> */}
          </Theme>
        </Provider>
      );
    }
  }

  return PanelComponent;
};

export default composeLayout;
