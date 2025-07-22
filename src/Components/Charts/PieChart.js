import { ResponsivePie } from "@nivo/pie";
import React, { Fragment, useState, useEffect } from "react";
import DataProvider from "../../Data-provider";
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

// use "accumulate_data" only when showing language by size Dont use it other wise
// accumulate_data will add all the remaining data and show it in the graph as "Others"
function PieChart({ data, height, width, max_slices, accumulate_remaining, error }) {
	const w = document.documentElement.clientWidth;
	const h = document.documentElement.clientHeight;
	let [dims, setDims] = useState({ width: w, height: h });
	window.dims = dims;
	function displayWindowSize() {
		let w = document.documentElement.clientWidth;
		let h = document.documentElement.clientHeight;
		setDims({ width: w, height: h });
	}

	useEffect(() => {
		window.addEventListener("resize", displayWindowSize);
	}, []);

	if (max_slices) {
		let copy_of_data = data;
		// IF MAX_SLICES is set slice the data
		// if accumulate_data is also set slice till MAX_SLICE -1
		// last index will be Accumulated("OTHERS") data
		data = accumulate_remaining ? data.slice(0, max_slices - 1) : data.slice(0, max_slices);
		if (accumulate_remaining) {
			let extra_data = copy_of_data.slice(max_slices);
			let extras_accumulated = extra_data.reduce((total, element) => total + element.value, 0);
			// add the accumulated data to PIE CHART as "Others"
			data.push({
				id: `Others (${DataProvider.toReadableBytes(extras_accumulated)})`,
				label: "Others",
				value: extras_accumulated,
				parsed: DataProvider.toReadableBytes(extras_accumulated),
				color: "#b96a2e",
				style: "lines",
			});
		}
	}

	let breakpoint_xs_sm = dims.width > 360 && dims.width <= 575; //show
	let breakpoint_sm = dims.width > 575 && dims.width <= 768; //dont'show
	let breakpoint_md = dims.width > 768 && dims.width <= 992; //show
	let breakpoint_lg = dims.width > 992; //show

	//   default no ledend and margin
	let legendsConfig = [];
	let margin = {};
	if (breakpoint_xs_sm) {
		margin = {
			top: 0,
			right: 250,
			bottom: 0,
			left: 0,
		};
		legendsConfig = [
			{
				anchor: "right",
				direction: "column",
				translateX: 130,
				translateY: 0,
				itemWidth: 109,
				itemHeight: 25,
				itemTextColor: "#999",
				symbolSize: 18,
				symbolShape: "circle",
			},
		];
	} else if (breakpoint_sm) {
		margin = {};
		legendsConfig = [];
	} else if (breakpoint_md) {
		margin = {
			top: 0,
			right: 150,
			bottom: 0,
			left: 0,
		};
		legendsConfig = [
			{
				anchor: "right",
				direction: "column",
				translateX: 130,
				translateY: 0,
				itemWidth: 109,
				itemHeight: 25,
				itemTextColor: "#999",
				symbolSize: 18,
				symbolShape: "circle",
			},
		];
	} else if (breakpoint_lg) {
		margin = {
			top: 0,
			right: 200,
			bottom: 0,
			left: 0,
		};
		legendsConfig = [
			{
				anchor: "right",
				direction: "column",
				translateX: 130,
				translateY: 0,
				itemWidth: 109,
				itemHeight: 25,
				itemTextColor: "#999",
				symbolSize: 18,
				symbolShape: "circle",
			},
		];
	}

	if (error) {
		return (
			<div style={{ height: height, width: width ? width : "auto" }}>
				<div
					className='d-flex h-100'
					style={{
						flexDirection: "row",
						textAlign: "center",
						alignItems: "center",
					}}>
					<h6 className='text-center mt-3 w-100'>
						<span style={{ color: "gray" }}>{error}</span>
					</h6>
				</div>
			</div>
		);
	}
	if (data.length < 2) {
		return (
			<div style={{ height: height, width: width ? width : "auto" }}>
				<div
					className='d-flex h-100'
					style={{
						flexDirection: "row",
						textAlign: "center",
						alignItems: "center",
					}}>
					<h6 className='text-center mt-3 w-100'>
						<span style={{ color: "gray" }}>Not enough Data to analyze :-/ </span>
					</h6>
				</div>
			</div>
		);
	}
	const getColor = (elem) => {
		return elem.color ? elem.color : "#89e051";
	};

	let Chart = (
		<ResponsivePie
			data={data}
			// sortByValue={true}
			margin={margin}
			innerRadius={0.5}
			padAngle={0.7}
			cornerRadius={3}
			colors={getColor}
			borderWidth={1}
			borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
			enableRadialLabels={false}
			radialLabelsSkipAngle={10}
			radialLabelsLink={false}
			radialLabelsTextXOffset={6}
			radialLabelsTextColor={getColor}
			enableSlicesLabels={false}
			slicesLabel='id'
			radialLabelsLinkColor={{ from: "color" }}
			slicesLabelsSkipAngle={10}
			slicesLabelsTextColor='#fff'
			animate={true}
			motionStiffness={90}
			motionDamping={15}
			tooltip={(e) => (
				<div style={{ color: "#5b6166" }}>
					{e.label} : {e.parsed}{" "}
				</div>
			)}
			defs={[
				{
					id: "dots",
					type: "patternDots",
					background: "inherit",
					color: "rgba(255, 255, 255, 0.3)",
					size: 4,
					padding: 1,
					stagger: true,
				},
				{
					id: "lines",
					type: "patternLines",
					background: "inherit",
					color: "rgba(255, 255, 255, 0.3)",
					rotation: -45,
					lineWidth: 6,
					spacing: 10,
				},
			]}
			fill={[
				{
					match: {
						style: "dots",
					},
					id: "dots",
				},
				{
					match: {
						style: "lines",
					},
					id: "lines",
				},
			]}
			legends={legendsConfig}
		/>
	);
	return (
		<Fragment>
			<div style={{ height: height, width: width ? width : "auto" }}> {Chart} </div>
		</Fragment>
	);
}

export default PieChart;
