import { createAPI } from './lib/api.mjs';
export default createAPI();
export const config={path:'/api/*',rateLimit:{windowLimit:20,windowSize:60,aggregateBy:['ip','domain']}};
