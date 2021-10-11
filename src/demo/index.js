
import React ,{useState,useEffect} from "react"
import { TYSdk} from 'tuya-panel-kit';
const TYEvent = TYSdk.event;
const TYDevice = TYSdk.device;

TYSdk.device.getDeviceState()
.then(data => {
    console.log('data :>> ', data);
  })
  .catch(error => {
    console.log('error :>> ', error);
  });





// function Btn(){
//   const [state, Setstate] = useState(0);

//   return(
//     <div>
//       <p>{state}</p>
//       <button onClick={()=>Setstate(state+1)}>click</button>
//     </div>
//   )
// }

// export default Btn;