/* eslint-disable object-curly-newline */
import React, { useState } from 'react';

import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import SweetAlert from 'react-bootstrap-sweetalert';
import CopyToClipboard from 'react-copy-to-clipboard';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestIcon,
  PinterestShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';

import { notifyCopied } from '../../../utils/notify';

export default function BigShareButton(props) {
  const [show, setShow] = useState(false);

  const getAlert = () => {
    const { shareUrl, title, description, tags = [] } = props;

    return (
      <SweetAlert
        customClass="text-black"
        success
        confirmBtnText="Done"
        confirmBtnBsStyle="success"
        confirmBtnCssClass="text-base rounded bg-green-500 p-2"
        confirmBtnStyle={{ color: 'white' }}
        title="Share with your friends "
        onConfirm={() => setShow(false)}
        closeAnim={{ name: 'hideSweetAlert', duration: 300 }}
      >
        <div>
          <div className="Demo__container ">
            <div className="Demo__some-network">
              <FacebookShareButton
                // todo here change to production link
                url="www.google.com"
                quote={`${title} ${description}`}
                hashtag={tags && `#${tags[0]}`}
                className="Demo__some-network__share-button"
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
            </div>

            <div className="Demo__some-network">
              <FacebookMessengerShareButton
                url={shareUrl}
                appId="521270401588372"
                className="Demo__some-network__share-button"
              >
                <FacebookMessengerIcon size={32} round />
              </FacebookMessengerShareButton>
            </div>

            <div className="Demo__some-network">
              <TwitterShareButton
                url={shareUrl}
                title={`${title} ${description}`}
                via="MovieBook - Find your next favourite movie"
                hashtags={tags?.map((el) => el?.name || el)}
                className="Demo__some-network__share-button"
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
            </div>

            <div className="Demo__some-network">
              <TelegramShareButton
                url={shareUrl}
                title={title}
                className="Demo__some-network__share-button"
              >
                <TelegramIcon size={32} round />
              </TelegramShareButton>
            </div>

            <div className="Demo__some-network">
              <WhatsappShareButton
                url={shareUrl}
                title={title}
                separator=":: "
                className="Demo__some-network__share-button"
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
            </div>
          </div>
          <div className="Demo__container mt-2 ">
            <div className="Demo__some-network">
              <LinkedinShareButton
                // todo need a working url here too
                url={shareUrl}
                summary={description}
                source="ggg"
                className="Demo__some-network__share-button"
              >
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>
            </div>

            <div className="Demo__some-network">
              <PinterestShareButton
                url={String(window.location)}
                media={`${String(window.location)}`}
                description={`${title} ${description}`}
                className="Demo__some-network__share-button"
              >
                <PinterestIcon size={32} round />
              </PinterestShareButton>
            </div>

            <div className="Demo__some-network">
              <RedditShareButton
                url={shareUrl}
                title={title}
                windowWidth={660}
                windowHeight={460}
                className="Demo__some-network__share-button"
              >
                <RedditIcon size={32} round />
              </RedditShareButton>
            </div>

            <div className="Demo__some-network">
              <EmailShareButton
                url={shareUrl}
                subject={`Invitation for ${title}`}
                body={description}
                className="Demo__some-network__share-button"
              >
                <EmailIcon size={32} round />
              </EmailShareButton>
            </div>
            <div className="Demo__some-network">
              <CopyToClipboard text={shareUrl}>
                <button
                  className="Demo__some-network__share-button bg-white  border rounded-full"
                  title="Copy to clipboard"
                  type="button"
                  onClick={notifyCopied}
                >
                  {' '}
                  <i
                    className="Demo__some-network__custom-icon far fa-clipboard text-gray-700 text-lg"
                    style={{ paddingTop: '0.35rem' }}
                  />
                </button>
              </CopyToClipboard>
            </div>
          </div>
        </div>
      </SweetAlert>
    );
  };

  return (
    <React.Fragment>
      <motion.button
        className="w-full text-beta bg-white shadow border border-solid  hover:bg-beta hover:text-white
           active:bg-blue-600 shadow hover:text-white active:bg-blue-600 font-bold uppercase text-xs px-4
            py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShow(true)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.9 }}
      >
        <i className="fas fa-share-alt" />
        &nbsp;Share
      </motion.button>

      {show && getAlert()}
    </React.Fragment>
  );
}

BigShareButton.propTypes = {
  shareUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};
