import { get } from 'http';

get('http://localhost:8080/hc', (res) => {
  if (res.statusCode === 200) {
    process.exit(0);
  }

  process.exit(1);
}).on('error', () => process.exit(1));
