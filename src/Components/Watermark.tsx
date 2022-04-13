import { Col, Row } from 'antd';
import * as React from 'react';

const Watermark = () => {
  return (
    <Row style={{ paddingTop: 25 }}>
      <Col span={12}>
        <Row justify="center" style={{ textAlign: 'center', fontSize: 15 }}>
          <strong>
            LABORATORIO ODONTOTECNICO
            <br />
            GHINZANI CLAUDIO
          </strong>
        </Row>
        <Col style={{ marginTop: 10, fontSize: 10 }}>
          <Row justify="center">Protesi mobile, Fissa e soluzioni CAD-CAM</Row>
          <Row justify="center">
            Sede: Via S. Fermo, 14 Laboratorio: Via Don A. Seghezzi, 7
          </Row>
          <Row justify="center">24040 GRIGNANO DI BREMBATE -BG-</Row>
          <Row justify="center">
            <strong>Claudio</strong> 3356924486 - <strong>Mattia</strong>{' '}
            3341868314
          </Row>
          <Row justify="center">
            Cod. Fisc. GHNCLD64S17M052T - Partita Iva 02506930169
          </Row>
          <Row justify="center">Iscr. Reg. Min. San. 01018926</Row>
        </Col>
      </Col>
      <Col span={12} />
    </Row>
  );
};

export default Watermark;
