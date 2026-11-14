import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 1,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
  },
};

const baseUrl = __ENV.BASE_URL || 'http://localhost:3000';

export default function () {
  const payload = JSON.stringify({
    customer: 'Cliente k6',
    customerType: 'vip',
    items: [{ product: 'Produto de teste', quantity: 2, unitPrice: 100 }],
  });

  const response = http.post(`${baseUrl}/orders`, payload, {
    headers: { 'Content-Type': 'application/json' },
  });

  check(response, {
    'pedido criado (201)': (r) => r.status === 201,
    'total com desconto correto': (r) => {
      try { return JSON.parse(r.body).total === 180; }
      catch (_) { return false; }
    },
  });
}
