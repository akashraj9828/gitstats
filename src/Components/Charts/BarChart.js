import { ResponsiveBar } from '@nivo/bar'
import React, { Fragment } from "react"

// keys actual data eg ["count","stars","forks"]
// indexBy is the key which contains labels
function BarChart({ data, height, width, max_bars, keys, indexBy, }) {
    data = data.slice(0, max_bars)
    if (data.length < 2) {
        return (
            <div style={{ height: height, width: width ? width : "auto" }}>
                <div className="d-flex h-100" style={{
                    flexDirection: "row",
                    textAlign: "center",
                    alignItems: "center"
                }}>
                    <h6 className="text-center mt-3 w-100">
                        <span style={{ color: "gray" }}>Not enough Data to analyze :-/  </span>
                    </h6>
                </div>
            </div>
        )
    }

    // function to extract color from data
    const getColor = (elem) => {
        return elem.data[elem.id + "Color"] ? elem.data[elem.id + "Color"] : "grey"
    }


    let textColor = "#999999" //greyish works for both mode dark and light
    let gridColor = "#00800054" //very light green
    let theme = {
        textColor: textColor,
        background: "transparent",
        axis: {
            fontSize: "14px",
            tickColor: "red",
            ticks: {
                line: {
                    stroke: "transparent" //ticks color
                },
                text: {
                    fill: textColor // markings on x/y axis
                }
            },
            legend: {
                text: {
                    fill: textColor // name on x and y axis
                }
            }
        },
        grid: {
            line: {
                stroke: gridColor //grid color
            }
        }

    }

    let Chart = <ResponsiveBar
        theme={theme}
        data={data}
        keys={keys ? keys : ["stars", "forks"]}
        indexBy={indexBy ? indexBy : "repo"}
        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
        padding={0.3}
        groupMode="grouped"
        colors={getColor}
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
                    style: 'dots'
                },
                id: 'dots'
            },
            {
                match: {
                    style: 'lines'
                },
                id: 'lines'
            }
        ]}
        // borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        borderColor="white"
        borderWidth={1}
        axisTop={null}
        axisRight={null}
        // axisLeft={null}
        // enableGridX={false}
        // enableGridY={false}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -10,
            legend: 'Repos',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            // tickSize: 5,
            // tickPadding: 5,
            // tickRotation: 0,
            // legend: 'Count',
            // legendColor: "white",
            legendPosition: 'middle',
            legendOffset: -40
        }}
        enableLabel={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        enablelabelText={false}
        // labelTextColor="#eee" //inside graph
        tex
        tooltip={(e) => {
            return <div style={{ color: "#5b6166" }}>{e.data.label} <br /> {e.data.parsed} </div>
        }
        }




        legends={[
            {
                dataFrom: 'keys',
                anchor: 'top',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: -40,
                itemsSpacing: 4,
                itemWidth: 100,
                itemHeight: 20,
                itemOpacity: 0.85,
                symbolSize: 20,
                itemTextColor: textColor,
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

    return <Fragment>
        <div style={{ height: height, width: width ? width : "auto" }}> {Chart} </div>

    </Fragment>
}

export default BarChart