import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';
import TdPropMenu from '../../../../components/elements/menu/TdPopMenu';

const SectionUserOptions = ({language, theme, languagesList, themesList,
    onLogout, onChangeLanguage, onChangeTheme}) => {
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
  
    let languagesItems = [];
    let themesItems = [];
    let fontItems = [
      {
        label: 1,
        command: () => onFontSizeChange(1),
        className: font === 1 ? 'selectedColor' : ''
      },
      {
        label: 2,
        command: () => onFontSizeChange(2),
        className: font === 2 ? 'selectedColor' : ''
      }
    ];
  
    const addLanguagesItems = useCallback(() =>
      languagesList.map(lang => {
        languagesItems.push({
          label: lang.label,
          command: () => onChangeLanguage(lang),
          className: lang.code === language.code ? 'selectedColor' : ''
        });
      }), [languagesList, languagesItems, onChangeLanguage, language]);
  
    const addThemeItems = useCallback(() =>
      themesList.map(the => {
        themesItems.push({
          label: the.name,
          command: () => onChangeTheme(the),
          className: the.name === theme.name ? 'selectedColor' : ''
        });
        return themesItems;
      }), [themesList, themesItems, onChangeTheme, theme]);
  
    addLanguagesItems();
    addThemeItems();
  
    const items = [
      {label: intl.formatMessage({id: 'app.language', defaultMessage: 'Language'}), icon: 'pi pi-filter', items: languagesItems},
      {label: intl.formatMessage({id: 'app.colors', defaultMessage: 'Colors'}), icon: 'pi pi-palette', items: themesItems},
      {label: intl.formatMessage({id: 'app.fontSize', defaultMessage: 'Font size'}), icon: 'pi pi-search-plus', items: fontItems},
      {label: intl.formatMessage({id: 'app.logout', defaultMessage: 'Logout'}), icon: 'pi pi-power-off', command: () => onLogout()}
    ];
  
    return (
      <div className={'sectionUserSelector'}>
        <TdPropMenu iconType={'svg'} icon={'singleNeutralCircle'} menu={items} />
      </div>
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
  