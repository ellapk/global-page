import Resolver from '@forge/resolver';
import mysql from 'mysql2/promise'; // mysql2 패키지의 promise 모듈을 가져옴

const resolver = new Resolver();

resolver.define('getText', async (req) => {
  try {
    const connection = await mysql.createConnection({
      host: '43.202.96.57', // MySQL 호스트 주소
      user: 'root', // MySQL 사용자 이름
      password: '', // MySQL 비밀번호
      database: 'gem_test' // MySQL 데이터베이스 이름
    });

    const [rows] = await connection.execute('SELECT brand, model FROM testtable');

    connection.end(); // 연결 종료

    return rows;
  } catch (error) {
    console.error('Error fetching data from MySQL:', error);
    return [];
  }
});

export const handler = resolver.getDefinitions();
