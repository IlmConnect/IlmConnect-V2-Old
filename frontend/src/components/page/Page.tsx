import BaseCard from "../BaseCard/BaseCard";
import NavBar from "../UI/NavBar/NavBar";
import Card from '../UI/Card/Card';

const allPages = ["tab1", "tab2", "tab3"]
const randomCard1 = {header: 'header1', body: 'somebody1', buttons: ['button1','button2']}

export default function Page(props) {
  return (
    <Card styles={{ border: "1px solid", height: "90vh", width: "90vw", justifyContent: 'center', alignContent: 'center', background: '#eaecee' }}>
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
        <Card styles={{ border: "1px solid" }}>
          <h2>Some text</h2>
        </Card>
      </div>
      <div>
        <BaseCard {...randomCard1}></BaseCard>
      </div>
    </Card>
  );
}
