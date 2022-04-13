/* eslint-disable react/no-unescaped-entities */
import { Col, Row } from 'antd';
import moment from 'moment';
import React from 'react';
import Watermark from '../Components/Watermark';
import '../Styles/Stampa.css';

const StampaRichiesta = ({ history }) => {
  if (!history.location.state) {
    history.push('/Richiesta');
    return null;
  }
  return (
    <>
      <Watermark />
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
