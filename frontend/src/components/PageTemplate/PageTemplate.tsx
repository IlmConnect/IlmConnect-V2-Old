import { observer } from "mobx-react-lite";
import MiniDrawer, { AppBar } from "components/MiniDrawer/MiniDrawer";
import React from "react";
import ToolBarComponent from "components/ToolBar/ToolBarComponent";

function PageTemplate() {
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpenToggle = () => {
      setOpen(!open);
      console.log(open);
    };
  return (
    <div>
        <ToolBarComponent handleDrawerOpenToggle={handleDrawerOpenToggle} isOpen={open}/>
        <MiniDrawer handleDrawerOpenToggle={handleDrawerOpenToggle} isOpen={open}/>
    </div>
  );
}
export default observer(PageTemplate);
