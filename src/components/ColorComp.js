import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import Popover from 'react-tiny-popover';
import { Tooltip } from 'react-tippy';

export const ColorComp = ({onChange, colors, editing, overlay, currentColor}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [colorState, setcolorState] = useState(currentColor)
    console.log(currentColor);
    debugger
    
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
                background: `${color.hex}`,
                height: '100%',
                width: '100%',
                cursor: 'pointer',
                position: 'relative',
                outline: 'none',
                borderRadius: '50%'
              }}>
                {color === selectColorRender &&
                  <div onClick={() => onChange(`${color.hex}`)} style={{
                    background: `${color.hex}`,
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
        setIsPopoverOpen(true);
      }}>
        <div style={{
          width: '28px',
          height: '28px',
          marginRight: '14px',
          marginBottom: '14px'
        }}>
          <span>
            <div className={currentColor.colorName} style={{                
              background: `${currentColor.hex}`,
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

      {/* <Tooltip
            trigger="click"
            interactive
            open={isPopoverOpen}
            position="bottom"
            onRequestClose={ () => handleonClickOutside()}
            html={
                <div style={{backgroundColor: 'white', padding: '10px'}}>
                    {renderColorSelector(onChangeColor, colorsRender, selectColorRender)}
                </div>
            }>
            <div onClick={() => setIsPopoverOpen(!isPopoverOpen)}>Click Here</div>
        </Tooltip> */}
    </div>
  ), [handleonClickOutside, isPopoverOpen, renderColorSelector, currentColor]);

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


  if (overlay) {
    return editing ?
      renderOverlaySelector(onChange, colors, currentColor) :
      renderColorViewer(currentColor);
  }
  return editing ?
    renderColorSelector(onChange, colors, currentColor) :
    renderColorViewer(currentColor);
};

ColorComp.propTypes = {
  onChange: PropTypes.func,
  colors: PropTypes.arrayOf(PropTypes.shape({
    colorName: PropTypes.string,
    hex: PropTypes.string.isRequired,
  })),
  currentColor: PropTypes.shape({
    colorName: PropTypes.string,
    hex: PropTypes.string.isRequired,
  }),
  editing: PropTypes.bool,
  overlay: PropTypes.bool
};

ColorComp.defaultProps  = {
    currentColor: { colorName: 'grey lighten-2', hex: '#e0e0e0'},
    colors : [
        { colorName: 'grey lighten-2', hex: '#e0e0e0'},
        { colorName: 'orange lighten-2', hex: '#ffb74d'},
        { colorName: 'green lighten-2', hex: '#81c784'}
    ],
}


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