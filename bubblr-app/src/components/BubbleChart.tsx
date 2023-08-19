import 'react-native-url-polyfill/auto'
import { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import Highcharts from "highcharts";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsReact from 'highcharts-react-official';
import HighchartsLightTheme from "highcharts/themes/grid";
import HighchartsDarkTheme from "highcharts/themes/grid-light";
import { useThemeContext } from "../context/theme-context";
import { useAuthContext } from "../context/auth-context";
import { bubbleController, BubbleData } from "../controllers/bubbleController";
import { bubbleImportances } from "../lib/config";
import { create } from "domain";

// module init
if (typeof Highcharts === 'object'){
  HighchartsMore(Highcharts);
}

type ChartSeriesData = {
  name: string,
  data: {
    name: string,
    value: number,
  }[]
}[]

export default function BubbleChart(props: HighchartsReact.Props){
  const {themeMode} = useThemeContext();
  const { session } = useAuthContext();
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const [ chartOptions, setChartOptions] = useState<Highcharts.Options>();
  const [ height, setHeight ] = useState<number>();
  const [ data, setData ] = useState<Required<BubbleData>[]>();
  const [ updatingData, setUpdatingData ] = useState(false);

  // Init stuff
  useEffect(()=>{
    setChartOptions(defaultChartOptions);
    HighchartsDarkTheme(Highcharts);
  },[])

  // update chart theme
  useEffect(()=>{
    themeMode === "dark" ? HighchartsDarkTheme(Highcharts) : HighchartsLightTheme(Highcharts);
  },[themeMode])

  // update height of chart to fit bounding view
  useEffect(()=>{
    setChartOptions((prev)=>{
      return({
        ...prev,
        chart: {
          height: height,
        }
      })
    })
  },[height])

  // update chart with new data
  useEffect(()=>{
    const series = data as Highcharts.Options["series"];
    setChartOptions((prev)=>{
      return({
        ...prev,
        series: series
      })
    })
  },[data])

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

function formatPlainToChartData(plain: BubbleData[]){
  const chartData = [] as ChartSeriesData;

  // Create series placeholders for each level of importance
  let startIndex = 1; // to determine if key starts at 1 or 0
  Object.values(bubbleImportances).forEach((importance)=>{
    const { key, flavourText, minSize, maxSize} = importance;
    const series: ChartSeriesData[0] = {
      name: flavourText,
      data: []
    }
    if(startIndex !== 0 && key === 0){ startIndex = 0 }
    chartData.push(series);
  })

  // Scan each data and allocate accordingly
  const dataToChartValue = (sub: BubbleData) => ({
    name: sub.name,
    value: sub.size ** 2,
  })
  plain.forEach((data: BubbleData)=>{
    const { name, size, importance } = data;
    chartData[importance - startIndex].data.push( dataToChartValue(data) );
  })
  return chartData;
}

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
  series: [],
};


const dummyBubbles: ChartSeriesData = [
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
];
