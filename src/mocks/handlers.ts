import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/user', () => {
    console.log('msw request');
    return HttpResponse.json({
      id: '1234',
      firstName: 'SeungYun',
      lastName: 'Yu',
    });
  }),
];
