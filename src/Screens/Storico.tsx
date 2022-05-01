/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { Button, Input, Space, Table } from 'antd';
import fs from 'fs';
import { SearchOutlined } from '@ant-design/icons';
import '../Styles/Stampa.css';

const path = 'Records.json';

const Storico = () => {
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  // const [searchInput, setSearchInput] = useState(null);
  const [records, setRecords] = useState([]);

  const readConfig = async () => {
    setLoading(true);
    if (fs.existsSync(path)) {
      fs.readFile(path, 'utf8', (r_err, data) => {
        if (r_err) {
          console.log(`Error reading file from disk: ${r_err}`);
        } else {
          const json = JSON.parse(data);
          if (json) {
            setRecords(json);
          }
        }
      });
    } else {
      fs.writeFile(path, JSON.stringify([], null, 4), 'utf8', (w_err) => {
        if (w_err) {
          console.log(`Error writing file: ${w_err}`);
        } else {
          console.log(`File is written successfully!`);
        }
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    readConfig();
  }, []);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    if (selectedKeys) {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    }
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          // ref={(node) => {
          //   setSearchInput(node);
          // }}
          placeholder={`Cerca ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Cerca
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filtra
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : '',
    // onFilterDropdownVisibleChange: (visible) => {
    //   if (visible) {
    //     setTimeout(() => (searchInput ? searchInput.select() : null), 100);
    //   }
    // },
  });

  return loading ? (
    <></>
  ) : (
    <Table
      dataSource={records}
      pagination={false}
      columns={[
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
          ...getColumnSearchProps('id'),
          sorter: (a, b) => a.id.length - b.id.length,
          sortDirections: ['ascend', 'descend'],
        },
        {
          title: 'Medico',
          dataIndex: 'medico',
          key: 'medico',
          ...getColumnSearchProps('medico'),
          sorter: (a, b) => a.medico.length - b.medico.length,
          sortDirections: ['ascend', 'descend'],
        },
        {
          title: 'Paziente',
          dataIndex: 'paziente',
          key: 'paziente',
          ...getColumnSearchProps('paziente'),
          sorter: (a, b) => a.paziente.length - b.paziente.length,
          sortDirections: ['ascend', 'descend'],
        },
        {
          title: 'Lavorazione',
          dataIndex: 'lavorazione',
          key: 'lavorazione',
          ...getColumnSearchProps('lavorazione'),
        },
      ]}
    />
  );
};

export default withRouter(Storico);
