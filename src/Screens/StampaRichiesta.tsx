/* eslint-disable react/no-unescaped-entities */
import { Col, Row } from 'antd';
import moment from 'moment';
import React from 'react';
import '../Styles/Stampa.css';

const StampaRichiesta = ({ history }) => {
  if (!history.location.state) {
    history.push('/Richiesta');
    return null;
  }
  return (
    <>
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
            <Row justify="center">
              Protesi mobile, Fissa e soluzioni CAD-CAM
            </Row>
            <Row justify="center">
              Sede: Via S. Fermo, 14 Laboratorio: Via Don A. Seghezzi, 7
            </Row>
            <Row justify="center">24040 GRIGNANO DI BREMBATE -BG-</Row>
            <Row justify="center">
              Tel. 0354827799 - Claudio 3356924486 - Mattia 3341868314
            </Row>
            <Row justify="center">
              Cod. Fisc. GHNCLD64S17M052T - Partita Iva 02506930169
            </Row>
            <Row justify="center">Iscr. Reg. Min. San. 01018926</Row>
          </Col>
        </Col>
        <Col span={12} />
      </Row>
      <Row justify="end" style={{ marginTop: 35 }}>
        <Col span={8}>
          <Row>Spett.le</Row>
          <Row>
            <b>{history.location.state.destinatario.Nome}</b>
          </Row>
          <Row>{history.location.state.destinatario.Indirizzo}</Row>
          <Row>{history.location.state.destinatario.Indirizzo2}</Row>
        </Col>
      </Row>
      <Row justify="start" style={{ marginTop: 35 }}>
        Si richiede l'esecuzione di:
      </Row>
      <Row justify="start" style={{ marginTop: 35 }}>
        {history.location.state.testo}
      </Row>
      <Row justify="start">{history.location.state.modalita}</Row>
      <Row justify="start" style={{ marginTop: 35 }}>
        {`${history.location.state.sesso} ${history.location.state.paziente}`}
      </Row>
      <Row justify="start">
        in data {moment(history.location.state.data).format('DD/MM/YYYY')}
      </Row>
      <Row justify="start" style={{ marginTop: 50 }}>
        Il richiedente:
      </Row>
    </>
  );
};

export default StampaRichiesta;
