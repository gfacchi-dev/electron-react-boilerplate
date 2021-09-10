import { Col, Row, Typography } from 'antd';
import moment from 'moment';
import React from 'react';
import '../Styles/Stampa.css';

const Stampa = ({ history }) => {
  if (!history.location.state) {
    history.push('/Modello');
    return null;
  }
  return (
    <Row style={{ paddingTop: 25 }}>
      <Col span={12}>
        <Row justify="center">
          <Typography.Title level={4} style={{ textDecoration: 'underline' }}>
            DICHIARAZIONE DI CONFORMITÀ
          </Typography.Title>
        </Row>
        <Row justify="center">
          <Typography.Title level={5}>
            (REGOLAMENTO UE 2017/745)
          </Typography.Title>
        </Row>
        <Row justify="center">
          <Typography.Title level={5}>IL FABBRICANTE:</Typography.Title>
        </Row>
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
            Tel. 0354827799 - Claudio 3356924486 - Mattia 3341868314
          </Row>
          <Row justify="center">
            Cod. Fisc. GHNCLD64S17M052T - Partita Iva 02506930169
          </Row>
          <Row justify="center">Iscr. Reg. Min. San. 01018926</Row>
        </Col>
        <Row justify="center" style={{ marginTop: 20, fontSize: 13 }}>
          DICHIARA CHE IL DISPOSITIVO ODONTOIATRICO
        </Row>
        <Row justify="center" style={{ marginTop: 5, fontSize: 13 }}>
          <b>
            N°{' '}
            {`${history.location.state.counter}/${moment(
              history.location.state.anno_costruzione
            ).year()}`}
          </b>
        </Row>
        <Row justify="center" style={{ marginTop: 10 }}>
          <Col span={18} style={{ textAlign: 'center' }}>
            <Row justify="center">
              <table
                style={{
                  border: 'none',
                  fontSize: 12,
                  padding: '10px',
                }}
              >
                <tbody>
                  {history.location.state.protesi_fissa && (
                    <tr>
                      <th
                        style={{ border: 'none', padding: '10px' }}
                        scope="row"
                      >
                        PROTESI FISSA:
                      </th>
                      <td
                        style={{
                          border: 'none',
                          whiteSpace: 'pre-wrap',
                          padding: '10px',
                        }}
                      >
                        {history.location.state.protesi_fissa}
                      </td>
                    </tr>
                  )}
                  {history.location.state.protesi_mobile && (
                    <tr>
                      <th
                        style={{ border: 'none', padding: '10px' }}
                        scope="row"
                      >
                        PROTESI MOBILE:
                      </th>
                      <td
                        style={{
                          border: 'none',
                          whiteSpace: 'pre-wrap',
                          padding: '10px',
                        }}
                      >
                        {history.location.state.protesi_mobile}
                      </td>
                    </tr>
                  )}
                  {history.location.state.protesi_combinata && (
                    <tr>
                      <th
                        style={{ border: 'none', padding: '10px' }}
                        scope="row"
                      >
                        PROTESI COMBINATA:
                      </th>
                      <td
                        style={{
                          border: 'none',
                          whiteSpace: 'pre-wrap',
                          padding: '10px',
                        }}
                      >
                        {history.location.state.protesi_combinata}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </Row>
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: 20, fontSize: 12 }}>
          <strong>Richiesto da:</strong>
        </Row>
        <Row justify="center" style={{ marginTop: 5 }}>
          {history.location.state.medico}
        </Row>
        <Row justify="center" style={{ marginTop: 10, fontSize: 12 }}>
          <strong>Realizzato per il paziente:</strong>
        </Row>
        <Row justify="center" style={{ marginTop: 5 }}>
          {history.location.state.paziente}
        </Row>
        <Row
          justify="center"
          style={{ marginTop: 20, textAlign: 'center', fontSize: 10 }}
        >
          È stato realizzato seguendo specifiche progettuali espresse nella
          prescrizione medica o richiesta di lavorazione allegata unitamente
          alla destinazione d’uso prevista per il dispositivo.
        </Row>
        <Row
          justify="center"
          style={{ marginTop: 10, textAlign: 'center', fontSize: 10 }}
        >
          Il dispositivo realizzato presso il Laboratorio Odontotecnico Ghinzani
          Claudio è un dispositivo medico su misura, destinato ad essere
          utilizzato esclusivamente dal paziente summenzionato ed è conforme
          alle disposizioni legislative che traspongono la direttiva riguardante
          i dispositivi medici su misura (MDR 2017/745).
        </Row>
        <Row
          justify="center"
          style={{ marginTop: 40, textAlign: 'center', fontSize: 16 }}
        >
          ETICHETTA
        </Row>
        <Row
          justify="center"
          style={{ marginTop: 40, textAlign: 'center', fontSize: 16 }}
        >
          IL DISPOSITIVO ODONTOIATRICO:
        </Row>
        <Row style={{ marginTop: 15, fontSize: 11 }}>
          <ul>
            <li>
              Deve essere installato entro e non oltre 30 giorni dalla
              fabbricazione;
            </li>
            <li>Deve essere manipolato con cura:</li>
            <li>Deve essere conservato al riparo da fonti di calore;</li>
            <li>Deve essere sterilizzato dall’odontoiatra.</li>
          </ul>
        </Row>
        <Row justify="center" style={{ marginTop: 10 }}>
          <table
            style={{
              fontSize: 12,
              padding: '10px',
              border: '1px solid black',
              borderCollapse: 'collapse',
            }}
          >
            <thead>
              <tr>
                {history.location.state.ritiro_lavoro && (
                  <th
                    style={{
                      padding: '10px',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                    scope="col"
                  >
                    DATA RITIRO LAVORO
                  </th>
                )}
                {history.location.state.consegna_lavoro && (
                  <th
                    style={{
                      padding: '10px',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                    scope="col"
                  >
                    DATA CONSEGNA LAVORO
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              <tr>
                {history.location.state.ritiro_lavoro && (
                  <td
                    style={{
                      padding: '10px',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    {moment(history.location.state.ritiro_lavoro).format(
                      'DD/MM/YYYY'
                    )}
                  </td>
                )}
                {history.location.state.consegna_lavoro && (
                  <td
                    style={{
                      padding: '10px',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    {moment(history.location.state.consegna_lavoro).format(
                      'DD/MM/YYYY'
                    )}
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        </Row>
      </Col>

      <Col span={12}>
        <Row justify="center">
          <Typography.Title level={5} style={{ textDecoration: 'underline' }}>
            DATI DI FABBRICAZIONE E MANUTENZIONE
          </Typography.Title>
        </Row>
        <Row justify="center" style={{ marginTop: 10 }}>
          <table
            style={{
              textAlign: 'center',
              padding: '5px 10px',
              border: '1px solid black',
              borderCollapse: 'collapse',
              fontSize: 11,
            }}
          >
            <thead>
              <tr>
                {history.location.state.resina && (
                  <th
                    style={{
                      padding: '5px 10px',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                    scope="col"
                  >
                    RESINA
                  </th>
                )}
                {history.location.state.lega_vile && (
                  <th
                    style={{
                      padding: '5px 10px',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                    scope="col"
                  >
                    LEGA VILE
                  </th>
                )}
                {history.location.state.zirconia && (
                  <th
                    style={{
                      padding: '5px 10px',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                    scope="col"
                  >
                    ZIRCONIA
                  </th>
                )}
                {history.location.state.ceramica && (
                  <th
                    style={{
                      padding: '5px 10px',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                    scope="col"
                  >
                    CERAMICA
                  </th>
                )}
                {history.location.state.composito && (
                  <th
                    style={{
                      padding: '5px 10px',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                    scope="col"
                  >
                    COMPOSITO
                  </th>
                )}
                {history.location.state.altro && (
                  <th
                    style={{
                      padding: '5px 10px',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                    scope="col"
                  >
                    {history.location.state.altro}
                  </th>
                )}
                {history.location.state.altro2 && (
                  <th
                    style={{
                      padding: '5px 10px',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                    scope="col"
                  >
                    {history.location.state.altro2}
                  </th>
                )}
                {history.location.state.stecca_denti && (
                  <th
                    style={{
                      padding: '5px 10px',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                    scope="col"
                  >
                    STECCHE DENTI
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              <tr>
                {history.location.state.resina && (
                  <td
                    style={{
                      padding: '5px 10px',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    {history.location.state.resina}
                  </td>
                )}
                {history.location.state.lega_vile && (
                  <td
                    style={{
                      padding: '5px 10px',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    {history.location.state.lega_vile}
                  </td>
                )}
                {history.location.state.zirconia && (
                  <td
                    style={{
                      padding: '5px 10px',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    {history.location.state.zirconia}
                  </td>
                )}
                {history.location.state.ceramica && (
                  <td
                    style={{
                      padding: '5px 10px',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    {history.location.state.ceramica}
                  </td>
                )}
                {history.location.state.composito && (
                  <td
                    style={{
                      padding: '5px 10px',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    {history.location.state.composito}
                  </td>
                )}
                {history.location.state.altro_valore && (
                  <td
                    style={{
                      padding: '5px 10px',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    {history.location.state.altro_valore}
                  </td>
                )}
                {history.location.state.altro2_valore && (
                  <td
                    style={{
                      padding: '5px 10px',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    {history.location.state.altro2_valore}
                  </td>
                )}
                {history.location.state.stecca_denti && (
                  <td
                    style={{
                      padding: '5px 10px',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    {history.location.state.stecca_denti}
                  </td>
                )}
              </tr>
              <tr>
                {history.location.state.resina && (
                  <td
                    style={{
                      padding: '5px 10px',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    <strong>Lotto n°</strong>
                  </td>
                )}
                {history.location.state.lega_vile && (
                  <td
                    style={{
                      padding: '5px 10px',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    <strong>Lotto n°</strong>
                  </td>
                )}
                {history.location.state.zirconia && (
                  <td
                    style={{
                      padding: '5px 10px',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    <strong>Lotto n°</strong>
                  </td>
                )}
                {history.location.state.ceramica && (
                  <td
                    style={{
                      padding: '5px 10px',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    <strong>Lotto n°</strong>
                  </td>
                )}
                {history.location.state.composito && (
                  <td
                    style={{
                      padding: '5px 10px',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    <strong>Lotto n°</strong>
                  </td>
                )}
                {history.location.state.altro_lotto && (
                  <td
                    style={{
                      padding: '5px 10px',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    <strong>Lotto n°</strong>
                  </td>
                )}
                {history.location.state.altro2_lotto && (
                  <td
                    style={{
                      padding: '5px 10px',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    <strong>Lotto n°</strong>
                  </td>
                )}
                {history.location.state.stecca_denti && (
                  <td
                    style={{
                      padding: '5px 10px',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    <strong>Lotto n°</strong>
                  </td>
                )}
              </tr>
              <tr>
                {history.location.state.resina && (
                  <td
                    style={{
                      padding: '5px 10px',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    {history.location.state.lotto_resina}
                  </td>
                )}
                {history.location.state.lega_vile && (
                  <td
                    style={{
                      padding: '5px 10px',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    {history.location.state.lotto_lega}
                  </td>
                )}
                {history.location.state.zirconia && (
                  <td
                    style={{
                      padding: '5px 10px',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    {history.location.state.lotto_zirconia}
                  </td>
                )}
                {history.location.state.ceramica && (
                  <td
                    style={{
                      padding: '5px 10px',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    {history.location.state.lotto_ceramica_opachi && (
                      <>
                        {history.location.state.lotto_ceramica_opachi}
                        <br />
                      </>
                    )}
                    {history.location.state.lotto_ceramica_dentina && (
                      <>
                        {history.location.state.lotto_ceramica_opachi}
                        <br />
                      </>
                    )}
                    {history.location.state.lotto_ceramica_incisal && (
                      <>
                        {history.location.state.lotto_ceramica_incisal}
                        <br />
                      </>
                    )}
                    {history.location.state.lotto_ceramica_vari && (
                      <>
                        {history.location.state.lotto_ceramica_vari}
                        <br />
                      </>
                    )}
                    {history.location.state.lotto_ceramica_deepdentin && (
                      <>
                        {history.location.state.lotto_ceramica_deepdentin}
                        <br />
                      </>
                    )}
                  </td>
                )}
                {history.location.state.lotto_composito && (
                  <td
                    style={{
                      padding: '5px 10px',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    {history.location.state.lotto_composito}
                  </td>
                )}
                {history.location.state.altro_lotto && (
                  <td
                    style={{
                      padding: '5px 10px',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    {history.location.state.altro_lotto}
                  </td>
                )}
                {history.location.state.altro2_lotto && (
                  <td
                    style={{
                      padding: '5px 10px',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    {history.location.state.altro2_lotto}
                  </td>
                )}
                {history.location.state.stecca_denti && (
                  <td
                    style={{
                      padding: '5px 10px',
                      border: '1px solid black',
                      borderCollapse: 'collapse',
                    }}
                  >
                    {history.location.state.lotto_stecca}
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        </Row>
        <Row
          justify="center"
          style={{ marginTop: 20, textAlign: 'center', fontSize: 16 }}
        >
          ASPETTI GENERALI:
        </Row>
        <Row
          justify="center"
          style={{ marginTop: 10, textAlign: 'center', fontSize: 10 }}
        >
          <Col span={23}>
            La protesi odontoiatrica serve per ripristinare un’adeguata funzione
            masticatoria, distribuita e confortevole. Il dispositivo ha una
            durata stimata di 5 (CINQUE) anni che potrebbe essere minore a
            fronte di un uso difforme dalle istruzioni riportate nel documento
            presente, o maggiore, a fronte di una corretta cura del dispositivo
            e di una pratica di controlli presso il medico di fiducia che sia
            coerente con le indicazioni ricevute. I materiali con cui è stata
            costruita presentano caratteristiche d’idoneità assolute e sono
            stati scelti sulla base della rispondenza a specifiche normative
            tecniche. La durata di una protesi fissa è quasi sempre legata alla
            sopravvivenza dei pilastri che la sostengono, siano essi denti
            naturali o impianti, alla resistenza strutturale dei materiali
            utilizzati e al mantenimento igienico domiciliare associato a
            periodiche visite di controllo. I denti possono nel corso del tempo
            cariarsi, rompersi o essere compromessi dalla malattia parodontale.
            Gli impianti possono svitarsi, rompersi o essere compromessi dalla
            malattia perimplantare. Queste complicanze sono in grado di ridurre
            notevolmente la sopravvivenza della protesi.
          </Col>
        </Row>
        <Row
          justify="center"
          style={{ marginTop: 20, textAlign: 'center', fontSize: 16 }}
        >
          NORME DI UTILIZZO:
        </Row>
        <Row justify="start" style={{ marginTop: 10, fontSize: 10 }}>
          <Col span={23}>
            Come per tutti i tipi di protesi dentali, esistono alcune regole
            basilari da seguire, per proteggere ed accrescere la sopravvivenza
            del dispositivo:
          </Col>
        </Row>
        <Row style={{ marginTop: 10, fontSize: 10 }}>
          <Col span={23}>
            <ul>
              <li>
                È necessario mantenere un buon livello di igiene orale per
                garantire un uso sicuro ed igienico della protesi;
              </li>
              <li>
                Fare eseguire con regolarità le operazioni di manutenzione
                previste. Nel caso di protesi rimovibili valutare l’applicazione
                e rimozione della stessa e la necessità di dover essere
                ribasate;
              </li>
              <li>
                Per la pulizia della protesi usare solo prodotti consigliati dal
                medico;
              </li>
              <li>
                Evitare qualsiasi uso improprio della protesi e qualsiasi
                sollecitazione diversa da quella dovuta alla masticazione.
              </li>
            </ul>
          </Col>
        </Row>
        <Row
          justify="center"
          style={{ marginTop: 20, textAlign: 'center', fontSize: 16 }}
        >
          AVVERTENZE PER L’APPLICAZIONE DELLA PROTESI:
        </Row>
        <Row style={{ marginTop: 10, fontSize: 10 }}>
          <Col span={23}>
            <ul>
              <li>
                <b>Protesi totale mobile o scheletrati:</b> controllare a
                dispositivo inserito la stabilità e la funzionalità. Considerare
                gli aspetti estetici;
              </li>
              <li>
                <b>Protesi combinata:</b> controllare la pulizia dei monconi
                prima di inserire il dispositivo. A dispositivo inserito
                verificare che non vi siano profili di emergenza ed instabilità
                e che l’articolazione sia corretta con i relativi movimenti.
                Verificare rimozione ed inserzione degli attacchi. Considerare
                gli aspetti estetici;
              </li>
              <li>
                <b>Protesi fissa:</b> controllare la pulizia dei monconi. A
                dispositivo inserito verificare che non vi siano profili di
                emergenza ed instabilità e che l’articolazione sia corretta con
                i relativi movimenti. Considerare gli aspetti estetici;
              </li>
              <li>
                <b>Protesi fissa su impianti:</b> a dispositivo inserito
                verificare la stabilità. Considerare gli aspetti estetici.
              </li>
            </ul>
          </Col>
        </Row>
        <Row style={{ marginTop: 15, fontSize: 10 }}>
          <Col span={23}>
            Il presente documento verrà conservato per 10 anni a partire dalla
            data di emissione.
          </Col>
        </Row>
        <Row
          justify="center"
          style={{ textAlign: 'center', fontSize: 15, marginTop: 20 }}
        >
          <strong>
            LABORATORIO ODONTOTECNICO
            <br />
            GHINZANI CLAUDIO
          </strong>
        </Row>
      </Col>
    </Row>
  );
};

export default Stampa;
