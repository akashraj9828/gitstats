import React from 'react'
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton, } from "react-share";
import { FacebookIcon, LinkedinIcon, TwitterIcon, WhatsappIcon, } from "react-share";
import { ReactComponent as DownloadIcon } from "./../../Images/download.svg"
import config from '../../config/index'
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';


Object.keys(config).forEach(key => {
  window[key] = config[key];
});
function download({ data }) {
  let filename = data.user.name || data.user.login
  var activity_card = document.getElementById('user-activity')
  // hide scrollbar before capture
  activity_card.style.overflow = "hidden"
  var node = document.getElementById('user-profile');
  domtoimage.toBlob(node)
    .then(function (blob) {
      saveAs(blob, filename + '_Gitstats.png');
      // enable scrollbar before capture
      activity_card.style.overflow = "auto"
    });
}

const Share = ({ data }) => {
  return (
    <div className="share-icons rounded">
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
      <button
        aria-label="linkedin"
        onClick={(evt) => download(data)}
        style={{
          backgroundColor: "transparent",
          border: "none",
          padding: "0px",
          font: "inherit",
          color: "inherit",
          cursor: "pointer",
          width: 40
        }}>
        <DownloadIcon />
      </button>
    </div>
  );
}

export default Share