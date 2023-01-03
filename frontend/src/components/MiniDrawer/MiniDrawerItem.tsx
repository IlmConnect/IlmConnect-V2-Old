import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemProps,
  ListItemText,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import authStore from "store/auth";
import { useNavigate } from "react-router-dom";

interface Props extends ListItemProps {
  isOpen: boolean;
  sidebarItem: SidebarItem;
}

interface SidebarItem {
  text: string;
  icon: JSX.Element;
  route: string;
  child: SidebarItem[];
}

function MiniDrawerItem(props: Props) {
  const [expanded, setExpanded] = React.useState(false);

  const hasChild =
    props.sidebarItem.child && props.sidebarItem.child.length > 0;

  const navigate = useNavigate();

  const handleClick = () => {
    setExpanded(!expanded);
    authStore.user ? authStore.logout() : navigate(props.sidebarItem.route);
  };
  return (
    <ListItem
      key={props.sidebarItem.text}
      disablePadding
      sx={{ display: "block" }}
    >
      <>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: props.isOpen ? "initial" : "center",
            px: 2.5,
          }}
          onClick={handleClick}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: props.isOpen ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            {props.sidebarItem.icon}
          </ListItemIcon>
          <ListItemText
            primary={props.sidebarItem.text}
            sx={{ opacity: props.isOpen ? 1 : 0 }}
          />
          {hasChild && props.isOpen ? (
            expanded ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )
          ) : undefined}
        </ListItemButton>

        {hasChild && (
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <List>
              {props.sidebarItem.child.map((child) => (
                <MiniDrawerItem
                  key={child.text}
                  sidebarItem={child}
                  isOpen={props.isOpen}
                />
              ))}
            </List>
          </Collapse>
        )}
        <Divider />
      </>
    </ListItem>
  );
}
export default observer(MiniDrawerItem);
