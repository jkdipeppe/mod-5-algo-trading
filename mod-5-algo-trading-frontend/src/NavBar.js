import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Search } from 'semantic-ui-react'
import _ from 'lodash'

class NavBar extends React.Component{
  state = {

  }

  render(){
    return(
      <div>
        {
          this.props.loggedIn ?
            <Menu tabular>
              <Menu.Item>
                <NavLink
                  to="/display"
                  exact
                  activeStyle={{background: 'lightgray'}}
                  >Overview
                </NavLink>
              </Menu.Item>
              <Menu.Item>
                <NavLink
                  to="/trading"
                  exact
                  activeStyle={{background: 'lightgray'}}
                  >Indexes
                </NavLink>
              </Menu.Item>
              <Menu.Item>
                <NavLink
                  to="/login"
                  exact
                  activeStyle={{background: 'lightgray'}}
                  onClick={this.props.handleLogOut}
                  >Logout
                </NavLink>
              </Menu.Item>
            </Menu>
            :
            <Menu tabular>
            <Menu.Item>
              <NavLink
                to="/login"
                exact
                activeStyle={{background: 'lightgray'}}
                >Login
              </NavLink>
            </Menu.Item>
            <Menu.Item>
              <NavLink
                to="/createaccount"
                exact
                activeStyle={{background: 'lightgray'}}
                >Create Account
              </NavLink>
            </Menu.Item>
          </Menu>
        }
      </div>
    )
  }
}

export default NavBar
