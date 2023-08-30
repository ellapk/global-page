import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import axios from 'axios';

function App() {
    const [data, setData] = useState(null);
    const [apidata, setApiData] = useState([]);
    const express = require('express');
    const mysql = require('mysql2');
    const app = express();
    const port = 3000;
    
    // MySQL 연결 설정
    const connection = mysql.createConnection({
      host: 'localhost', // MySQL 호스트 주소
      user: 'root', // MySQL 사용자 이름
      password: '', // MySQL 비밀번호
      database: 'gem_test' // MySQL 데이터베이스 이름
    });
    
    connection.connect(err => {
      if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
      }
      console.log('Connected to MySQL database');
    });
    
    // API 엔드포인트: 데이터 조회
    app.get('/api/data', (req, res) => {
      const query = 'SELECT * FROM testtable'; // 데이터베이스에서 조회할 테이블
      connection.query(query, (err, results) => {
        if (err) {
          console.error('Error querying database:', err);
          res.status(500).send('Error querying database');
          return;
        }
        res.json(results);
      });
    });
    
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    



    useEffect(() => {
        invoke('getText', { example: 'my-invoke-variable' }).then(setData);
    }, []);

    useEffect(() => {
        axios.get('/api/data') //서버의 api 엔드포인트
            .then(response => {
                setApiData(response.apidata);
            })
            .catch(error=>{
                console.error('Error fetching data:', error);
            });
    },[]);

    return (
        <div>
            {data ? data : 'Loading...'}
            <h1>Mysql data</h1>
            {apidata.map(item => (
                <li key={item.id}>{item.name}</li>
            ))}
        </div>
    );
}

export default App;
