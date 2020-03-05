import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {Tooltip} from 'react-tippy';

const ColorPicker = ({onChange, colors, editing, overlay, selectedColor}) => {
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
      <Tooltip
        trigger="click"
        interactive
        open={isPopoverOpen}
        position="bottom"
        onRequestClose={handleonClickOutside}
        html={
          <div style={{backgroundColor: 'white', padding: '10px'}}>
            {renderColorSelector(onChangeColor, colorsRender, selectColorRender)}
          </div>
        }>
        <div style={{
          width: '252px',
          flexWrap: 'wrap',
          marginRight: '-14px',
          marginBottom: '-14px'
        }}>
            <button onClick={e => {
            e.stopPropagation();
            setIsPopoverOpen(!isPopoverOpen);
          }}>Click me</button>

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
                <div data-testid="custom-element" className={selectColor} style={{
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
      </Tooltip>
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
  
    const finalColors = colors;
  
    if (overlay) {
      return editing ?
        renderOverlaySelector(onChange, finalColors, selectColor) :
        renderColorViewer(selectColor);
    }
  
    return editing ?
      renderColorSelector(onChange, finalColors, selectColor) :
      renderColorViewer(selectColor);
  };
  
  ColorPicker.propTypes = {
    onChange: PropTypes.func,
    colors: PropTypes.arrayOf(PropTypes.string),
    selectedColor: PropTypes.string,
    editing: PropTypes.bool,
    overlay: PropTypes.bool
  };
  
  ColorPicker.defaultProps = {
    selectedColor: 'grey lighten-2',
    colors: ['grey lighten-2', 'orange lighten-2', 'green lighten-2', 'blue lighten-2', 'red lighten-2', 'pink lighten-2',
      'yellow lighten-2', 'purple lighten-2', 'brown lighten-2',
      'grey darken-1', 'orange darken-1', 'blue darken-1', 'green darken-1', 'red darken-1', 'pink darken-1',
      'yellow darken-1', 'purple darken-1', 'brown darken-1']
  };
  
  export default ColorPicker;