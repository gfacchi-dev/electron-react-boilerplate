/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable prefer-destructuring */
import React, { useEffect, useState } from 'react';
import fs from 'fs';
import { withRouter } from 'react-router';
import {
  Col,
  Row,
  Form,
  Input,
  Divider,
  Select,
  Button,
  DatePicker,
  Typography,
} from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Container from '../Components/Container';

const path = 'Config.json';
const esecuzione_path = 'Esecuzione.json';

const ModelloSemilavorati = ({ history }) => {
  const [loading, setLoading] = useState(true);

  const [counter, setCounter] = useState('0000');
  const [zirconie, setZirconie] = useState({ nomi: [], lotti: [] });

  const [esecuzioneJSON, setEsecuzioneJSON] = useState(null);

  const readConfig = async () => {
    setLoading(true);

    if (fs.existsSync(path)) {
      fs.readFile(path, 'utf8', (r_err, data) => {
        if (r_err) {
          console.log(`Error reading file from disk: ${r_err}`);
        } else {
          const json = JSON.parse(data);
          if (json.counter_semilavorati) {
            setCounter(json.counter_semilavorati);
          }
          if (json.zirconie) {
            setZirconie(json.zirconie);
          }
        }
      });
    }

    if (fs.existsSync(esecuzione_path)) {
      fs.readFile(esecuzione_path, 'utf8', (r_err, data) => {
        if (r_err) {
          console.error(`Error reading file from disk: ${r_err}`);
        } else {
          const json = JSON.parse(data);
          setEsecuzioneJSON(json);
          setLoading(false);
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
          json.counter_semilavorati = (+counter + 1).toLocaleString('it-IT', {
            minimumIntegerDigits: 4,
            useGrouping: false,
          });
          setCounter(json.counter_semilavorati);
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
              }}
              validationSchema={Yup.object().shape({
                counter: Yup.string()
                  .required(
                    'Inserisci un valore per il contatore del tipo NNNN'
                  )
                  .matches(/[0-9]{4}/, 'Non conforme al tipo NNNN'),
              })}
              onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                await incrementGlobalCounter();
                values.destinatario = esecuzioneJSON.laboratori.filter(
                  (l) => l.Nome === values.destinatario
                )[0];
                history.push({
                  pathname: '/StampaSemilavorati',
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
                      name="counter_semilavorati"
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
                  <Row gutter={[15, 15]}>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item label="Data">
                        <input
                          type="date"
                          name="data"
                          placeholder="Data"
                          onChange={(date) => {
                            setFieldValue('data', date.target.value);
                          }}
                          onBlur={handleBlur}
                          value={values.data}
                          className="ant-picker"
                          style={{ width: '100%' }}
                        />
                        {/* <span className="form-error">{errors.data}</span> */}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Divider style={{ marginTop: 5 }} />
                  <Row gutter={15}>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item label="Paziente">
                        <Input
                          type="text"
                          name="paziente"
                          placeholder="Paziente"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.paziente}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item label="Destinatario">
                        <Select
                          allowClear
                          showSearch
                          placeholder="Cerca destinatario"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          onSelect={(d) => setFieldValue('destinatario', d)}
                        >
                          {esecuzioneJSON.laboratori.map((lab) => (
                            <Select.Option key={lab.Nome} value={lab.Nome}>
                              {lab.Nome}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item label="Richiesta Fornitura">
                        <input
                          type="date"
                          name="richiesta_fornitura"
                          placeholder="Richiesta Fornitura"
                          onChange={(date) => {
                            setFieldValue(
                              'richiesta_fornitura',
                              date.target.value
                            );
                          }}
                          onBlur={handleBlur}
                          value={values.richiesta_fornitura}
                          className="ant-picker"
                          style={{ width: '100%' }}
                        />
                        {/* <span className="form-error">{errors.data}</span> */}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Divider style={{ marginTop: 5 }} />
                  <Row gutter={15}>
                    <Col xs={24} sm={24} md={8}>
                      <Form.Item label="Semilavorati">
                        <Input
                          type="text"
                          name="semilavorati"
                          placeholder="Elementi Semilavorati in..."
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.semilavorati}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8}>
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
                    <Col xs={24} sm={24} md={8}>
                      <Form.Item label="Quantità">
                        <Input
                          type="text"
                          name="quantita"
                          placeholder="Quantità"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.quantita}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Divider style={{ marginTop: 5 }} />
                  <Row />
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

export default withRouter(ModelloSemilavorati);
