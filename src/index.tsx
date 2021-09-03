import { ConfigProvider } from 'antd';
import React from 'react';
import { render } from 'react-dom';
import itIT from 'antd/lib/locale/it_IT';
import App from './App';

render(
  <ConfigProvider locale={itIT}>
    <App />
  </ConfigProvider>,
  document.getElementById('root')
);
