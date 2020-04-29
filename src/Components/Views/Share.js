import React from 'react'
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton, } from "react-share";
import { FacebookIcon, LinkedinIcon, TwitterIcon, WhatsappIcon, } from "react-share";
import { ReactComponent as DownloadIcon } from "./../../Images/download.svg"
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js';
import config from '../../config/index'

Object.keys(config).forEach(key => {
  window[key] = config[key];
});
function download(data) {
  console.log("---: download -> data", data);

  var element = document.getElementById('user-profile');

  // var scale = (screen.width / page.getViewport(1.0).width);
  //       var viewport = page.getViewport(scale);
  //       canvas.height = viewport.height;
  //       canvas.width = viewport.width;
        
  let html2canvasOpts = {
    scale: 0.2,       //  img_width/win_width // is 1,
    width: 150,
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
  };

  html2pdf(element, html2canvasOpts);
}

const Share = ({ data }) => {
  debugger
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