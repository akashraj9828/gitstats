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
        <FacebookShareButton url={"https://gitstats-stage.herokuapp.com/"+ props.data.data.user.login}>
          <FacebookIcon size={28} round={true} />
        </FacebookShareButton>
        <TwitterShareButton url={"https://gitstats-stage.herokuapp.com/"+ props.data.data.user.login}>
          <TwitterIcon size={28} round={true} />
        </TwitterShareButton>
        <WhatsappShareButton url={"https://gitstats-stage.herokuapp.com/"+ props.data.data.user.login}>
          <WhatsappIcon size={28} round={true} />
        </WhatsappShareButton>
        <LinkedinShareButton url={"https://gitstats-stage.herokuapp.com/"+ props.data.data.user.login}>
            <LinkedinIcon size={28} round={true}/>
        </LinkedinShareButton>
      </div>
    );
}

export default Share