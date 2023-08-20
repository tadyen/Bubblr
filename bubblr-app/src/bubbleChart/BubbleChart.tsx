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
import { bubbleController, BubbleData } from "./bubbleController";
import { bubbleImportances } from "./config";
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
  const [ height, setHeight ] = useState<number>();
  const [ updatingData, setUpdatingData ] = useState(false);
  const [ updatingChart, setUpdatingChart] = useState(false);

  // undefined for loading, null for none
  const [ chartOptions, setChartOptions] = useState<Highcharts.Options | undefined>(undefined);
  const [ bubblesData, setBubblesData ] = useState<Required<BubbleData>[] | undefined | null>(undefined);

  // Init stuff
  useEffect(()=>{
    setUpdatingChart(true);
    HighchartsDarkTheme(Highcharts);
    if(!chartOptions) setChartOptions(defaultChartOptions);
    if(!bubblesData) setBubblesData(null);
    setUpdatingChart(false);
  },[])

  // update chart theme
  useEffect(()=>{
    themeMode === "dark" ? HighchartsDarkTheme(Highcharts) : HighchartsLightTheme(Highcharts);
  },[themeMode])

  // update height of chart to fit bounding view
  useEffect(()=>{
    if(!chartOptions) return
    setUpdatingChart(true);
    setChartOptions({
      ...chartOptions,
      chart: {
        height: height,
      }
    })
    setUpdatingChart(false);
  },[height])

  // update chart with new data
  useEffect(()=>{
    if(bubblesData === undefined) return
    if( !chartOptions ) return
    setUpdatingChart(true);
    const chartSeriesData = (bubblesData)
      ? formatPlainToChartData(bubblesData) as Highcharts.Options["series"]
      : dummyChartData as Highcharts.Options["series"]
    setChartOptions({
      ...chartOptions,
      series: chartSeriesData,
    })
    setUpdatingChart(false);
  },[bubblesData])

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
  series: undefined,
};



const dummyChartData: ChartSeriesData = [
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
      {name: 'Play something', value: 12**2},
      {name: 'Level a new character', value: 12**2},
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
      {name: 'These are', value: 30**2},
      {name: 'Simply some', value: 35**2},
      {name: 'Example Bubbles', value: 40**2},
    ]
  },
  {
    name: "Super",
    data: [
      {name: 'Try adding a new Bubble!', value: 50**2},
      {name: 'Click the + at the bottom-right to get started', value: 47**2},
      {name: 'Bubbles represent tasks according to their priority', value: 44**2},
      {name: 'They grow over time if you dont handle them!', value: 40**2},
    ]
  }
];
