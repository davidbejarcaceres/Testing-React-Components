import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Tooltip} from 'react-tippy';
import Popover from 'react-tiny-popover';

import SvgButton from 'react-ifaz-components/build/components/layout/SvgButton';
import SvgIcon from 'react-ifaz-components/build/components/layout/SvgIcon';
import {Paginator} from 'primereact/paginator';
import Icons from 'react-ifaz-components/build/components/layout/assets/svgIcons.svg';

const Tooltips = ({iconName, onChange, buttonText}) => {
  const [icons, setIconos] = useState([]);
  const [state, setState] = useState({
    iconName: iconName,
    showIconSelector: false,
    first: 0,
    rows: 24
  });

  function onPageChange(event) {
    setState({...state, first: event.first, rows: event.rows});
  }

  const loadIconsFromFile = () => {
    console.log('loadIconsFromFile loadIconsFromFile loadIconsFromFile');

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

  const renderIconList = () => {
    const {first, rows} = state;

    let resto = null;
    if (icons && Array.isArray(icons) && icons.length > 0) {
      resto = first + rows - icons.length;
    }

    return (
      <div className='p-grid center' style={{width: '200px'}}>
        {icons && Array.isArray(icons) && icons.length > 0 &&
              icons.slice(first, first + rows).map(icon =>
                <div className='p-col-3' key={icon}>
                  <SvgButton iconName={icon} tooltip={icon}
                    onClick={() => {
                      if (onChange) {
                        onChange(icon);
                      }
                      setState({...state, showIconSelector: false});
                    }} />
                </div>
              )
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
    const {showIconSelector} = state;

    if (!icons.find(i => i === state.iconName)) {
      state.iconName = '';
    }

    return (
      <span className='p-button p-fileupload-choose p-widget p-state-default p-corner-all p-button-text-icon-left'
        onClick={() => setState({...state, showIconSelector: !showIconSelector})} >
        {!state.iconName &&
              <React.Fragment>
                <span className='p-button-icon-left pi pi-plus'></span>
                <span className='p-button-text p-clickable'>{buttonText}</span>
              </React.Fragment>
        }
        {state.iconName &&
              <React.Fragment>
                <span className='p-button-icon-left pi pi-times'
                  onClick={e => {
                    e.stopPropagation();
                    setState({...state, iconName: ''});
                  }}></span>
                <SvgIcon iconName={state.iconName} />
              </React.Fragment>
        }
      </span>
    );
  };

  return (
    <Tooltip
      trigger="click"
      interactive
      open={state.showIconSelector}
      position="right"
      onRequestClose={() => setState({...state, showIconSelector: false})}
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
  buttonText: 'Select'
};

//   export default TDIconPicker;

export default Tooltips;
