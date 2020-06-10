# Firebase

## Инициализация

```javascript
import serviceAccount from '../../../firebase.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://'
})
const database = admin.database();
```

## Firebase session

```javascript
this.telegraf.use(firebaseSession(database.ref('sessions')));

this.telegraf.on('message', ctx => {
  ctx.session.counter = ctx.session.counter || 0
  ctx.session.counter++;
})
```