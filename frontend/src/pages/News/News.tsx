import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'reactstrap';

import Layout from 'layouts/App';

const NewsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostContent = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const News: React.FC = () => {
  return (
    <Layout>
      <NewsWrapper>
        <Container>
          <Row>
            <Col md={4}>
              <img src="https://via.placeholder.com/960x640" alt="placeholder" style={{ maxWidth: '100%' }} />
            </Col>

            <PostContent xs>
              <h2>Previsão maritima</h2>
              <small>2018-09-09</small>
              <p>
                Luanda - O Instituto Nacional de Meteorologia e Geofísica (INAMET) antevê, até às 18h00 desta
                segunda-feira (dia 10), para as quatro regiões litorais de Angola, as seguintes condições climatéricas
                para a navegação marítima
              </p>
            </PostContent>
          </Row>
        </Container>
      </NewsWrapper>
    </Layout>
  );
};

export default News;
