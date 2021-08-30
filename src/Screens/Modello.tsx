/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import fs from 'fs';
import { withRouter } from 'react-router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Container from '../Components/Container';

const Modello = ({ history }) => {
  const incrementGlobalCounter = async () => {
    const path = 'Config.json';
    const initConfig = {
      counter: '0000',
    };
    if (fs.existsSync(path)) {
      fs.readFile(path, 'utf8', (r_err, data) => {
        if (r_err) {
          console.log(`Error reading file from disk: ${r_err}`);
        } else {
          const json = JSON.parse(data);
          const { counter } = json;
          json.counter = (+counter + 1).toLocaleString('it-IT', {
            minimumIntegerDigits: 4,
            useGrouping: false,
          });
          fs.writeFile(path, JSON.stringify(json, null, 4), 'utf8', (w_err) => {
            if (w_err) {
              console.log(`Error writing file: ${w_err}`);
            } else {
              console.log(`File is written successfully!`);
            }
          });
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

  return (
    <>
      <Container>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={Yup.object().shape({
            citta: Yup.string().nullable().required('Seleziona la città'),
            cap: Yup.string().nullable().required('Seleziona il CAP'),
            indirizzo: Yup.string()
              .strict(true)
              .required("Inserisci l'indirizzo")
              .max(255, 'Il campo può contenere massimo 255 caratteri'),
            civico: Yup.string()
              .strict(true)
              .required('Inserisci il numero civico')
              .max(15, 'Il campo può contenere massimo 15 caratteri'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              // alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && errors.email}
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && errors.password}
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default withRouter(Modello);
