import { Collapse, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemProps, ListItemText } from "@mui/material";
import { observer } from "mobx-react-lite";
import DashboardIcon from '@mui/icons-material/Dashboard';
import React from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

interface Props extends ListItemProps{
    isOpen: boolean;
    sidebarItem: SidebarItem;
}

interface SidebarItem {
    text: string;
    icon: JSX.Element;
    child: SidebarItem[];
}

function MiniDrawerItem(props: Props) {
    const [expanded, setExpanded] = React.useState(false);

    const hasChild = props.sidebarItem.child && props.sidebarItem.child.length > 0;

    const handleClick = () => {
        setExpanded(!expanded);
      };
    return (
            <ListItem key={props.sidebarItem.text} disablePadding sx={{ display: 'block' }}>
                <>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: props.isOpen ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={handleClick}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: props.isOpen ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {props.sidebarItem.icon}
                </ListItemIcon>
                <ListItemText primary={props.sidebarItem.text} sx={{ opacity: props.isOpen ? 1 : 0 }} />
                {hasChild ? expanded ? <ExpandLess /> : <ExpandMore /> : undefined}
              </ListItemButton>
              
              {hasChild && <Collapse in={expanded} timeout="auto" unmountOnExit>
                <List>
                    {props.sidebarItem.child.map((child) => <MiniDrawerItem sidebarItem={child} isOpen={props.isOpen}/> )}
                </List>
              </Collapse>}
              <Divider />
              </>
            </ListItem> 
    );
                }
  export default observer(MiniDrawerItem);