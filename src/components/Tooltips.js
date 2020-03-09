import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Tooltip} from 'react-tippy';
import {Paginator} from 'primereact/paginator';
import Icons from '../../../graphics/svgIcons.svg';
import SvgButton from '../../buttons/SvgButton';
import SvgIcon from '../../buttons/SvgIcon';

const Tooltips = ({iconName, onChange, buttonText}) => {
  const [icons, setIconos] = useState([]);
  const [showIconSelector, setshowIconSelector] = useState(false);
  const [state, setState] = useState({
    first: 0,
    rows: 24
  });

  function onPageChange(event) {
    setState({...state, first: event.first, rows: event.rows});
  }

  const loadIconsFromFile = () => {
    let txt = '';
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.status === 200 && xmlhttp.readyState === 4) {
        txt = xmlhttp.responseText;
        const parser = new DOMParser();
        const doc = parser.parseFromString(txt, 'image/svg+xml');

        const symbols = doc.documentElement.getElementsByTagName('symbol');
        const iconos = [];
        for (let i = 0; i < symbols.length; i++) {
          iconos.push(symbols[i].id);
        }
        setIconos(iconos);
      }
    };
    xmlhttp.open('GET', Icons, true);
    xmlhttp.send();
  };

  useEffect(() => loadIconsFromFile(), []);

  const renderIconElement = icon => {
    const handleChangeIcon = () => {
      onChange(icon);
      setshowIconSelector(false);
    };

    return (
      <div className='p-col-3' key={icon}>
        <SvgButton iconName={icon} tooltip={icon} onClick={handleChangeIcon}/>
      </div>
    );
  };

  const renderIconList = () => {
    const {first, rows} = state;

    let resto = null;
    if (icons && Array.isArray(icons) && icons.length > 0) {
      resto = first + rows - icons.length;
    }

    return (
      <div className='p-grid center' style={{width: '200px'}}>
        {icons && Array.isArray(icons) && icons.length > 0 &&
              icons.slice(first, first + rows).map(icon => renderIconElement(icon))
        }
        {resto && resto > 0 &&
              [...Array(resto)].map((icon, index) =>
                <div className='p-col-3' key={index}>
                  <SvgButton iconName='' classList='off no-events' />
                </div>
              )
        }
        <Paginator first={first} rows={rows}
          totalRecords={icons.length} onPageChange={onPageChange}
          template='FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink' />
      </div>
    );
  };

  const renderButton = () => {
    let iconName_ = iconName;
    if (!icons.find(i => i === iconName)) {
      iconName_ = '';
    }

    return (
      <span className='p-button p-fileupload-choose p-widget p-state-default p-corner-all p-button-text-icon-left'
        onClick={() => setshowIconSelector(!showIconSelector)} >
        {!iconName_ &&
              <React.Fragment>
                <span className='p-button-icon-left pi pi-plus'></span>
                <span className='p-button-text p-clickable'>{buttonText}</span>
              </React.Fragment>
        }
        {iconName_ &&
              <React.Fragment>
                <span className='p-button-icon-left pi pi-times'
                  onClick={e => {
                    e.stopPropagation();
                    onChange('');
                  }}></span>
                <SvgIcon iconName={iconName_} />
              </React.Fragment>
        }
      </span>
    );
  };

  return (
    <Tooltip
      arrow={true}
      animation='fade'
      trigger="click"
      interactive
      open={showIconSelector}
      onRequestClose={() => setshowIconSelector(false)}
      html={<div>
        {renderIconList()}
      </div>}>
      {renderButton()}
    </Tooltip>
  );
};

Tooltips.propTypes = {
  iconName: PropTypes.string,
  onChange: PropTypes.func,
  buttonText: PropTypes.string
};

Tooltips.defaultProps = {
  iconName: '',
  buttonText: 'Icon',
  onChange: () => {}
};


function TdImageIconPicker({nodeInfo, updateNodeIcon}) {
  // const [nodeIcon, setnodeIcon] = useState(nodeInfo);
  // const [files, setfiles] = useState([]);
  const [state, setstate] = useState({
    nodeIcon: nodeInfo,
    files: []
  });

  const handleIconChange = nodeIcon => {
    updateNodeIcon(nodeIcon);
    setstate({nodeIcon, files: []});
    console.log(state);
    debugger;
  };

  const getFiles = files => {
    updateNodeIcon(files.base64);
    setstate({files, nodeIcon: files.base64});
    console.log(state);
    debugger;
  };

  const {nodeIcon, files} = state;

  let icon = null;
  let image = null;
  if (nodeIcon && nodeIcon.slice(0, 5) === 'data:') {
    // Image
    image = !Array.isArray(files) ? [files] : files;
  } else {
    // Icon
    icon = nodeIcon;
  }

  return (
    <div className='p-grid'>
      <div className='p-col-6'>
        <Tooltip buttonText='Icon' iconName={state.nodeIcon} onChange={handleIconChange} />
      </div>
      <div className='p-col-6'>
        {/* <FileBase64 buttonText='Image' multiple={false} onDone={getFiles} files={image} removable={true} showMiniImg={true} /> */}
      </div>
    </div>
  );
}

TdImageIconPicker.propTypes = {
  nodeInfo: PropTypes.string,
  updateNodeIcon: PropTypes.func
};

TdImageIconPicker.defaultProps = {
  nodeInfo: '',
  updateNodeIcon: () => {}
};

export default TdImageIconPicker;

