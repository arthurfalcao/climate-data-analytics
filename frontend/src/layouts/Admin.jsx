import React from 'react';
import t from 'prop-types';
import { Container } from 'reactstrap';

import AdminNavbar from 'components/Navbar/AdminNavbar';
import AdminFooter from 'components/Footer/AdminFooter';
import Sidebar from 'components/Sidebar';

function Admin(props) {
  const { children } = props;

  // getBrandText(path) {
  //   for (let i = 0; i < routes.length; i++) {
  //     if (this.props.location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
  //       return routes[i].name;
  //     }
  //   }
  //   return 'Brand';
  // }

  return (
    <>
      <Sidebar
        {...props}
        // routes={routes}
        logo={{
          innerLink: '/admin/index',
          // imgSrc: require('assets/img/brand/argon-react.png'),
          imgAlt: '...',
        }}
      />
      <div className="main-content">
        <AdminNavbar
          {...props}
          // brandText={this.getBrandText(this.props.location.pathname)}
        />
        {children}
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
}

Admin.propTypes = {
  children: t.node.isRequired,
};

export default Admin;
