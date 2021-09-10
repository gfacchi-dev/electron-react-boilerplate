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
} from 'antd';
import { Formik } from 'formik';
import Container from '../Components/Container';

const path = 'Esecuzione.json';

const Richiesta = ({ history }) => {
  const [loading, setLoading] = useState(true);
  const [esecuzioneJSON, setEsecuzioneJSON] = useState(null);

  const readConfig = async () => {
    setLoading(true);
    const initConfig = {
      laboratori: [
        {
          Nome: 'PROGETTO LAB-3',
          Indirizzo: 'Via Risorgimento, 46',
          Indirizzo2: 'Bernareggio (MB)',
        },
        {
          Nome: 'Dental House',
          Indirizzo: 'Via Rizzo, 1/B',
          Indirizzo2: 'Stezzano (BG)',
        },
        {
          Nome: 'Biotech S.r.l',
          Indirizzo: 'Via Torquato Taramelli, 13',
          Indirizzo2: 'Legnano (MI)',
        },
      ],
      modalita: [
        'Inviate con file',
        'Con modelli in gesso e cera di masticazione',
      ],
    };
    if (fs.existsSync(path)) {
      fs.readFile(path, 'utf8', (r_err, data) => {
        if (r_err) {
          console.error(`Error reading file from disk: ${r_err}`);
        } else {
          const json = JSON.parse(data);
          setEsecuzioneJSON(json);

          setLoading(false);
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
          setLoading(false);
        }
      );
    }
  };

  useEffect(() => {
    readConfig();
  }, []);

  return loading ? (
    <></>
  ) : (
    <>
      <Container>
        <Row justify="center" align="top" gutter={15}>
          <Col xs={24} sm={24} md={12}>
            <Formik
              initialValues={{}}
              onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                values.destinatario = esecuzioneJSON.laboratori.filter(
                  (l) => l.Nome === values.destinatario
                )[0];
                history.push({
                  pathname: '/stamparichiesta',
                  state: values,
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
                  <Divider />
                  <Form.Item label="Testo">
                    <Input.TextArea
                      allowClear
                      name="testo"
                      placeholder="N° 1 Oggetto..."
                      autoSize={{ minRows: 3, maxRows: 6 }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.testo}
                    />
                  </Form.Item>
                  <Form.Item label="Modalità">
                    <Select
                      allowClear
                      showSearch
                      placeholder="Modalità..."
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      onSelect={(m) => setFieldValue('modalita', m)}
                    >
                      {esecuzioneJSON.modalita.map((m) => (
                        <Select.Option key={m} value={m}>
                          {m}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Divider />
                  <Row gutter={[15, 15]}>
                    <Col xs={24} sm={24} md={8}>
                      <Form.Item label="Sesso">
                        <Select
                          allowClear
                          showSearch
                          placeholder="Sesso"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          onSelect={(m) => setFieldValue('sesso', m)}
                        >
                          <Select.Option key="Per il Sig." value="Per il Sig.">
                            Per il Sig.
                          </Select.Option>
                          <Select.Option
                            key="Per la Sig.ra"
                            value="Per la Sig.ra"
                          >
                            Per la Sig.ra
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={16}>
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
                  </Row>
                  <Form.Item label="In data">
                    <DatePicker
                      format="DD/MM/YYYY"
                      name="data"
                      placeholder="In data"
                      onChange={(date, dateString) => {
                        setFieldValue('data', date);
                      }}
                      onBlur={handleBlur}
                      value={values.data}
                      picker="date"
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                  <Divider />
                  <Button
                    type="primary"
                    disabled={isSubmitting || !dirty || !isValid}
                    block
                    size="large"
                    loading={isSubmitting}
                    htmlType="submit"
                  >
                    Genera Richiesta di Esecuzione
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

export default withRouter(Richiesta);
