# Telegraf

т.к. на территории РФ телеграмм заблокирован, следует использовать api.telegram через proxy сервер. 

```javascript
import {Telegraf} from 'telegraf';
import { SocksProxyAgent } from 'socks-proxy-agent';

const info = {
  host: '54.38.81.12',
  port: '41790'
};
const agent = new SocksProxyAgent(info);

const telegraf = new Telegraf(process.env.TELEGRAM_TOKEN, {telegram: {agent}});
```

