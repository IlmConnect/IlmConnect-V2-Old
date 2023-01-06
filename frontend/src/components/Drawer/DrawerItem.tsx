import { ExpandCircleDown, ExpandCircleDownOutlined } from "@mui/icons-material";
import {
	Collapse,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";
import { useNavigate } from "react-router-dom";

export interface NavigationItem {
	text: string
	icon: React.ReactNode
	route: string
	children?: NavigationItem[]
}

interface Props {
	item: NavigationItem
}

const DrawerItem: React.FC<Props> = ({
	item
}) => {
	const [expanded, setExpanded] = React.useState(false);
	const navigate = useNavigate();

	const toggleExpanded = () => setExpanded(!expanded)

	return (
		<ListItem
			disablePadding
			sx={{ display: "block" }}
		>
			<>
				<ListItemButton
					onClick={() => navigate(item.route)}
				>
					<ListItemIcon>
						{item.icon}
					</ListItemIcon>
					<ListItemText
						primary={item.text}
					/>
					{
						item.children && item.children.length > 0 &&
						(
							expanded ?
								<ExpandCircleDownOutlined onClick={toggleExpanded} /> :
								<ExpandCircleDown onClick={toggleExpanded} />
						)

					}
				</ListItemButton>

				{
					item.children &&
					<Collapse
						in={expanded}
						timeout="auto"
						unmountOnExit
					>
						<List>
							{
								item.children.map((child, i) => (
									<DrawerItem
										key={i}
										item={child}
									/>
								))
							}
						</List>
					</Collapse>
				}
			</>
		</ListItem>
	);
}
export default observer(DrawerItem);
