import ReactDOM from 'ReactDOM'
import style from './testDetails.less';
import {Layout, message, Table} from "antd";
import DetailsHead from "../../components/details/DetailsHead.jsx";
import Header from "../../components/layout/Header.jsx";
import Footer from "../../components/layout/Footer.jsx";
import SiderNav from "../../components/layout/SiderNav.jsx";
const {Content} = Layout;

class Father extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }
  render() {
    return (
      <div>
        <Header/>
        <Layout className={"teacher-layout h-all"}>
          <SiderNav/>
          <Layout className={style.layoutBox}>
            <Content className={style.hello}>
              <DetailsHead/>
            </Content>
          </Layout>
        </Layout>
        <Footer/>
      </div>
    )
  }
}
ReactDOM.render((
  <Father/>
), document.getElementById('main'));
