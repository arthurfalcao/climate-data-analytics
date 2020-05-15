import React from 'react';
import { Container } from 'reactstrap';
import AdminNavbar from 'components/Navbar/AdminNavbar';
import AdminFooter from 'components/Footer/AdminFooter';
import Sidebar from 'components/Sidebar';

class Admin extends React.Component {
  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }

  // getBrandText(path) {
  //   for (let i = 0; i < routes.length; i++) {
  //     if (this.props.location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
  //       return routes[i].name;
  //     }
  //   }
  //   return 'Brand';
  // }

  render() {
    return (
      <>
        <Sidebar
          {...this.props}
          // routes={routes}
          logo={{
            innerLink: '/admin/index',
            // imgSrc: require('assets/img/brand/argon-react.png'),
            imgAlt: '...',
          }}
        />
        <div className="main-content" ref="mainContent">
          <AdminNavbar
            {...this.props}
            // brandText={this.getBrandText(this.props.location.pathname)}
          />
          {this.props.children}
          <Container fluid>
            <AdminFooter />
          </Container>
        </div>
      </>
    );
  }
}

export default Admin;
