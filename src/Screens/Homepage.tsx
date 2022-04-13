/* eslint-disable no-console */
import { Button, notification, Row, Typography, Divider, Modal } from 'antd';
import React from 'react';
import fs from 'fs';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Container from '../Components/Container';

const path = 'Config.json';

const Homepage = () => {
  const resetCounter = async () => {
    Modal.confirm({
      title: `Stai resettando il contatore dei modelli`,
      icon: <ExclamationCircleOutlined />,
      content: `Sei sicuro di volerlo fare?`,
      okText: 'Conferma',
      cancelText: 'Annulla',
      onOk: () => {
        if (fs.existsSync(path)) {
          fs.readFile(path, 'utf8', (r_err, data) => {
            if (r_err) {
              console.log(`Error reading file from disk: ${r_err}`);
            } else {
              const json = JSON.parse(data);
              if (json.counter) {
                json.counter = '0000';
                fs.writeFile(
                  path,
                  JSON.stringify(json, null, 4),
                  'utf8',
                  (w_err) => {
                    if (w_err) {
                      console.log(`Error writing file: ${w_err}`);
                    } else {
                      notification.success({
                        message: 'Perfetto!',
                        description:
                          'Il contatore è stato resettato correttamente',
                      });
                    }
                  }
                );
              }
            }
          });
        } else {
          notification.error({
            message: 'Errore',
            description:
              'Il file di configurazione non è ancora stato creato, per crearlo generare un primo modello',
          });
        }
      },
    });
  };
  const resetCounterSemilavorati = async () => {
    Modal.confirm({
      title: `Stai resettando il contatore dei semilavorati`,
      icon: <ExclamationCircleOutlined />,
      content: `Sei sicuro di volerlo fare?`,
      okText: 'Conferma',
      cancelText: 'Annulla',
      onOk: () => {
        if (fs.existsSync(path)) {
          fs.readFile(path, 'utf8', (r_err, data) => {
            if (r_err) {
              console.log(`Error reading file from disk: ${r_err}`);
            } else {
              const json = JSON.parse(data);
              if (json.counter_semilavorati) {
                json.counter_semilavorati = '0000';
                fs.writeFile(
                  path,
                  JSON.stringify(json, null, 4),
                  'utf8',
                  (w_err) => {
                    if (w_err) {
                      console.log(`Error writing file: ${w_err}`);
                    } else {
                      notification.success({
                        message: 'Perfetto!',
                        description:
                          'Il contatore è stato resettato correttamente',
                      });
                    }
                  }
                );
              }
            }
          });
        } else {
          notification.error({
            message: 'Errore',
            description:
              'Il file di configurazione non è ancora stato creato, per crearlo generare un primo modello',
          });
        }
      },
    });
  };
  return (
    <>
      <Container>
        <Row>
          <Typography.Title level={4}>
            Contatore Modello di Conformità
          </Typography.Title>
        </Row>
        <Row>
          <Button type="primary" onClick={resetCounter}>
            Reset Contatore
          </Button>
        </Row>
        <Row>
          <Typography.Title level={4}>Contatore Semilavorati</Typography.Title>
        </Row>
        <Row>
          <Button type="primary" onClick={resetCounterSemilavorati}>
            Reset Contatore
          </Button>
        </Row>
        <Divider />
      </Container>
    </>
  );
};

export default Homepage;
