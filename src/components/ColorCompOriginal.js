import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import Popover from 'react-tiny-popover';

const ColorComp = ({onChange, colors, editing, overlay, selectedColor}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const selectColor = selectedColor ? selectedColor : 'grey lighten-2';

  const renderColorSelector = useCallback((onChangeColor, colorsRender, selectColorRender) => (
    <div style={{
      width: '252px',
      display: 'flex',
      flexWrap: 'wrap',
      marginRight: '-14px',
      marginBottom: '-14px'
    }}>
      {colorsRender.map((color, index) => (
        <span key={index} onClick={e => {
          e.stopPropagation();
          onChangeColor(color, e);
        }}>
          <div style={{
            width: '28px',
            height: '28px',
            marginRight: '14px',
            marginBottom: '14px'
          }}>
            <span>
              <div className={color} style={{
                background: 'transparent',
                height: '100%',
                width: '100%',
                cursor: 'pointer',
                position: 'relative',
                outline: 'none',
                borderRadius: '50%'
              }}>
                {color === selectColorRender &&
                  <div style={{
                    background: 'transparent',
                    backgroundColor: 'white',
                    height: '60%',
                    width: '60%',
                    cursor: 'pointer',
                    position: 'relative',
                    outline: 'none',
                    borderRadius: '50%',
                    left: '5.5px',
                    top: '5px'
                  }}></div>
                }
              </div>
            </span>
          </div>
        </span>
      ))}
    </div>
  ), []);

  const handleonClickOutside = useCallback(() => {
    setIsPopoverOpen(false);
  }, []);

  const renderOverlaySelector = useCallback((onChangeColor, colorsRender, selectColorRender) => (
    <div style={{
      width: '252px',
      display: 'flex',
      flexWrap: 'wrap',
      marginRight: '-14px',
      marginBottom: '-14px'
    }}>
      <span onClick={e => {
        e.stopPropagation();
        setIsPopoverOpen(!isPopoverOpen);
      }}>
        <div style={{
          width: '28px',
          height: '28px',
          marginRight: '14px',
          marginBottom: '14px'
        }}>
          <span>
            <div className={selectColor} style={{
              background: 'transparent',
              height: '100%',
              width: '100%',
              cursor: 'pointer',
              position: 'relative',
              outline: 'none',
              borderRadius: '50%'
            }}>
            </div>
          </span>
        </div>
      </span>
      <Popover
        isOpen={isPopoverOpen}
        position={['bottom', 'top', 'right', 'left']}
        onClickOutside={handleonClickOutside}
        content={(
          <div style={{backgroundColor: 'white', padding: '10px'}}>
            {renderColorSelector(onChangeColor, colorsRender, selectColorRender)}
          </div>
        )}
      >
        <div></div>
      </Popover>
    </div>
  ), [handleonClickOutside, isPopoverOpen, renderColorSelector, selectColor]);

  const renderColorViewer = useCallback(color => (
    <div style={{
      width: '252px',
      display: 'flex',
      flexWrap: 'wrap',
      marginRight: '-14px',
      marginBottom: '-14px'
    }}>
      <span>
        <div style={{
          width: '28px',
          height: '28px',
          marginRight: '14px',
          marginBottom: '14px'
        }}>
          <span>
            <div className={color} style={{
              background: 'transparent',
              height: '100%',
              width: '100%',
              cursor: 'pointer',
              position: 'relative',
              outline: 'none',
              borderRadius: '50%'
            }}>
            </div>
          </span>
        </div>
      </span>
    </div>
  ), []);

  const finalColors = colors ? colors : ['grey lighten-2', 'orange lighten-2', 'green lighten-2', 'blue lighten-2', 'red lighten-2', 'pink lighten-2',
    'yellow lighten-2', 'purple lighten-2', 'brown lighten-2',
    'grey darken-1', 'orange darken-1', 'blue darken-1', 'green darken-1', 'red darken-1', 'pink darken-1',
    'yellow darken-1', 'purple darken-1', 'brown darken-1'];

  if (overlay) {
    return editing ?
      renderOverlaySelector(onChange, finalColors, selectColor) :
      renderColorViewer(selectColor);
  }

  return editing ?
    renderColorSelector(onChange, finalColors, selectColor) :
    renderColorViewer(selectColor);
};

ColorComp.propTypes = {
  onChange: PropTypes.func,
  colors: PropTypes.array,
  selectedColor: PropTypes.string,
  editing: PropTypes.bool,
  overlay: PropTypes.bool
};

const InputColorPicker = ({name, value, className, disabled, onChange}) => {
    const [colorState, setcolorState] = useState()
    function onChangeColor(color){
        console.log("Cambiado desde InputColorPicker");
        console.log(color);        
        setcolorState(color)
    }
    const handleChangeColor = useCallback(newColor => {
        debugger
      onChangeColor(newColor);
    }, [onChangeColor]);
    return (
      <ColorComp onChange={handleChangeColor}
        selectedColor={colorState}
        name={name}
        overlay
        editing={true}
      />
    );
  };
  
  InputColorPicker.propTypes = {
    name: PropTypes.string,
    value: PropTypes.any,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    required: PropTypes.bool
  };
  
  export default InputColorPicker;