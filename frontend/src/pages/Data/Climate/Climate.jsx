import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import Chart from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Card, CardHeader, CardBody, NavItem, NavLink, Nav, Container, Row, Col } from 'reactstrap';

import { chartOptions, parseOptions, chartExample1 } from 'variables/charts';

import * as S from './styled';

const subRoutes = [
  {
    title: 'Histórico Simulado',
    url: '/dados/clima',
  },
  {
    title: 'Média temporal',
    url: '/dados/download',
  },
  {
    title: 'Média Temperatura',
    url: '/dados/comparacao',
  },
  {
    title: 'Estatística',
    url: '/dados/estacoes',
  },
];

function Climate() {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample] = useState('data1');

  useEffect(() => {
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }, []);

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample((state) => (state === 'data1' ? 'data2' : 'data1'));
  };

  return (
    <S.Wrapper>
      <S.SidebarWrapper>
        <Nav navbar className="align-items-start">
          {subRoutes.map((route) => (
            <NavItem key={route.url}>
              <S.SibebarNavLink {...route} to={route.url}>
                {route.title}
              </S.SibebarNavLink>
            </NavItem>
          ))}
        </Nav>
      </S.SidebarWrapper>

      <Container fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">Overview</h6>
                    <h2 className="text-white mb-0">Sales value</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames('py-2 px-3', {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Mês</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames('py-2 px-3', {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Semana</span>
                          <span className="d-md-none">S</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <Line
                    data={chartExample1[chartExample1Data]}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </S.Wrapper>
  );
}

export default Climate;
