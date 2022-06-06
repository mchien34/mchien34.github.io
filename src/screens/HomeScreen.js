import "../App.css";
import Clock from "../components/Clock";
import SensorWidget from "../components/SensorWidget";
import { ColorConstant } from "../value/color_constant";
import thermo_icon from "../assets/thermo.png";
import dissolveOxy_icon from "../assets/moist.png";
import pH_icon from "../assets/pH.png";
import salitiny_icon from "../assets/salitiny.png";
import bg_1 from "../assets/greenhouse.jpg";
// import bg_1_1 from "../assets/bg-1-1.png";
// import bg_1_2 from "../assets/bg-1-2.png";
// import bg_1_3 from "../assets/bg-1-3.png";

import LineChart from "../components/LineChart";

import { Constant } from "../value/constant";
// import { DateTime } from "luxon";
import React, { useEffect, useRef, useState } from "react";
import Title from "../components/Title";
import AlertPopup from "../components/AlertPopup";
import Switch from "react-switch";
// import { MockTest } from "../components/MockTestJSON";
// import { MockTestPH } from "../components/MockTestJsonPH";
// import { MockTestDissolveOxy } from "../components/MockTestJsonDissolveOxy";

// import LimitationTable from "../components/LimitationTable";
// import Dropdown from "react-dropdown";
// import DropdownBar from "../components/DropdownBar";
import axios from "axios";
import "react-dropdown/style.css";
import Select from "react-select";
import { checkAlert } from "../util/checkAlert";
const HomeScreen = () => {
  // const [time, setTime] = useState(
  //   DateTime.fromISO("2021-12-01T06:58:33.988648+00:00")
  // );

  const [isEnabledAlert, setIsEnabledAlert] = useState(true);
  const [isMute, setIsMute] = useState(true);
  const [temper,setTemper] = useState({
    temperature : 0,
    humidity: 0
  });

  // const [pondSelected, setPondSelected] = useState({ value: 1 });
  const [selectedOption, setSelectedOption] = useState({
    value: "Khu vực 1",
    label: "Khu vực 1",
    color: "red",
  });
  const [iotDataFromAPI, setIotDataFromAPI] = useState({
    temperature: 30,
    light: 54,
    soilMoiture: 28,
    salinity: 0,
    isAlertTemperature: 0,
    isAlertLight: 0,
    isAlertSoilMoiture: 0,
    isAlertSalinity: 0,
    labelChart: [],
    dataChartTemperature: [],
    dataChartDissolveOxy: [],
    dataChartPH: [],
    dataChartSalinity: [],
  });

  const [iotDataFromAPI1, setIotDataFromAPI1] = useState({
    temperature: 30,
    dissolveOxy: 54,
    pH: 28,
    salinity: 0,
    isAlertTemperature: 0,
    isAlertLight: 0,
    isAlertSoilMoiture: 0,
    isAlertSalinity: 0,
    labelChart: [],
    dataChartTemperature: [],
    dataChartDissolveOxy: [],
    dataChartPH: [],
    dataChartSalinity: [],
  });

  const [iotDataRender, setIotDataRender] = useState({
    temperature: 30,
    dissolveOxy: 54,
    pH: 28,
    salinity: 0,
    isAlertTemperature: 0,
    isAlertLight: 0,
    isAlertSoilMoiture: 0,
    isAlertSalinity: 0,
    labelChart: [],
    dataChartTemperature: [],
    dataChartDissolveOxy: [],
    dataChartPH: [],
    dataChartSalinity: [],
  });
  const intervalRef = useRef(null);
  // var mockDateTimeSecond = 10;

  //const options = ["Ao nuôi số 1", "Ao nuôi số 2"];
  const options = [
    { value: "Khu vực 1", label: "Khu vực 1", color: "red" },
    { value: "Khu vực 2", label: "Khu vực 2", color: "red" },
  ];
  function handleSwitchPopupChange(checked) {
    setIsEnabledAlert(checked);
  }

  function handleSwitchMute(checked) {
    setIsMute(checked);
  }
  // function handleDropdownChange(option) {
  //   console.log("Option: ", option);
  //   const pondIndex = parseInt(option.value.substring(11, 12)) - 1;
  //   console.log(`Pond Index: ${pondIndex}`);
  //   setPondSelected({ value: pondIndex });
  // }

  // function showAlert() {
  //   console.log("--------------");
  //   if (isEnabledAlert) {
  //     //Xét switch cho phép bật Popup
  //     if (
  //       iotDataRender.isAlertTemperature === 2 ||
  //       iotDataRender.isAlertLight === 2 ||
  //       iotDataRender.isAlertSoilMoiture === 2 ||
  //       iotDataRender.isAlertSalinity === 2
  //     ) {
  //       AlertPopup(
  //         Constant.redWarning,
  //         "Cảnh báo \n Có giá trị vượt ngưỡng",
  //         isMute
  //       );
  //     } else if (
  //       iotDataRender.isAlertTemperature === 1 ||
  //       iotDataRender.isAlertLight === 1 ||
  //       iotDataRender.isAlertSoilMoiture === 1 ||
  //       iotDataRender.isAlertSalinity === 1
  //     ) {
  //       AlertPopup(
  //         Constant.yellowWarning,
  //         "Cảnh báo \n Có giá trị sắp vượt ngưỡng",
  //         isMute
  //       );
  //     }
  //   }
  // } 

  // function handleSwitchMute(checked) {
  //   setIsMute(checked);
  // }
  // function handleDropdownChange(option) {
  //   console.log("Option: ", option);
  //   const pondIndex = parseInt(option.value.substring(11, 12)) - 1;
  //   console.log(`Pond Index: ${pondIndex}`);
  //   setPondSelected({ value: pondIndex });
  // }

 

  useEffect(() => {
    function showAlert() {
      console.log("--------------");
      if (isEnabledAlert) {
        //Xét switch cho phép bật Popup
        if (
          iotDataRender.isAlertTemperature === 2 ||
          iotDataRender.isAlertLight === 2 ||
          iotDataRender.isAlertSoilMoiture === 2 ||
          iotDataRender.isAlertSalinity === 2
        ) {
          AlertPopup(
            Constant.redWarning,
            "Cảnh báo \n Có giá trị vượt ngưỡng",
            isMute
          );
        } else if (
          iotDataRender.isAlertTemperature === 1 ||
          iotDataRender.isAlertLight === 1 ||
          iotDataRender.isAlertSoilMoiture === 1 ||
          iotDataRender.isAlertSalinity === 1
        ) {
          AlertPopup(
            Constant.yellowWarning,
            "Cảnh báo \n Có giá trị sắp vượt ngưỡng",
            isMute
          );
        }
      }
    } 
    showAlert();
  }, [iotDataRender.isAlertLight, iotDataRender.isAlertSalinity, iotDataRender.isAlertSoilMoiture, iotDataRender.isAlertTemperature, isEnabledAlert, isMute]);//iotDataRender


  const fectchAPI1 = async () => {
    const temperatureAPI = "https://api.thingspeak.com/channels/1725772/fields/1.json";
    const salinityAPI = "https://api.thingspeak.com/channels/1725772/fields/2.json";   
    const soilMoitureAPI = "https://api.thingspeak.com/channels/1725772/fields/3.json";
    const lightAPI = "https://api.thingspeak.com/channels/1725772/fields/4.json";

    const temperatureAPI1 = "https://api.thingspeak.com/channels/1725772/fields/5.json";
    const salinityAPI1 = "https://api.thingspeak.com/channels/1725772/fields/6.json";   
    const soilMoitureAPI1= "https://api.thingspeak.com/channels/1725772/fields/7.json";
    const lightAPI1 = "https://api.thingspeak.com/channels/1725772/fields/8.json";
    
    const tempRealTimeAPI = "https://api.openweathermap.org/data/2.5/weather?lat=10.75&lon=106.6667&appid=0cd51e5f044baa0f980d21d916fb7b73";
    
    axios.get(tempRealTimeAPI)
      .then(response => {
        const data1 = response.data.main.temp;
        const data2 = response.data.main.humidity;
        setTemper({
          temperature : data1,
          humidity : data2
        });
        console.log(response.data)
      })
      .catch(console.err);

    const getTemperatureAPI = axios.get(temperatureAPI);
    const getSalinityAPI = axios.get(salinityAPI);
    const getSoilMoitureAPI = axios.get(soilMoitureAPI);
    const getLightAPI = axios.get(lightAPI);

    const getTemperatureAPI1 = axios.get(temperatureAPI1);
    const getSalinityAPI1 = axios.get(salinityAPI1);
    const getSoilMoitureAPI1 = axios.get(soilMoitureAPI1);
    const getLightAPI1 = axios.get(lightAPI1);

    axios.all([getTemperatureAPI, getSalinityAPI, getSoilMoitureAPI, getLightAPI,getTemperatureAPI1, getSalinityAPI1, getSoilMoitureAPI1, getLightAPI1])
    .then(
      axios.spread(async (...allData) => {
        const temperatureData = allData[0].data;
        const salinityData = allData[1].data;
        const soilMoitureData = allData[2].data;
        const lightData = allData[3].data;

        const temperatureData1 = allData[4].data;
        const salinityData1 = allData[5].data;
        const soilMoitureData1 = allData[6].data;
        const lightData1 = allData[7].data;

        const dataObjs1 = temperatureData.feeds;
        var labelChart = dataObjs1.map((dataObj1) => new Date(dataObj1.created_at));
        var dataTemperatureChart = dataObjs1.map((dataObj1) => dataObj1.field1);

        const dataObjs2 = salinityData.feeds;
        var dataSalinityChart = dataObjs2.map((dataObj2) => dataObj2.field2);

        const dataObjs3 = soilMoitureData.feeds;
        var dataSoilMoitureChart = dataObjs3.map((dataObj3) => dataObj3.field3);

        const dataObjs4 = lightData.feeds;
        var dataLightChart = dataObjs4.map((dataObj4) => dataObj4.field4);

        const dataObjs5 = temperatureData1.feeds;
        var labelChart1 = dataObjs5.map((dataObj5) => new Date(dataObj5.created_at));
        var dataTemperatureChart1 = dataObjs5.map((dataObj5) => dataObj5.field5);

        const dataObjs6 = salinityData1.feeds;
        var dataSalinityChart1 = dataObjs6.map((dataObj6) => dataObj6.field6);

        const dataObjs7 = soilMoitureData1.feeds;
        var dataSoilMoitureChart1 = dataObjs7.map((dataObj7) => dataObj7.field7);

        const dataObjs8 = lightData1.feeds;
        var dataLightChart1 = dataObjs8.map((dataObj8) => dataObj8.field8);
        //Simulate data
        dataTemperatureChart[50] = parseInt(dataTemperatureChart[50]);
        dataTemperatureChart[99] = parseInt(dataTemperatureChart[99]);

        dataSalinityChart[50] = parseInt(dataSalinityChart[50]);
        dataSalinityChart[99] = parseInt(dataSalinityChart[99] );
        
        dataSoilMoitureChart[50] = parseInt(dataSoilMoitureChart[50]);
        dataSoilMoitureChart[99] = parseInt(dataSoilMoitureChart[99]);
       
        dataLightChart[50] = parseInt(dataLightChart[50]);
        dataLightChart[99] = parseInt(dataLightChart[99] )
        //data2
        dataTemperatureChart1[50] = parseInt(dataTemperatureChart1[50]);
        dataTemperatureChart1[99] = parseInt(dataTemperatureChart1[99]);

        dataSalinityChart1[50] = parseInt(dataSalinityChart1[50]);
        dataSalinityChart1[99] = parseInt(dataSalinityChart1[99]);
        
        dataSoilMoitureChart1[50] = parseInt(dataSoilMoitureChart1[50]);
        dataSoilMoitureChart1[99] = parseInt(dataSoilMoitureChart1[99]);
        
        dataLightChart1[50] = parseInt(dataLightChart1[50]);
        dataLightChart1[99] = parseInt(dataLightChart1[99] )
        //Hết Simulate

        //Lấy phần tử cuối cùng
        var tempTemperature = parseInt(
          dataTemperatureChart.slice(-1)[0]
        );
        var tempSalinity =
          dataSalinityChart.slice(-1)[0] == null
            ? 22
            : dataSalinityChart.slice(-1)[0];

        var tempSoilMoiture = parseInt(dataSoilMoitureChart.slice(-1)[0]);
        
        var tempLight = parseInt(dataLightChart.slice(-1)[0]);

        //
        var tempTemperature1 = parseInt(
          dataTemperatureChart1.slice(-1)[0]
        );
        var tempSalinity1 =
          dataSalinityChart1.slice(-1)[0] == null
            ? 22
            : dataSalinityChart1.slice(-1)[0];

        var tempSoilMoiture1 = parseInt(dataSoilMoitureChart1.slice(-1)[0]);
        
        var tempLight1 = parseInt(dataLightChart1.slice(-1)[0]);

        
        var resultCheck = checkAlert(
          tempTemperature,
          tempSoilMoiture,
          tempLight,
          tempSalinity
        );
        //Cập nhật trạng thái
        await setIotDataFromAPI({
          temperature: tempTemperature,
          dissolveOxy: tempLight,
          pH: tempSoilMoiture,
          salinity: tempSalinity,
          isAlertTemperature: resultCheck.isTemperatureAlert,
          isAlertLight: resultCheck.isDissolveOxyAlert,
          isAlertSoilMoiture: resultCheck.ispHAlert,
          isAlertSalinity: resultCheck.isSalinityAlert,
          labelChart: labelChart,
          dataChartTemperature: dataTemperatureChart1,
          dataChartDissolveOxy: dataSoilMoitureChart1,
          dataChartPH: dataLightChart1,
          dataChartSalinity: dataSalinityChart1,
        });

        await setIotDataFromAPI1({
          temperature: tempTemperature1,
          dissolveOxy: tempLight1,
          pH: tempSoilMoiture1,
          salinity: tempSalinity1,
          isAlertTemperature: resultCheck.isTemperatureAlert,
          isAlertLight: resultCheck.isDissolveOxyAlert,
          isAlertSoilMoiture: resultCheck.ispHAlert,
          isAlertSalinity: resultCheck.isSalinityAlert,
          labelChart: labelChart1,
          dataChartTemperature: dataTemperatureChart,
          dataChartDissolveOxy: dataSoilMoitureChart,
          dataChartPH: dataLightChart,
          dataChartSalinity: dataSalinityChart,
        });

      })
    );
  };
  useEffect(() => {
    const fetchData = async () => {
      fectchAPI1();
      console.log("In duy nhất 1 lần khi refresh");
    }
    fetchData()
    // make sure to catch any error
      .catch(console.error);
  }, []);

  //Lấy API periodically
  useEffect(() =>{
    const fetchData2 = async () => {
      intervalRef.current = setInterval(async () => {
        // let mockDateTimeSecond = DateTime.now().second;
        await fectchAPI1();
        console.log("Dang fetchApi");
      }, Constant.timeSamplingData);
      return () => {
        clearInterval(intervalRef.current);
      };
    }
    fetchData2()
      .catch(console.error)
  }, []);

  //Đưa ra render
  useEffect(() => {
    console.log(`selectedOption`, selectedOption);
    if (selectedOption.value === "Khu vực 1") {
      setIotDataRender(iotDataFromAPI);
      console.log(iotDataRender);
    } else {
      setIotDataRender(iotDataFromAPI1);
      console.log(iotDataRender)
    }
  }, [selectedOption, iotDataFromAPI, iotDataRender, iotDataFromAPI1]);

  //set Alert
  
  return (
    <div
      className="app"
      style={{
        width: "100%",
        backgroundColor: "#9a9ed5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Title />
        {/* <Dropdown
          style={{ backgroundColor: "yellow" }}
          options={options}
          onChange={handleDropdownChange}
          value={options[pondSelected.value]}
          placeholder="Select an option"
          backgroundColor="red"
        /> */}
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
        <div style={{ flexDirection: "row", display: "flex", marginTop: 20 }}>
          <div
            style={{
              width: 740,
              height: 480,
              display: "flex",
              backgroundColor: "white",
              boxShadow: "2px 5px 10px #C7C8C9FF",
              borderRadius: "20px",
              alignItems: "start",
              justifyContent: "start",
              flexDirection: "column",
              backgroundImage :`url(${bg_1})`,
              backgroundSize :"cover",
              backgroundRepeat :"no-repeat"
            }}
          >
            <div
              style={{
                background :"#fff",
                padding : "10px 20px 10px 20px",
                marginLeft: "20px",
                marginTop : "20px",
                borderRadius :"10px 10px 0px 0px",
                width :"164px",
                backgroundColor : "green",
              
              }}>
              <h3 style={{
                margin :"0px",
                display:"flex",
                justifyContent:"center",
                alignContent:"center"
              }}>
                OUTDOOR
              </h3>
            </div>
            <div
             style={{
              background :"#fff",
              padding : "0px 20px 10px 20px ",
              marginLeft: "20px",
              borderRadius :"0px 0px 10px 10px",
              width :"164px",
              fontWeight:"500"
            }}
            >
              
              <p>NHIỆT ĐỘ: {(temper.temperature -273).toFixed(2)} °C</p>
              <p>ĐỘ ẨM   :{temper.humidity}%</p>
            </div>
            
          </div>
          <div style={{ marginLeft: "40px" ,alignItems: "end"}}>
            <Clock />
            <div
              style={{ flexDirection: "row", display: "flex", marginTop: 20 }}
            >
              <SensorWidget
                value={iotDataRender.temperature}
                color={ColorConstant.mred}
                title={Constant.titleTemperature}
                isAlert={iotDataRender.isAlertTemperature}
                img={thermo_icon}
                backgroundColor="white"
              />
              <div style={{ width: 20 }}></div>
              <SensorWidget
                value={iotDataRender.dissolveOxy}
                color={ColorConstant.mblue}
                title={Constant.titleDissolveOxy}
                isAlert={iotDataRender.isAlertLight}
                img={dissolveOxy_icon}
                backgroundColor="white"
              />
            </div>
            <div
              style={{ flexDirection: "row", display: "flex", marginTop: 20 }}
            >
              <SensorWidget
                value={iotDataRender.pH}
                color={ColorConstant.mpurple}
                title={Constant.titlepH}
                isAlert={iotDataRender.isAlertSoilMoiture}
                img={pH_icon}
                backgroundColor="white"
              />
              <div style={{ width: 20 }}></div>
              <SensorWidget
                value={iotDataRender.salinity}
                color={ColorConstant.mlightgreen}
                title={Constant.titleSalinity}
                isAlert={iotDataRender.isAlertSalinity}
                img={salitiny_icon}
                backgroundColor="white"
              />
            </div>
          </div>
          {/* <div style={{ width: 20 }}></div> */}
          {/* <LimitationTable /> */}
        </div>
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            marginTop: 20,
            marginLeft: 20,
          }}
        >
          <LineChart
            title="Đồ thị Nhiệt độ"
            label="Nhiệt độ"
            labelChart={iotDataRender.labelChart}
            dataChart={iotDataRender.dataChartTemperature}
            mainColor={ColorConstant.mred}
          />
          <div style={{ width: 20 }}></div>
          <LineChart
            title="Đồ thị Độ ẩm đất"
            label="Độ ẩm"
            labelChart={iotDataRender.labelChart}
            dataChart={iotDataRender.dataChartDissolveOxy}
            mainColor={ColorConstant.mblue}
          />
        </div>
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            marginTop: 20,
            marginLeft: 20,
          }}
        >
          <LineChart
            title="Đồ thị Ánh sáng"
            label="Ánh sáng"
            labelChart={iotDataRender.labelChart}
            dataChart={iotDataRender.dataChartPH}
            mainColor={ColorConstant.mpurple}
          />
          <div style={{ width: 20 }}></div>
          <LineChart
            title="Đồ thị Độ Ẩm"
            label="Độ Ẩm đất"
            labelChart={iotDataRender.labelChart}
            dataChart={iotDataRender.dataChartSalinity}
            mainColor={ColorConstant.mlightgreen}
          />
        </div>
      </div>
      <div
        style={{
          height: 50,
          alignItems: "end",
          justifyContent: "end",
          backgroundColor: "red",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>CÀI ĐẶT</h1>
        <h3>Cho phép hiển thị cửa sổ cảnh báo</h3>
        <Switch onChange={handleSwitchPopupChange} checked={isEnabledAlert} />
        <h3>Tắt âm thanh cảnh báo</h3>
        <Switch onChange={handleSwitchMute} checked={isMute} />
      </div>
      <div
        style={{
          height: 50,
        }}
      ></div>
      ;
    </div>
  );
};
export default HomeScreen;

// const customStyles = {
//   control: () => ({
//     width: 200,
//     fontSize: 30,
//   }),
// };
