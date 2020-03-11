import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Tooltip} from 'react-tippy';
import SvgIcon from './SvgIcon';
import SvgButton from './SvgButton';
import {Accordion, AccordionTab} from 'primereact/accordion';
import Flag from 'react-world-flags';
import CircleButton from './CircleButton';

class UserOptions extends Component {
  constructor() {
    super();
    this.state = {};
  }

  renderLanguages = () => {
    const language_icon = <span>
      <SvgIcon iconName='filter' classList='mini left mini-right-air' />
      <p className="left close">{this.props.intl.formatMessage({id: 'app.language', defaultMessage: 'Language'})}</p>
    </span>;
    return <Accordion>
      <AccordionTab header={language_icon}>
        <div className='p-col-12'>
          <ul className="close">
            {this.props.languagesList.map(lang => (
              <li className={lang.code === this.props.language ? 'selectedBgColor' : ''}
                key={lang.code}
                onClick={() => this.props.onChangeLanguage(lang)}>
                <Flag code={lang.code.split('-')[1]} width="26" />
              </li>
            ))}
          </ul>
        </div>
      </AccordionTab>
    </Accordion>;
  };

  renderThemes = () => {
    const theme_icon = <span>
      <SvgIcon iconName='brush' classList='mini left mini-right-air' />
      <p className="left close">{this.props.intl.formatMessage({id: 'app.colors', defaultMessage: 'Colors'})}</p>
    </span>;
    return <Accordion>
      <AccordionTab header={theme_icon}>
        <div className='p-col-12'>
          <ul className="close">
            {this.props.themesList.map(theme => (
              <li className={theme.name === this.props.theme ? 'selectedBgColor' : ''}
                key={theme.name}
                onClick={() => this.props.onChangeTheme(theme)}>
                <CircleButton color={theme.color} tooltip={theme.label} />
              </li>
            ))}
          </ul>
        </div>
      </AccordionTab>
    </Accordion>;
  }

  onFontSizeChange = size => {
    switch (size) {
      case 2:
        document.body.classList.add('font-size-x2');
        break;
      case 1:
      default:
        document.body.classList.remove('font-size-x2');
        break;
    }
  }

  renderFontSelector = () => {
    const font_icon = <span>
      <SvgIcon iconName='fontSize' classList='mini left mini-right-air' />
      <p className="left close">{this.props.intl.formatMessage({id: 'app.fontSize', defaultMessage: 'Font size'})}</p>
    </span>;
    return <Accordion>
      <AccordionTab header={font_icon}>
        <div className='p-col-12'>
          <ul className="close">
            <li className={this.props.font === 1 ? 'selectedBgColor' : ''}>
              <SvgButton iconName='numberOne' iconNameOver='numberOne_alt' onClick={() => this.onFontSizeChange(1)} />
            </li>
            <li className={this.props.font === 2 ? 'selectedBgColor' : ''}>
              <SvgButton iconName='numberTwo' iconNameOver='numberTwo_alt' onClick={() => this.onFontSizeChange(2)} />
            </li>
          </ul>
        </div>
      </AccordionTab>
    </Accordion>;
  }

  render() {
    const {isUserMenuOpen} = this.state;
    const {languagesList, themesList} = this.props;
    return (<Tooltip
        arrow={true}
        animation='fade'
        trigger="click"
        interactive
        open={isUserMenuOpen}
      padding={0} // adjust padding here!
      onRequestClose={() => this.setState({isUserMenuOpen: false})} // handle click events outside of the popover/target here!
      html={<div className='p-grid' style={{width: '140px'}}>
      {languagesList && this.renderLanguages()}
      {themesList && this.renderThemes()}
      {this.renderFontSelector()}
          <div className='logoutPopover' onClick={() => this.props.onLogout()}>
            <SvgIcon iconName='powerButton' classList='mini left mini-right-air textColorAlt' />
            <p className="left close">{this.props.intl.formatMessage({id: 'app.logout', defaultMessage: 'Logout'})}</p>
          </div>
        </div>
      }>
      <SvgButton iconName='navigationMenuHorizontal' iconNameOver='navigationMenuHorizontal_alt'
        onClick={() => this.setState({isUserMenuOpen: !isUserMenuOpen})} />
    </Tooltip>
    );
  }
}
UserOptions.propTypes = {
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
  font: PropTypes.number,
  onChangeLanguage: PropTypes.func,
  onChangeTheme: PropTypes.func,
  intl: PropTypes.any,
  onLogout: PropTypes.func
};

export default UserOptions;
