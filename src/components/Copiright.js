import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
export const getImagesRelativePath = () => (process.env.PUBLIC_URL);

const CopyRightComponent = ({copyRightData, intl}) => {
    const {appName, version, appUrl} = copyRightData ? copyRightData : {};
    const [loadedImage, setloadedImage] = useState(false);
    function onLoadedImage() {
      setloadedImage(true);
    }
  
    return <div className="p-grid">
      <div className="p-col-12 p-lg-12 p-md-12">
        <img onLoad={onLoadedImage} src={`${getImagesRelativePath()}/assets/layout/images/tedial.jpg`} alt='Tedial' />
      </div>
  
      {loadedImage &&
      <div>
        <div className="p-col-12 p-lg-12 p-md-12">
          <h4>{appName}</h4>
        </div>
  
        <div className="p-col-12 p-lg-12 p-md-12">
          <span className="strongText">{intl.formatMessage({id: 'app.copyright.version', defaultMessage: 'Version:'})} {version}</span>
        </div>
  
        <div className="p-col-12 p-lg-12 p-md-12">
          <p>{intl.formatMessage({id: 'app.copyright.issue', defaultMessage: 'Any issues or requirements should be reported via our customer support portal at:'})}
            <a className="left break-word text-overflow" href={appUrl} rel="noopener noreferrer" target="_blank">{appUrl}</a>
          </p>
          <p>{intl.formatMessage({id: 'app.copyright.criticalNumbers', defaultMessage: 'If you have critical issues you may contact our support hotline at the following directions:'})}</p>
          <ul className="close no-air">
            <li>
              <label className="strongText right-air">{intl.formatMessage({id: 'app.copyright.organization', defaultMessage: 'Organization:'})}</label>
              <label>Tedial</label>
            </li>
            <li>
              <label className="strongText right-air">{intl.formatMessage({id: 'app.copyright.address', defaultMessage: 'Address:'})}</label>
              <label>C/Severo Ochoa, 33, 29590 Málaga - Spain</label>
            </li>
            <li>
              <label className="strongText right-air">{intl.formatMessage({id: 'app.copyright.phone', defaultMessage: 'Phone:'})}</label>
              <label>+34 951 012 600</label>
            </li>
          </ul>
        </div>
      </div>
      }
    </div>;
  };
  
  CopyRightComponent.propTypes = {
    intl: PropTypes.object,
    copyRightData: PropTypes.object
  };
  export default CopyRightComponent;
  
