import './header.scss';

import React from 'react';
import { Storage } from 'react-jhipster';
import { Navbar, Nav, NavbarToggler, NavbarBrand, Collapse, NavItem, NavLink } from 'reactstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';

import { IUser } from 'app/shared/model/user.model';
import { Home, Brand, Children } from './header-components';
import { AdminMenu, EntitiesMenu, AccountMenu, LocaleMenu } from './menus';

export interface IHeaderProps extends RouteComponentProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  account: IUser;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
  currentLocale: string;
  onLocaleChange: Function;
}

export interface IHeaderState {
  menuOpen: boolean;
}

export class Header extends React.Component<IHeaderProps, IHeaderState> {
  state: IHeaderState = {
    menuOpen: false
  };

  handleLocaleChange = event => {
    const langKey = event.target.value;
    Storage.session.set('locale', langKey);
    this.props.onLocaleChange(langKey);
  };

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };

  render() {
    const { currentLocale, isAuthenticated, isAdmin, isSwaggerEnabled, isInProduction } = this.props;
    return (
      <div id="app-header">
        <LoadingBar className="loading-bar" />
        <Navbar expand="sm" className="jh-navbar">
          <NavbarToggler aria-label="Menu" onClick={this.toggleMenu} />
          <Brand />
          <Collapse isOpen={this.state.menuOpen} navbar>
            <Nav id="header-tabs" className="ml-auto" navbar>
              <Home />
              {isAuthenticated &&
                this.props.location.pathname === '/agenda' &&
                this.props.account.childrens.length > 0 && <Children account={this.props.account} />}
              {isAuthenticated && isAdmin && <EntitiesMenu />}
              {isAuthenticated && isAdmin && <AdminMenu showSwagger={isSwaggerEnabled} showDatabase={!isInProduction} />}
              <LocaleMenu currentLocale={currentLocale} onClick={this.handleLocaleChange} />
              <AccountMenu isAuthenticated={isAuthenticated} />
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(Header);
