import { observer } from "mobx-react-lite";
import MiniDrawer from "components/MiniDrawer/MiniDrawer";
import React from "react";
import ToolBarComponent from "components/ToolBar/ToolBarComponent";
import { Outlet } from "react-router-dom";

function PageTemplate() {
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpenToggle = () => {
      setOpen(!open);
    };
  return (
    <div>
        <ToolBarComponent handleDrawerOpenToggle={handleDrawerOpenToggle} isOpen={open}/>
        <MiniDrawer handleDrawerOpenToggle={handleDrawerOpenToggle} isOpen={open}/>
        <Outlet/>
    </div>
  );
}
export default observer(PageTemplate);
