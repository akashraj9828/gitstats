import { ResponsiveBar } from '@nivo/bar'
import React from 'react'

function MyBarChart() {

   const data=[
    {
      "country": "AD",
      "hot dog": 14,
      "hot dogColor": "hsl(332, 70%, 50%)",
      "burger": 66,
      "burgerColor": "hsl(299, 70%, 50%)",
      "sandwich": 84,
      "sandwichColor": "hsl(282, 70%, 50%)",
      "kebab": 123,
      "kebabColor": "hsl(68, 70%, 50%)",
      "fries": 79,
      "friesColor": "hsl(53, 70%, 50%)",
      "donut": 134,
      "donutColor": "hsl(87, 70%, 50%)"
    },
    {
      "country": "AE",
      "hot dog": 155,
      "hot dogColor": "hsl(31, 70%, 50%)",
      "burger": 150,
      "burgerColor": "hsl(132, 70%, 50%)",
      "sandwich": 186,
      "sandwichColor": "hsl(213, 70%, 50%)",
      "kebab": 68,
      "kebabColor": "hsl(155, 70%, 50%)",
      "fries": 97,
      "friesColor": "hsl(102, 70%, 50%)",
      "donut": 58,
      "donutColor": "hsl(14, 70%, 50%)"
    },
    {
      "country": "AF",
      "hot dog": 100,
      "hot dogColor": "hsl(56, 70%, 50%)",
      "burger": 31,
      "burgerColor": "hsl(323, 70%, 50%)",
      "sandwich": 194,
      "sandwichColor": "hsl(338, 70%, 50%)",
      "kebab": 10,
      "kebabColor": "hsl(202, 70%, 50%)",
      "fries": 87,
      "friesColor": "hsl(224, 70%, 50%)",
      "donut": 132,
      "donutColor": "hsl(318, 70%, 50%)"
    },
    {
      "country": "AG",
      "hot dog": 47,
      "hot dogColor": "hsl(164, 70%, 50%)",
      "burger": 101,
      "burgerColor": "hsl(241, 70%, 50%)",
      "sandwich": 54,
      "sandwichColor": "hsl(257, 70%, 50%)",
      "kebab": 160,
      "kebabColor": "hsl(168, 70%, 50%)",
      "fries": 16,
      "friesColor": "hsl(265, 70%, 50%)",
      "donut": 52,
      "donutColor": "hsl(221, 70%, 50%)"
    },
    {
      "country": "AI",
      "hot dog": 75,
      "hot dogColor": "hsl(142, 70%, 50%)",
      "burger": 199,
      "burgerColor": "hsl(211, 70%, 50%)",
      "sandwich": 184,
      "sandwichColor": "hsl(342, 70%, 50%)",
      "kebab": 187,
      "kebabColor": "hsl(213, 70%, 50%)",
      "fries": 142,
      "friesColor": "hsl(139, 70%, 50%)",
      "donut": 78,
      "donutColor": "hsl(129, 70%, 50%)"
    },
    {
      "country": "AL",
      "hot dog": 177,
      "hot dogColor": "hsl(356, 70%, 50%)",
      "burger": 110,
      "burgerColor": "hsl(237, 70%, 50%)",
      "sandwich": 18,
      "sandwichColor": "hsl(57, 70%, 50%)",
      "kebab": 102,
      "kebabColor": "hsl(257, 70%, 50%)",
      "fries": 42,
      "friesColor": "hsl(157, 70%, 50%)",
      "donut": 25,
      "donutColor": "hsl(56, 70%, 50%)"
    },
    {
      "country": "AM",
      "hot dog": 169,
      "hot dogColor": "hsl(248, 70%, 50%)",
      "burger": 88,
      "burgerColor": "hsl(62, 70%, 50%)",
      "sandwich": 72,
      "sandwichColor": "hsl(33, 70%, 50%)",
      "kebab": 23,
      "kebabColor": "hsl(162, 70%, 50%)",
      "fries": 48,
      "friesColor": "hsl(267, 70%, 50%)",
      "donut": 30,
      "donutColor": "hsl(47, 70%, 50%)"
    }
  ]

    let chart = <ResponsiveBar
    data={data}
    keys={[ 'hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut' ]}
    indexBy="country"
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.3}
    colors={{ scheme: 'nivo' }}
    defs={[
        {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: '#38bcb2',
            size: 4,
            padding: 1,
            stagger: true
        },
        {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10
        }
    ]}
    fill={[
        {
            match: {
                id: 'fries'
            },
            id: 'dots'
        },
        {
            match: {
                id: 'sandwich'
            },
            id: 'lines'
        }
    ]}
    borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'country',
        legendPosition: 'middle',
        legendOffset: 32
    }}
    axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'food',
        legendPosition: 'middle',
        legendOffset: -40
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
    legends={[
        {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemOpacity: 1
                    }
                }
            ]
        }
    ]}
    animate={true}
    motionStiffness={90}
    motionDamping={15}
/>
    return <div style={{width:500,height:500    }}>{chart}</div>
}

export default MyBarChart