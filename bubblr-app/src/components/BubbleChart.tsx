import { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import Highcharts from "highcharts";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsReact from 'highcharts-react-official';
import HighchartsLightTheme from "highcharts/themes/grid";
import HighchartsDarkTheme from "highcharts/themes/grid-light";
import { useThemeContext } from "../context/theme-context";

console.log("HIGHCHARTS file load");
// module init
if (typeof Highcharts === 'object') {
  console.log("HIGHCHARTS init");
  HighchartsMore(Highcharts);
}

const dummyBubbles = [
  {
    name: "A0",
    data: [
      {name: 'aa0', value: 1},
      {name: 'aa1', value: 4},
      {name: 'aa2', value: 8},
    ]
  },
  {
    name: "A1",
    data: [
      {name: 'asdf1', value: 12},
      {name: 'asdf2', value: 12},
      {name: 'asdf3', value: 15},
      {name: 'asdf4', value: 16},
    ]
  },
  {
    name: "A2",
    data: [
      {name: 'asdf5', value: 20},
      {name: 'asdf6', value: 21},
    ]
  },
  {
    name: "A3",
    data: [
      {name: 'asdf7', value: 30},
      {name: 'asdf8', value: 35},
    ]
  },
  {
    name: "A4",
    data: [
      {name: 'asdf9', value: 50},
      {name: 'asdf10', value: 40},
      {name: 'asdf11', value: 45},
    ]
  }
] as Highcharts.Options["series"];


const defaultChartOptions: Highcharts.Options = {
  title: {
    text: 'My chart'
  },
  chart: {
    type: "packedbubble",
    height: '100%',
    zooming: {
      type: 'xy',
      pinchType: 'xy',
      mouseWheel: true,
    },
  },
  tooltip: {
    useHTML: true,
    pointFormat: '<b>{point.name}:</b> {point.value}',
  },
  plotOptions: {
    packedbubble: {
      useSimulation: false,
      layoutAlgorithm: {
        splitSeries: false,
        gravitationalConstant: 0.005,
      },
      dataLabels: {
        enabled: true,
        format: '{point.name}',
        style: {
          color: 'black',
          textOutline: 'none',
          fontWeight: 'normal'
        }
      }
    }
  },
  series: dummyBubbles,
};

export default function BubbleChart(props: HighchartsReact.Props){
  const themeMode = useThemeContext()?.themeMode;
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const [ chartOptions, setChartOptions] = useState(defaultChartOptions);
  const [ height, setHeight ] = useState<number>();

  useEffect(()=>{
    console.log("useEffect bubble chart theme");
    themeMode === "dark" ? HighchartsDarkTheme(Highcharts) : HighchartsLightTheme(Highcharts);
  },[themeMode])

  useEffect(()=>{
    console.log("useEffect bubbleChart update options");
    setChartOptions((prev)=>{
      return{...prev,
        chart: {
          height: height,
        }
      }
    })
  },[height])

  return(
    <View style={styles.canvas} onLayout={(layout)=>{
      const { height } = layout.nativeEvent.layout
      setHeight(height);
    }}>
      <View style={styles.chartArea}>
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
          ref={chartComponentRef}
          {...props}
          />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    border: "solid 1px green",
  },
  chartArea: {
    padding: 0,
    border: "solid 1px yellow"
  }
});
