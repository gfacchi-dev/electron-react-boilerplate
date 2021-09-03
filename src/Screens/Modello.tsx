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
import Container from '../Components/Container';

const path = 'Config.json';

const Modello = ({ history }) => {
  const [medici, setMedici] = useState([]);
  const [resine, setResine] = useState({ nomi: [], lotti: [] });
  const [leghe, setLeghe] = useState([]);
  const [ceramiche, setCeramiche] = useState({
    nomi: [],
    lotti: { opachi: [], dentina: [], incisal: [], deepdentin: [], vari: [] },
  });
  const [compositi, setCompositi] = useState({ nomi: [], lotti: [] });
  const [steccheDenti, setSteccheDenti] = useState([]);

  const readConfig = async () => {
    const initConfig = {
      counter: '0000',
      medici: [],
      resine: {
        nomi: [],
        lotti: [],
      },
      leghe: [],
      ceramiche: {
        nomi: [],
        lotti: {
          opachi: [],
          dentina: [],
          incisal: [],
          deepdentin: [],
          vari: [],
        },
      },
      compositi: {
        nomi: [],
        lotti: [],
      },
      stecche_denti: [],
    };
    if (fs.existsSync(path)) {
      fs.readFile(path, 'utf8', (r_err, data) => {
        if (r_err) {
          console.log(`Error reading file from disk: ${r_err}`);
        } else {
          const json = JSON.parse(data);
          if (json.medici) {
            setMedici(json.medici);
          }
          if (json.resine) {
            setResine(json.resine);
          }
          if (json.leghe) {
            setLeghe(json.leghe);
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
  };

  useEffect(() => {
    readConfig();
  }, []);

  // const incrementGlobalCounter = async () => {
  //   if (fs.existsSync(path)) {
  //     fs.readFile(path, 'utf8', (r_err, data) => {
  //       if (r_err) {
  //         console.log(`Error reading file from disk: ${r_err}`);
  //       } else {
  //         const json = JSON.parse(data);
  //         const { counter } = json;
  //         json.counter = (+counter + 1).toLocaleString('it-IT', {
  //           minimumIntegerDigits: 4,
  //           useGrouping: false,
  //         });
  //         fs.writeFile(path, JSON.stringify(json, null, 4), 'utf8', (w_err) => {
  //           if (w_err) {
  //             console.log(`Error writing file: ${w_err}`);
  //           } else {
  //             console.log(`File is written successfully!`);
  //           }
  //         });
  //       }
  //     });
  //   } else {
  //     fs.writeFile(
  //       path,
  //       JSON.stringify(initConfig, null, 4),
  //       'utf8',
  //       (w_err) => {
  //         if (w_err) {
  //           console.log(`Error writing file: ${w_err}`);
  //         } else {
  //           console.log(`File is written successfully!`);
  //         }
  //       }
  //     );
  //   }
  // };

  return (
    <>
      <Container>
        <Row justify="center" align="top" gutter={15}>
          <Col xs={24} sm={24} md={12}>
            <Formik
              initialValues={{
                paziente: '',
                protesi_fissa: '',
                protesi_mobile: '',
                protesi_combinata: '',
                anno_costruzione: null,
                medico: null,
                ritiro_lavoro: null,
                consegna_lavoro: null,
                lotto_lega: '',
                zirconia: '',
                lotto_zirconia: '',
                lotto_stecca: '',
                altro: '',
                altro_valore: '',
                altro_lotto: '',
              }}
              // validationSchema={
              //   Yup.object().shape({
              // paziente: Yup.string().required(
              //   'Inserisci il nome del paziente'
              // ),
              // cap: Yup.string().nullable().required('Seleziona il CAP'),
              // indirizzo: Yup.string()
              //   .strict(true)
              //   .required("Inserisci l'indirizzo")
              //   .max(255, 'Il campo può contenere massimo 255 caratteri'),
              // civico: Yup.string()
              //   .strict(true)
              //   .required('Inserisci il numero civico')
              //   .max(15, 'Il campo può contenere massimo 15 caratteri'),
              // })}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                history.push({
                  pathname: '/Stampa',
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
                        <Select.Option key={m} value={m}>
                          {m}
                        </Select.Option>
                      ))}
                    </Select>
                    <span className="form-error">{errors.medico}</span>
                  </Form.Item>
                  <Row gutter={[15, 15]}>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item label="Ritiro Lavoro">
                        <DatePicker
                          format="DD/MM/YYYY"
                          name="ritiro_lavoro"
                          placeholder="Ritiro Lavoro"
                          onChange={(date, dateString) => {
                            setFieldValue('ritiro_lavoro', date);
                          }}
                          onBlur={handleBlur}
                          value={values.ritiro_lavoro}
                          picker="date"
                          style={{ width: '100%' }}
                        />
                        <span className="form-error">
                          {errors.ritiro_lavoro}
                        </span>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item label="Consegna Lavoro">
                        <DatePicker
                          format="DD/MM/YYYY"
                          name="consegna_lavoro"
                          placeholder="Consegna Lavoro"
                          onChange={(date, dateString) => {
                            setFieldValue('consegna_lavoro', date);
                          }}
                          onBlur={handleBlur}
                          value={values.consegna_lavoro}
                          picker="date"
                          style={{ width: '100%' }}
                        />
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
                          {resine.nomi.sort().map((i) => (
                            <Select.Option key={i} value={i}>
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
                          {resine.lotti.sort().map((i) => (
                            <Select.Option key={i} value={i}>
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
                          {leghe.sort().map((i) => (
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
                        <Input
                          type="text"
                          name="zirconia"
                          placeholder="Zirconia"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.zirconia}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item label="Lotto n°">
                        <Input
                          type="text"
                          name="lotto_zirconia"
                          placeholder="Lotto n°"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.lotto_zirconia}
                        />
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
                          {ceramiche.nomi.sort().map((i) => (
                            <Select.Option key={i} value={i}>
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
                          {ceramiche.lotti.opachi.sort().map((i) => (
                            <Select.Option key={i} value={i}>
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
                          {ceramiche.lotti.dentina.sort().map((i) => (
                            <Select.Option key={i} value={i}>
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
                          {ceramiche.lotti.incisal.sort().map((i) => (
                            <Select.Option key={i} value={i}>
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
                          {ceramiche.lotti.deepdentin.sort().map((i) => (
                            <Select.Option key={i} value={i}>
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
                          {ceramiche.lotti.vari.sort().map((i) => (
                            <Select.Option key={i} value={i}>
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
                          {compositi.nomi.sort().map((i) => (
                            <Select.Option key={i} value={i}>
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
                          {compositi.lotti.sort().map((i) => (
                            <Select.Option key={i} value={i}>
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
                          {steccheDenti.sort().map((i) => (
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
                  <Divider />
                  <Button
                    type="primary"
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
