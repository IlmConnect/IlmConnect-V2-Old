import { Box } from "@mui/material";
import NavBar from "../navBar/NavBar";

const allPages = ["tab1", "tab2", "tab3"];

export default function Home(props) {
  return (
    <Box sx={{ border: "1px solid", height: "100vh", width: "100vh" }}>
      <h1>{props.pageName}</h1>
      <div>
        <NavBar
          sx={{
            height: "35px",
            width: "100%",
            display: "flex",
            position: "relative",
          }}
          menuItems={allPages}
        ></NavBar>
      </div>
      <div>
        <Box sx={{ border: "1px solid" }}>
          <h2>Some text</h2>
        </Box>
      </div>
    </Box>
  );
}
