import {FacebookShareButton,LinkedinShareButton,TwitterShareButton,WhatsappShareButton,} from "react-share";
import {FacebookIcon, LinkedinIcon,TwitterIcon, WhatsappIcon,} from "react-share";
import config from '../../config/index'
import React from 'react' 
Object.keys(config).forEach(key => {
    window[key] = config[key];
  });


const Share =  (props) => {
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
            <LinkedinIcon size={28} round={true}/>
        </LinkedinShareButton>
      </div>
    );
}

export default Share