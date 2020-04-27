import { ResponsivePie } from '@nivo/pie'
import React, { Fragment } from "react"
import DataProvider from "../../Data-provider"
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

// use "accumulate_data" only when showing language by size Dont use it other wise
// accumulate_data will add all the remaining data and show it in the graph as "Others"
function PieChart({ data, height, width, max_slices,accumulate_remaining }) {

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
    const getColor = elem => {
        return elem.color ? elem.color : "#89e051"
    }

    if (max_slices) {
        let copy_of_data=data;
        // IF MAX_SLICES is set slice the data
        // if accumulate_data is also set slice till MAX_SLICE -1
        // last index will be Accumulated("OTHERS") data
        data = accumulate_remaining?data.slice(0, max_slices-1):data.slice(0, max_slices)
        if(accumulate_remaining){
            let extra_data = copy_of_data.slice(max_slices)
            let extras_accumulated = extra_data.reduce((total, element) => total + element.value, 0)
            // add the accumulated data to PIE CHART as "Others"
            data.push({
                "id": `Others (${DataProvider.toReadableBytes(extras_accumulated)})`,
                "label": "Others",
                "value": extras_accumulated,
                "parsed": DataProvider.toReadableBytes(extras_accumulated),
                "color": "#b96a2e",
                "style": "lines"
                
            })
        }
            
        
    }

    let Chart = <ResponsivePie
        data={data}
        // sortByValue={true}
        margin={{ top: 0, right: 200, bottom: 0, left: 50 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={getColor}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        enableRadialLabels={false}
        radialLabelsSkipAngle={10}
        radialLabelsLink={false}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor={getColor}
        enableSlicesLabels={false}
        slicesLabel="id"
        radialLabelsLinkColor={{ from: 'color' }}
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor="#fff"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        tooltip={(e) => <div style={{ color: "#5b6166" }}>{e.label} : {e.parsed} </div>}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
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
            },


        ]}

        legends={[
            {
                anchor: 'right',
                direction: 'column',
                translateX: 130,
                translateY: 0,
                itemWidth: 100,
                itemHeight: 25,
                itemTextColor: '#999',
                symbolSize: 18,
                symbolShape: 'circle',
            }
        ]}
    />
    return <Fragment>
        <div style={{ height: height, width: width ? width : "auto" }}> {Chart} </div>
       
    </Fragment>
}

export default PieChart