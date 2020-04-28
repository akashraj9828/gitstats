import React from 'react'
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton, } from "react-share";
import { FacebookIcon, LinkedinIcon, TwitterIcon, WhatsappIcon, } from "react-share";
import { ReactComponent as DownloadIcon } from "./../../Images/download.svg"
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js';
import config from '../../config/index'

Object.keys(config).forEach(key => {
  window[key] = config[key];
});
function download(data) {
  console.log("---: download -> data", data);

  var element = document.getElementById('user-profile');
  var opt = {
    margin: 1,
    filename: 'myfile.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 0.5 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  html2pdf(element, opt);
}

const Share = ({ data }) => {
  return (
    <div className="share-icons rounded">
      <FacebookShareButton url={window.location.href}>
        <FacebookIcon size={28} round={true} />
      </FacebookShareButton>
      <TwitterShareButton url={window.location.href}>
        <TwitterIcon size={28} round={true} />
      </TwitterShareButton>
      <WhatsappShareButton url={window.location.href}>
        <WhatsappIcon size={28} round={true} />
      </WhatsappShareButton>
      <LinkedinShareButton url={window.location.href}>
        <LinkedinIcon size={28} round={true} />
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
        }}>
        <DownloadIcon />
      </button>
    </div>
  );
}

export default Share