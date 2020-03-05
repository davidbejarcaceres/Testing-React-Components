import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {Tooltip} from 'react-tippy';
import ColorPicker from './ColorPicker';

const InputColorPicker = ({name, value, className, disabled, onChange}) => {
    const [colorState, setcolorState] = useState()
    function onChangeColor(color){
        console.log("Cambiado desde InputColorPicker");
        console.log(color);        
        setcolorState(color)
    }
    const handleChangeColor = useCallback(newColor => {
      onChangeColor(newColor);
    }, [onChangeColor]);
    return (
      <ColorPicker onChange={handleChangeColor}
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