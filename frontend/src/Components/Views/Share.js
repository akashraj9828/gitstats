import React, { useState } from "react";
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { FacebookIcon, LinkedinIcon, TwitterIcon, WhatsappIcon } from "react-share";
import { ReactComponent as DownloadIcon } from "./../../Images/download.svg";
import { ReactComponent as ShareIcon } from "./../../Images/share.svg";
import config from "../../config/index";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

import Loader from "../Extras/Loader";

Object.keys(config).forEach((key) => {
	window[key] = config[key];
});

function download({ data }, callback = window.downloadCallback) {
	let filename = data.user.name || data.user.login;

	// enable backdrop when processing
	let backdrop = document.getElementsByClassName("processing-backdrop")[0];
	backdrop.style.display = "flex";

	var activity_card = document.getElementById("user-activity");
	// hide scrollbar before capture
	activity_card.style.overflow = "hidden";

	// set viewport 1400px for mobile devices
	let viewport = document.getElementById("viewport");
	viewport.setAttribute("content", "width=1200");

	// allow 2s time for everything to fall in place
	setTimeout(() => {
		var node = document.getElementById("user-profile");
		domtoimage.toBlob(node).then(function (blob) {
			// save img
			saveAs(blob, filename + "_Gitstats.png");

			// enable scrollbar after capture
			activity_card.style.overflow = "auto";

			// reset viewport to be responsive
			viewport.setAttribute("content", "width=device-width, initial-scale=1");

			// hide backdrop and credit when done
			backdrop.style.display = "none";
		});

		if (callback) {
			callback(data);
		}
	}, 2000);
}

const Share = ({ data }) => {
	let [showIcons, setIcons] = useState(false);
	return (
		<div className='share-container'>
			<div className='processing-backdrop'>
				<span>{Loader.text_loading} Processing......</span>
			</div>
			<div className='share-icon'>
				<button
					id='download-btn'
					aria-label='download'
					onClick={() => (showIcons ? setIcons(false) : setIcons(true))}
					style={{
						backgroundColor: "transparent",
						border: "none",
						padding: "0px",
						font: "inherit",
						color: "inherit",
						cursor: "pointer",
						width: 40,
					}}>
					<ShareIcon />
				</button>
				<button
					aria-label='linkedin'
					onClick={(evt) => download(data)}
					style={{
						backgroundColor: "#fff",
						borderRadius: "50%",
						border: "none",
						padding: "0px",
						font: "inherit",
						color: "inherit",
						cursor: "pointer",
						height: "40px",
					}}>
					<DownloadIcon />
				</button>
			</div>
			<div className='share-tray' style={showIcons ? { right: "0px" } : { right: "-50px" }}>
				<FacebookShareButton url={window.location.href}>
					<FacebookIcon size={40} round={true} />
				</FacebookShareButton>
				<TwitterShareButton url={window.location.href}>
					<TwitterIcon size={40} round={true} />
				</TwitterShareButton>
				<WhatsappShareButton url={window.location.href}>
					<WhatsappIcon size={40} round={true} />
				</WhatsappShareButton>
				<LinkedinShareButton url={window.location.href}>
					<LinkedinIcon size={40} round={true} />
				</LinkedinShareButton>
			</div>
		</div>
	);
};

export default Share;
