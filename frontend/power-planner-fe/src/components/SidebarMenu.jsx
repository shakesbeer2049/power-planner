import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

const SidebarMenu = () => {
  return(
  <Sidebar backgroundColor="#98C1D9" style={{"border":"1px solid black"}}>
    
    <Menu>
      {/* <SubMenu label="Charts">
        <MenuItem> Pie charts </MenuItem>
        <MenuItem> Line charts </MenuItem>
      </SubMenu> */}
      <MenuItem> Add Task + </MenuItem>
      <MenuItem> <Link to={'/daily'}>Today</Link>  </MenuItem>
      <MenuItem> Weekly </MenuItem>
      <MenuItem> Monthly</MenuItem>
    </Menu>
  </Sidebar>
  )
}

export default SidebarMenu;