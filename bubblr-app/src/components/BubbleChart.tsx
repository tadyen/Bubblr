import { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import Highcharts from "highcharts";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsReact from 'highcharts-react-official';
import HighchartsLightTheme from "highcharts/themes/grid";
import HighchartsDarkTheme from "highcharts/themes/grid-light";
import { useThemeContext } from "../context/theme-context";
import BubbleButtons from "./BubbleOptions";

// module init
if (typeof Highcharts === 'object'){
  HighchartsMore(Highcharts);
}

export default function BubbleChart(props: HighchartsReact.Props){
  const {themeMode} = useThemeContext();
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const [ chartOptions, setChartOptions] = useState(defaultChartOptions);
  const [ height, setHeight ] = useState<number>();

  useEffect(()=>{
    console.log("useEffect bubble chart theme init");
    HighchartsDarkTheme(Highcharts);
  },[])

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
      <Pressable
        onLongPress={(e)=>{
          console.log("long press")
          console.log(e)
        }}
      >
        <View style={styles.chartArea}>
          <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
            ref={chartComponentRef}
            {...props}
            />
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    // border: "solid 1px green",
  },
  chartArea: {
    padding: 0,
    // border: "solid 1px yellow"
  },
  bubbleButtons: {
    position: "absolute",
    top: 20,
    left: 20,
  }
});

const dummyBubbles = [
  {
    name: "Ignorable",
    data: [
      {name: 'Stay alive', value: 1**2},
      {name: 'Trim the hedge', value: 4**2},
      {name: 'Get a new shelf', value: 8**2},
      {name: 'Buy a new phone', value: 10**2},
    ]
  },
  {
    name: "Low",
    data: [
      {name: 'Watch new season of ...', value: 11**2},
      {name: 'Play <new game>', value: 12**2},
      {name: 'Level a new character in <game>', value: 12**2},
      {name: 'Pick up a new hobby', value: 15**2},
      {name: 'Fix the leaking faucet', value: 16**2},
      {name: 'Change that lightbulb', value: 20**2},
    ]
  },
  {
    name: "Average",
    data: [
      {name: 'Get sleep', value: 20**2},
      {name: 'Try new coffee place', value: 21**2},
      {name: 'Explore new area', value: 29**2},
      {name: 'Read a book', value: 30**2},
    ]
  },
  {
    name: "High",
    data: [
      {name: 'Have a break', value: 30**2},
      {name: 'Have a KitKat', value: 35**2},
      {name: 'Chill out and relax', value: 40**2},
    ]
  },
  {
    name: "Super",
    data: [
      {name: 'Finish off the asignment', value: 40**2},
      {name: 'Stay Hydrated', value: 45**2},
      {name: 'Take the dog out for a walk', value: 50**2},
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
    pointFormat: '{point.name}',
    style: {
      color: 'black',
      fontSize: '50px',
    }
  },
  plotOptions: {
    packedbubble: {
      minSize: '40%',
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
          fontWeight: 'normal',
          fontSize: 'auto',
        }
      }
    }
  },
  legend: {
    title: {
      text: 'Importance',
    }
  },
  series: dummyBubbles,
};
