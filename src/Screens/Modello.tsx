/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import fs from 'fs';
import { withRouter } from 'react-router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Select,
  Divider,
  Form,
  Col,
  Input,
  Row,
  Typography,
  DatePicker,
  Button,
} from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import Container from '../Components/Container';

const path = 'Config.json';
const records = 'Records.json';

const Modello = ({ history }) => {
  const [loading, setLoading] = useState(true);

  const [counter, setCounter] = useState('0000');
  const [medici, setMedici] = useState([]);
  const [resine, setResine] = useState({ nomi: [], lotti: [] });
  const [leghe, setLeghe] = useState([]);
  const [zirconie, setZirconie] = useState({ nomi: [], lotti: [] });
  const [ceramiche, setCeramiche] = useState({
    nomi: [],
    lotti: { opachi: [], dentina: [], incisal: [], deepdentin: [], vari: [] },
  });
  const [compositi, setCompositi] = useState({ nomi: [], lotti: [] });
  const [steccheDenti, setSteccheDenti] = useState([]);

  const readConfig = async () => {
    setLoading(true);
    const initConfig = {
      counter: '0000',
      medici: [
        'DR. Sironi Matteo (Dental & C.)',
        'Factory Lab di Cantoni Yuri',
        'DR. Rampinelli Giulio Nicola (Celsus)',
        'DR. Mariani Umberto (Dental & C.)',
      ],
      resine: {
        nomi: [
          'Techim Don',
          'Techim Press',
          'Techim Asako',
          'Techim NXR',
          'Ivoclar Ivocron',
          'Techim Project',
        ],
        lotti: [
          'Techim Don',
          'P 28790 L 31969',
          '---',
          'Techim Press',
          'P 17053 L 03175',
          '---',
          'Techim Asako',
          '2303',
          '---',
          'Techim NXR',
          '2124',
          '---',
          'Ivoclar Ivocron',
          '410 - P YB029Y/S53121 L YZ1073',
          '130 - P WT0276/S53121 L YZ1073',
          '530 - P YB028P/S53121 L YZ1073',
          '---',
          'Techim Project',
          'D3 - P 38019 L 19926',
          'A3 - P 04294 L 19926',
        ],
      },
      leghe: [
        'Cromo Cobalto Dental Crom',
        'Cromo Cobalto Biotech',
        'Cromo Cobalto Yndetech',
      ],
      zirconie: {
        nomi: ['ZIR 1', 'ZIR 2'],
        lotti: ['<Z1>', 'Z 1 1 1', '---', '<<2>>', 'Z2', '---'],
      },
      ceramiche: {
        nomi: ['Ivoclar IPS Style', 'Ivoclar IPS e.max Ceram'],
        lotti: {
          opachi: [
            'A1 X10276',
            'A2 U39201',
            'A3 U38182',
            'A3.5 W85848',
            'A4 X43399',
            '---',
            'B3 X27788',
            '---',
            'C2 X45357',
            'C3 Y21920',
            'C4 Y23328',
            '---',
            'D2 W42754',
            'D3 W97236',
            'D4 X20981',
            '---',
            'PINK W86566',
          ],
          dentina: [
            'A1 W91131',
            'A2 UZ1075',
            'A3 Z002HG',
            'A3.5 Z002BD',
            'A4 X51666',
            '---',
            'B3 Z00156',
            '---',
            'C2 X36203',
            'C3 V18484',
            'C4 Y12806',
            '---',
            'D2 Y01554',
            'D3 Z003GV',
            'D4 W40838',
            '---',
            'G3 W88571',
            'G4 W98253',
          ],
          incisal: [
            'I1 X14520',
            'I2 V49387',
            'I3 Z001PS',
            'I4 Y52042',
            'I5 W30287',
          ],
          deepdentin: [
            'A1 W15039',
            'A2 U15320',
            'A3 W37020',
            'A3.5 W90233',
            '---',
            'C2 W29339',
            'C3 W29289',
            '---',
            'D2 W34952',
            'D3 W33983',
          ],
          vari: [
            'YELLOW W32405',
            'KHAKI  W43575',
            'ORANGE W36544',
            'ORANGE-PINK Y46966',
            '---',
            'ONE 2 X09984',
            'ONE 3 Y02982',
            'ONE 5 W38089',
            '---',
            'OE 1 V10594',
            'OE 2 X26645',
            'MAMELON Y-O W10496',
            'MAMELON L V11882',
            'OD O V10308',
            'TRANSPA N X10690',
          ],
        },
      },
      compositi: {
        nomi: ['Solidex'],
        lotti: [
          'D3 - P 081670 O 071619  D 081644 S58 091682',
          'A3 - P 081670 O 021938  D 061625 S58 091682',
          'C3 - P 081670 O 0121607 D 081652 S59 101866',
        ],
      },
      stecche_denti: [
        'Ivoclar Vivodent/Orthotyp',
        'Ivoclar Vivodent',
        'Ivoclar Orthotyp',
        'Ivoclar Ivostar/Gnatostar',
        'Ivoclar Ivostar',
        'Ivoclar Gnatostar',
        'Acry Plus',
      ],
    };
    if (fs.existsSync(path)) {
      fs.readFile(path, 'utf8', (r_err, data) => {
        if (r_err) {
          console.log(`Error reading file from disk: ${r_err}`);
        } else {
          const json = JSON.parse(data);
          if (json.counter) {
            setCounter(json.counter);
          }
          if (json.medici) {
            setMedici(json.medici);
          }
          if (json.resine) {
            setResine(json.resine);
          }
          if (json.leghe) {
            setLeghe(json.leghe);
          }
          if (json.zirconie) {
            setZirconie(json.zirconie);
          }
          if (json.ceramiche) {
            setCeramiche(json.ceramiche);
          }
          if (json.compositi) {
            setCompositi(json.compositi);
          }
          if (json.stecche_denti) {
            setSteccheDenti(json.stecche_denti);
          }
        }
      });
    } else {
      fs.writeFile(
        path,
        JSON.stringify(initConfig, null, 4),
        'utf8',
        (w_err) => {
          if (w_err) {
            console.log(`Error writing file: ${w_err}`);
          } else {
            console.log(`File is written successfully!`);
          }
        }
      );
    }
    setLoading(false);
  };

  const saveRecord = (values) => {
    const {
      anno_costruzione,
      medico,
      paziente,
      protesi_fissa,
      protesi_mobile,
      protesi_combinata,
    } = values;

    const record = {
      id: `${counter}/${moment(anno_costruzione).year()}`,
      medico,
      paziente,
      lavorazione: `${protesi_fissa}${protesi_mobile}${protesi_combinata}`,
    };

    if (fs.existsSync(records)) {
      fs.readFile(records, 'utf8', (r_err, data) => {
        if (r_err) {
          console.log(`Error reading file from disk: ${r_err}`);
        } else {
          const json = JSON.parse(data).filter((i) => i.id !== record.id);
          json.push(record);
          fs.writeFile(
            records,
            JSON.stringify(json, null, 4),
            'utf8',
            (w_err) => {
              if (w_err) {
                console.log(`Error writing file: ${w_err}`);
              } else {
                console.log(`File is written successfully!`);
              }
            }
          );
        }
      });
    } else {
      const json = [record];
      fs.writeFile(records, JSON.stringify(json, null, 4), 'utf8', (w_err) => {
        if (w_err) {
          console.log(`Error writing file: ${w_err}`);
        } else {
          console.log(`File is written successfully!`);
        }
      });
    }
  };

  useEffect(() => {
    readConfig();
  }, []);

  const incrementGlobalCounter = async () => {
    if (fs.existsSync(path)) {
      fs.readFile(path, 'utf8', (r_err, data) => {
        if (r_err) {
          console.log(`Error reading file from disk: ${r_err}`);
        } else {
          const json = JSON.parse(data);
          json.counter = (+counter + 1).toLocaleString('it-IT', {
            minimumIntegerDigits: 4,
            useGrouping: false,
          });
          setCounter(json.counter);
          fs.writeFile(path, JSON.stringify(json, null, 4), 'utf8', (w_err) => {
            if (w_err) {
              console.log(`Error writing file: ${w_err}`);
            } else {
              console.log(`File is written successfully!`);
            }
          });
        }
      });
    }
  };

  return loading ? (
    <></>
  ) : (
    <>
      <Container>
        <Row justify="center" align="top" gutter={15}>
          <Col xs={24} sm={24} md={12}>
            <Formik
              initialValues={{
                counter,
                paziente: '',
                protesi_fissa: '',
                protesi_mobile: '',
                protesi_combinata: '',
                anno_costruzione: moment(),
                medico: null,
                ritiro_lavoro: '',
                consegna_lavoro: '',
                lotto_lega: '',
                lotto_stecca: '',
                altro: '',
                altro_valore: '',
                altro_lotto: '',
                altro2: '',
                altro2_valore: '',
                altro2_lotto: '',
              }}
              validationSchema={Yup.object().shape({
                counter: Yup.string()
                  .required(
                    'Inserisci un valore per il contatore del tipo NNNN'
                  )
                  .matches(/[0-9]{4}/, 'Non conforme al tipo NNNN'),
                // cap: Yup.string().nullable().required('Seleziona il CAP'),
                // indirizzo: Yup.string()
                //   .strict(true)
                //   .required("Inserisci l'indirizzo")
                //   .max(255, 'Il campo può contenere massimo 255 caratteri'),
                // civico: Yup.string()
                //   .strict(true)
                //   .required('Inserisci il numero civico')
                //   .max(15, 'Il campo può contenere massimo 15 caratteri'),
              })}
              onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                saveRecord(values);
                await incrementGlobalCounter();
                history.push({
                  pathname: '/Stampa',
                  state: { ...values, counter },
                });
              }}
            >
              {({
                values,
                errors,
                touched,
                dirty,
                isValid,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                isSubmitting,
                /* and other goodies */
              }) => (
                <Form
                  name="basic"
                  layout="vertical"
                  onFinish={handleSubmit}
                  autoComplete="on"
                >
                  <Typography.Title level={3} style={{ textAlign: 'center' }}>
                    Contatore
                  </Typography.Title>
                  <Form.Item label="Contatore">
                    <Input
                      type="text"
                      name="counter"
                      maxLength={4}
                      minLength={4}
                      placeholder="Contatore"
                      onChange={(e) => {
                        setCounter(e.target.value);
                      }}
                      onBlur={handleBlur}
                      value={counter}
                    />
                  </Form.Item>
                  <span className="form-error">{errors.counter}</span>
                  <Divider />
                  <Typography.Title level={3} style={{ textAlign: 'center' }}>
                    Paziente
                  </Typography.Title>
                  <Form.Item label="Paziente">
                    <Input
                      type="text"
                      name="paziente"
                      placeholder="Paziente"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.paziente}
                    />
                    <span className="form-error">{errors.paziente}</span>
                  </Form.Item>
                  <Divider />
                  <Typography.Title level={3} style={{ textAlign: 'center' }}>
                    Tipo Protesi
                  </Typography.Title>
                  <Form.Item label="Protesi Fissa">
                    <Input.TextArea
                      allowClear
                      name="protesi_fissa"
                      placeholder="Protesi Fissa..."
                      autoSize={{ minRows: 3, maxRows: 6 }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.protesi_fissa}
                    />
                    <span className="form-error">{errors.protesi_fissa}</span>
                  </Form.Item>
                  <Form.Item label="Protesi Mobile">
                    <Input.TextArea
                      allowClear
                      name="protesi_mobile"
                      placeholder="Protesi Mobile..."
                      autoSize={{ minRows: 3, maxRows: 6 }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.protesi_mobile}
                    />
                    <span className="form-error">{errors.protesi_mobile}</span>
                  </Form.Item>
                  <Form.Item label="Protesi Combinata">
                    <Input.TextArea
                      allowClear
                      name="protesi_combinata"
                      placeholder="Protesi Combinata..."
                      autoSize={{ minRows: 3, maxRows: 6 }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.protesi_combinata}
                    />
                    <span className="form-error">
                      {errors.protesi_combinata}
                    </span>
                  </Form.Item>
                  <Divider />
                  <Typography.Title level={3} style={{ textAlign: 'center' }}>
                    Dettagli
                  </Typography.Title>
                  <Form.Item label="Anno Costruzione">
                    <DatePicker
                      name="anno_costruzione"
                      placeholder="Anno di costruzione"
                      format="YYYY"
                      onChange={(date, dateString) => {
                        console.log(date);
                        console.log(dateString);
                        setFieldValue('anno_costruzione', date);
                      }}
                      onBlur={handleBlur}
                      value={values.anno_costruzione}
                      picker="year"
                      style={{ width: '100%' }}
                    />
                    <span className="form-error">
                      {errors.anno_costruzione}
                    </span>
                  </Form.Item>
                  <Form.Item label="Medico">
                    <Select
                      allowClear
                      showSearch
                      optionLabelProp="label"
                      placeholder="Cerca medico"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      onSelect={(m) => setFieldValue('medico', m)}
                    >
                      {medici.sort().map((m) => (
                        <Select.Option key={m} value={m} label={m}>
                          {m}
                        </Select.Option>
                      ))}
                    </Select>
                    <span className="form-error">{errors.medico}</span>
                  </Form.Item>
                  <Row gutter={[15, 15]}>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item label="Ritiro Lavoro">
                        <input
                          type="date"
                          name="ritiro_lavoro"
                          placeholder="Ritiro Lavoro"
                          onChange={(date) => {
                            console.log(date);
                            setFieldValue('ritiro_lavoro', date.target.value);
                          }}
                          onBlur={handleBlur}
                          value={values.ritiro_lavoro}
                          className="ant-picker"
                          style={{ width: '100%' }}
                        />
                        <span className="form-error">
                          {errors.ritiro_lavoro}
                        </span>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item label="Consegna Lavoro">
                        <input
                          type="date"
                          name="consegna_lavoro"
                          placeholder="Consegna Lavoro"
                          onChange={(date) => {
                            console.log(date);
                            setFieldValue('consegna_lavoro', date.target.value);
                          }}
                          onBlur={handleBlur}
                          value={values.consegna_lavoro}
                          className="ant-picker"
                          style={{ width: '100%' }}
                        />
                        {/* <DatePicker
                          format="DD/MM/YYYY"
                          placeholder="Consegna Lavoro"
                          onChange={(date, dateString) => {
                            setFieldValue('consegna_lavoro', date);
                          }}
                          onBlur={handleBlur}
                          value={values.consegna_lavoro}
                          picker="date"
                          style={{ width: '100%' }}
                        /> */}
                        <span className="form-error">
                          {errors.consegna_lavoro}
                        </span>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Divider />
                  <Typography.Title level={3} style={{ textAlign: 'center' }}>
                    Fabbricazione e Manutenzione
                  </Typography.Title>
                  <Row gutter={15}>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item label="Resina">
                        <Select
                          showSearch
                          placeholder="Cerca resina"
                          optionFilterProp="children"
                          allowClear
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          onSelect={(i) => setFieldValue('resina', i)}
                          onClear={() => setFieldValue('resina', '')}
                        >
                          {resine.nomi.map((i, ind) => (
                            <Select.Option key={ind} value={i}>
                              {i}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item label="Lotto n°">
                        <Select
                          showSearch
                          placeholder="Cerca lotto resina"
                          optionFilterProp="children"
                          allowClear
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          onSelect={(i) => setFieldValue('lotto_resina', i)}
                          onClear={() => setFieldValue('lotto_resina', '')}
                        >
                          {resine.lotti.map((i, ind) => (
                            <Select.Option key={ind} value={i}>
                              {i}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Divider style={{ marginTop: 5 }} />
                  <Row gutter={15}>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item label="Lega Vile">
                        <Select
                          showSearch
                          placeholder="Cerca lega vile"
                          optionFilterProp="children"
                          allowClear
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          onSelect={(i) => setFieldValue('lega_vile', i)}
                          onClear={() => setFieldValue('lega_vile', '')}
                        >
                          {leghe.map((i, ind) => (
                            <Select.Option key={ind} value={i}>
                              {i}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item label="Lotto n°">
                        <Input
                          type="text"
                          name="lotto_lega"
                          placeholder="Lotto n°"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.lotto_lega}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Divider style={{ marginTop: 5 }} />
                  <Row gutter={15}>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item label="Zirconia">
                        <Select
                          showSearch
                          placeholder="Cerca zirconia"
                          optionFilterProp="children"
                          allowClear
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          onSelect={(i) => setFieldValue('zirconia', i)}
                          onClear={() => setFieldValue('zirconia', '')}
                        >
                          {zirconie.nomi.map((i, ind) => (
                            <Select.Option key={ind} value={i}>
                              {i}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item label="Lotto n°">
                        <Select
                          showSearch
                          placeholder="Cerca lotto zirconia"
                          optionFilterProp="children"
                          allowClear
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          onSelect={(i) => setFieldValue('lotto_zirconia', i)}
                          onClear={() => setFieldValue('lotto_zirconia', '')}
                        >
                          {zirconie.lotti.map((i, ind) => (
                            <Select.Option key={ind} value={i}>
                              {i}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Divider style={{ marginTop: 5 }} />
                  <Row gutter={15}>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item label="Ceramica">
                        <Select
                          showSearch
                          placeholder="Cerca ceramica"
                          optionFilterProp="children"
                          allowClear
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          onSelect={(i) => setFieldValue('ceramica', i)}
                          onClear={() => setFieldValue('ceramica', '')}
                        >
                          {ceramiche.nomi.map((i, index) => (
                            <Select.Option key={index} value={i}>
                              {i}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item label="Lotto Opachi n°">
                        <Select
                          showSearch
                          placeholder="Cerca Lotto Opachi n°"
                          optionFilterProp="children"
                          allowClear
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          onSelect={(i) =>
                            setFieldValue('lotto_ceramica_opachi', i)
                          }
                          onClear={() =>
                            setFieldValue('lotto_ceramica_opachi', '')
                          }
                        >
                          {ceramiche.lotti.opachi.map((i, ind) => (
                            <Select.Option key={ind} value={i}>
                              {i}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item label="Lotto Dentina n°">
                        <Select
                          showSearch
                          placeholder="Cerca Lotto Dentina n°"
                          optionFilterProp="children"
                          allowClear
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          onSelect={(i) =>
                            setFieldValue('lotto_ceramica_dentina', i)
                          }
                          onClear={() =>
                            setFieldValue('lotto_ceramica_dentina', '')
                          }
                        >
                          {ceramiche.lotti.dentina.map((i, ind) => (
                            <Select.Option key={ind} value={i}>
                              {i}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item label="Lotto Incisal n°">
                        <Select
                          showSearch
                          placeholder="Cerca Lotto Incisal n°"
                          optionFilterProp="children"
                          allowClear
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          onSelect={(i) =>
                            setFieldValue('lotto_ceramica_incisal', i)
                          }
                          onClear={() =>
                            setFieldValue('lotto_ceramica_incisal', '')
                          }
                        >
                          {ceramiche.lotti.incisal.map((i, ind) => (
                            <Select.Option key={ind} value={i}>
                              {i}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item label="Lotto DeepDentin n°">
                        <Select
                          showSearch
                          placeholder="Cerca Lotto DeepDentin n°"
                          optionFilterProp="children"
                          allowClear
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          onSelect={(i) =>
                            setFieldValue('lotto_ceramica_deepdentin', i)
                          }
                          onClear={() =>
                            setFieldValue('lotto_ceramica_deepdentin', '')
                          }
                        >
                          {ceramiche.lotti.deepdentin.map((i, ind) => (
                            <Select.Option key={ind} value={i}>
                              {i}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item label="Lotto Vari n°">
                        <Select
                          showSearch
                          placeholder="Cerca Lotto Vari n°"
                          optionFilterProp="children"
                          allowClear
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          onSelect={(i) =>
                            setFieldValue('lotto_ceramica_vari', i)
                          }
                          onClear={() =>
                            setFieldValue('lotto_ceramica_vari', '')
                          }
                        >
                          {ceramiche.lotti.vari.map((i, ind) => (
                            <Select.Option key={ind} value={i}>
                              {i}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Divider />
                  <Row gutter={15}>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item label="Composito">
                        <Select
                          showSearch
                          placeholder="Cerca composito"
                          optionFilterProp="children"
                          allowClear
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          onSelect={(i) => setFieldValue('composito', i)}
                          onClear={() => setFieldValue('composito', '')}
                        >
                          {compositi.nomi.map((i, ind) => (
                            <Select.Option key={ind} value={i}>
                              {i}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item label="Lotto n°">
                        <Select
                          showSearch
                          placeholder="Cerca lotto composito"
                          optionFilterProp="children"
                          allowClear
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          onSelect={(i) => setFieldValue('lotto_composito', i)}
                          onClear={() => setFieldValue('lotto_composito', '')}
                        >
                          {compositi.lotti.map((i, ind) => (
                            <Select.Option key={ind} value={i}>
                              {i}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Divider style={{ marginTop: 5 }} />
                  <Row gutter={15}>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item label="Stecche Denti">
                        <Select
                          showSearch
                          placeholder="Cerca stecca denti"
                          optionFilterProp="children"
                          allowClear
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          onSelect={(i) => setFieldValue('stecca_denti', i)}
                          onClear={() => setFieldValue('stecca_denti', '')}
                        >
                          {steccheDenti.map((i) => (
                            <Select.Option key={i} value={i}>
                              {i}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item label="Lotto n°">
                        <Input
                          type="text"
                          name="lotto_stecca"
                          placeholder="Lotto n°"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.lotto_stecca}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Divider style={{ marginTop: 5 }} />
                  <Row gutter={15}>
                    <Col xs={24} sm={24} md={8}>
                      <Form.Item label="Altro (Titolo)">
                        <Input
                          type="text"
                          name="altro"
                          placeholder="Altro (Titolo)"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.altro}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8}>
                      <Form.Item label="Altro (Valore)">
                        <Input
                          type="text"
                          name="altro_valore"
                          placeholder="Altro (Valore)"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.altro_valore}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8}>
                      <Form.Item label="Altro (Lotto n°)">
                        <Input
                          type="text"
                          name="altro_lotto"
                          placeholder="Altro (Lotto n°)"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.altro_lotto}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Divider style={{ marginTop: 5 }} />
                  <Row gutter={15}>
                    <Col xs={24} sm={24} md={8}>
                      <Form.Item label="Altro (Titolo)">
                        <Input
                          type="text"
                          name="altro2"
                          placeholder="Altro (Titolo)"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.altro2}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8}>
                      <Form.Item label="Altro (Valore)">
                        <Input
                          type="text"
                          name="altro2_valore"
                          placeholder="Altro (Valore)"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.altro2_valore}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8}>
                      <Form.Item label="Altro (Lotto n°)">
                        <Input
                          type="text"
                          name="altro2_lotto"
                          placeholder="Altro (Lotto n°)"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.altro2_lotto}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Divider />
                  <Button
                    type="primary"
                    size="large"
                    disabled={isSubmitting || !dirty || !isValid}
                    block
                    loading={isSubmitting}
                    htmlType="submit"
                  >
                    Genera Modello
                  </Button>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default withRouter(Modello);
