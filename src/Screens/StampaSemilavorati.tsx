/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/no-unescaped-entities */
import { Col, Row } from 'antd';
import moment from 'moment';
import React from 'react';
import Watermark from '../Components/Watermark';
import '../Styles/Stampa.css';

const StampaSemilavorati = ({ history }) => {
  if (!history.location.state) {
    history.push('/Richiesta');
    return null;
  }

  const {
    counter,
    data,
    destinatario,
    lotto_zirconia,
    paziente,
    quantita,
    richiesta_fornitura,
    semilavorati,
  } = history.location.state;

  return (
    <>
      <div style={{ paddingLeft: '50px', paddingRight: '50px' }}>
        <Watermark />
        <Row justify="space-around" style={{ marginTop: 35 }}>
          <Col>N° {`${counter}/${moment().year()}`}</Col>
          <Col>Data {data ? moment(data).format('DD/MM/YYYY') : ''}</Col>
        </Row>
        <Row justify="start" style={{ marginTop: 35 }}>
          Si dichiara sotto la propria responsabilità che il prodotto
          accompagnato dal presente documento è stato fabbricato dal:
        </Row>
        <Row justify="center" style={{ marginTop: 15 }}>
          <b>
            LABORATORIO ODONTOTECNICO GHINZANI CLAUDIO, Via Don A. Seghezzi, 7 -
            24040 BREMBATE (BG)
          </b>
        </Row>
        <Row justify="start" style={{ marginTop: 15 }}>
          esclusivamente per il Sig./ra {paziente.toUpperCase()} ed è pertanto
          da ritenersi destinato unicamente a tale nominativo.
          <br />
          Si dichiara inoltre che il prodotto, fornito e fabbricato su misura, è
          conforme alla prescrizione e al progetto ricevuti da:
        </Row>
        <Row justify="start" style={{ marginTop: 15 }}>
          {destinatario &&
          destinatario.Nome &&
          destinatario.Indirizzo &&
          destinatario.Indirizzo2 ? (
            <b>
              {destinatario.Nome} {destinatario.Indirizzo}{' '}
              {destinatario.Indirizzo2}{' '}
            </b>
          ) : (
            ''
          )}{' '}
          &nbsp;con richiesta fornitura del{' '}
          {richiesta_fornitura
            ? moment(richiesta_fornitura).format('DD/MM/YYYY')
            : ''}
        </Row>
        <Row justify="space-around" style={{ marginTop: 35 }}>
          <Col span={8}>
            <Row justify="center">Elementi semilavorati in:</Row>
            <Row justify="center">{semilavorati || ''}</Row>
          </Col>
          <Col span={8}>
            <Row justify="center">Lotto:</Row>
            <Row justify="center">{lotto_zirconia || ''}</Row>
          </Col>
          <Col span={8}>
            <Row justify="center">Quantità:</Row>
            <Row justify="center">{quantita || ''}</Row>
          </Col>
        </Row>
        <Row justify="start" style={{ marginTop: 35 }}>
          Il prodotto oggetto della presente dichiarazione è conforme alle
          disposizioni legislative che traspongono la direttiva riguardante i
          dispositivi medici su misura (MDR 2017/745).
        </Row>
        <Row style={{ marginTop: 35 }}>
          <Col>
            <strong>Manipolazione del dispositivo</strong>: Ogni manipolazione
            del manufatto, nel momento dell'installazione nel cavo orale, o
            successivamente, deve essere comunicata al fabbricante con appositi
            moduli o comunque in forma scritta riportando i riferimenti
            originali del dispositivo.
            <br />
            <strong>Rischi non rimovibili</strong>: Uso scorretto del
            dispositivo, manipolazioni non consigliate dal produttore, usura
            delle parti di collegamento tra dispositivi di protesi combinata,
            fissa e mobile, ipersensibilità ai materiali non accertata prima
            dell'installazione del dispositivo, eventuali interazioni con
            materiali preesistenti nel cavo orale, inadempienza del ricevente il
            dispositivo ad effettuare una manutenzione ordinaria. <br />
            <strong>Garanzia</strong>: Il prodotto è garantito 12 mesi dalla
            data di installazione nel cavo orale per rottura dovuta a difetto
            accertato nella procedura lavorativa o rottura dovuta ad uno
            scorretto trattamento accertato dei materiali usati per la
            costruzione. La garanzia non comprende la rottura causata da
            incidenti masticatori e la non osservanza delle istruzioni per l'uso
            consegnate al momento della consegna. La Garanzia non comprende
            altresì la rottura dovuta ad una non corretta progettazione del
            dispositivo commissionato e la rottura per una scarsa igiene del
            dispositivo. Ogni garanzia decade se al produttore non vengono
            comunicate le caratteristiche del dispositivo al momento della
            manutenzione ordinaria e in qualsiasi caso in cui il dispositivo
            venga manipolato da personale qualificato ma non autorizzato dal
            produttore dello stesso, nell'arco di 12 mesi
          </Col>
        </Row>
      </div>
    </>
  );
};

export default StampaSemilavorati;
