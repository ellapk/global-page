import Resolver from '@forge/resolver';
import mysql from 'mysql2/promise';

const resolver = new Resolver();

resolver.define('getText', async (req) => {
  try {
    const connection = await mysql.createConnection({
      host: '43.202.96.57',
      user: 'test',
      password: '1111',
      database: 'gem_test',
      port: 3306
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
