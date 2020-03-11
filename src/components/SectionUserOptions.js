import React, {useState, useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import {Tooltip} from 'react-tippy';
import {useIntl} from 'react-intl';
import Flag from 'react-world-flags';
import {Accordion, AccordionTab} from 'primereact/accordion';
import {CircleButton, SvgIcon, SvgButton} from '../../../TDButtons';

const SectionUserOptions = ({language, theme, languagesList, themesList,
    onLogout, onChangeLanguage, onChangeTheme}) => {
    const [isUserMenuOpen, setUserMenuOpen] = useState(false);
    const [font, setFont] = useState(1);
    const intl = useIntl();
  
    const onFontSizeChange = useCallback(size => {
      switch (size) {
        case 2:
          document.body.classList.add('font-size-x2');
          break;
        case 1:
        default:
          document.body.classList.remove('font-size-x2');
          break;
      }
      setFont(size);
    }, [setFont]);
  
    const language_header = useMemo(() => <span>
      <SvgIcon iconName='filter' classList='mini left mini-right-air' />
      <p className="left close">{intl.formatMessage({id: 'app.language', defaultMessage: 'Language'})}</p>
    </span>, [intl]);
    const theme_header = useMemo(() => <span>
      <SvgIcon iconName='brush' classList='mini left mini-right-air' />
      <p className="left close">{intl.formatMessage({id: 'app.colors', defaultMessage: 'Colors'})}</p>
    </span>, [intl]);
    const font_header = useMemo(() => <span>
      <SvgIcon iconName='fontSize' classList='mini left mini-right-air' />
      <p className="left close">{intl.formatMessage({id: 'app.fontSize', defaultMessage: 'Font size'})}</p>
    </span>, [intl]);
  
    const renderLanguages = () => (
      <Accordion>
        <AccordionTab header={language_header}>
          <div className='p-col-12'>
            <ul className="close">
              {languagesList.map(lang => (
                <li className={lang.code === language ? 'selectedColor' : ''}
                  key={lang.code}
                  onClick={() => onChangeLanguage(lang)}>
                  <Flag code={lang.code.split('_')[1]} width="26" />
                </li>
              ))}
            </ul>
          </div>
        </AccordionTab>
      </Accordion>
    );
  
    const renderThemes = () => (
      <Accordion>
        <AccordionTab header={theme_header}>
          <div className='p-col-12'>
            <ul className="close">
              {themesList.map(the => (
                <li className={the.name === theme ? 'selectedColor' : ''}
                  key={the.name}
                  onClick={() => onChangeTheme(the)}>
                  <CircleButton color={the.color} tooltip={the.label} />
                </li>
              ))}
            </ul>
          </div>
        </AccordionTab>
      </Accordion>
    );
  
    const renderFontSelector = () => (
      <Accordion>
        <AccordionTab header={font_header}>
          <div className='p-col-12'>
            <ul className="close">
              <li className={font === 1 ? 'selectedColor' : ''}>
                <SvgButton iconName='numberOne' iconNameOver='numberOne_alt' onClick={() => onFontSizeChange(1)} />
              </li>
              <li className={font === 2 ? 'selectedColor' : ''}>
                <SvgButton iconName='numberTwo' iconNameOver='numberTwo_alt' onClick={() => onFontSizeChange(2)} />
              </li>
            </ul>
          </div>
        </AccordionTab>
      </Accordion>
    );
  
  
    return (<Tooltip
      html={<div className='p-grid' style={{width: '140px'}}>
        {languagesList && renderLanguages()}
        {themesList && renderThemes()}
        {renderFontSelector()}
        <div className='logoutPopover' onClick={() => onLogout()}>
          <SvgIcon iconName='powerButton' classList='mini left mini-right-air textColorAlt' />
          <p className="left close">{intl.formatMessage({id: 'app.logout', defaultMessage: 'Logout'})}</p>
        </div>
      </div>}
      interactive
      open={isUserMenuOpen}
      onRequestClose={() => setUserMenuOpen(false)}
    >
      <SvgButton iconName='singleNeutralCircle' iconNameOver='singleNeutralCircle'
        onClick={() => setUserMenuOpen(!isUserMenuOpen)} />
    </Tooltip >
    );
  };
  
  SectionUserOptions.propTypes = {
    languagesList: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      language: PropTypes.string,
      code: PropTypes.string
    })),
    language: PropTypes.shape({
      label: PropTypes.string,
      language: PropTypes.string,
      code: PropTypes.string
    }),
    onChangeLanguage: PropTypes.func,
    theme: PropTypes.shape({
      label: PropTypes.string,
      theme: PropTypes.string,
      name: PropTypes.string,
      color: PropTypes.string
    }),
    themesList: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      theme: PropTypes.string,
      name: PropTypes.string,
      color: PropTypes.string
    })),
    onChangeTheme: PropTypes.func,
    onLogout: PropTypes.func
  };
  
  export default SectionUserOptions;
  