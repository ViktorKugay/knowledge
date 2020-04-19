# Мокирование модулей

## jest --clearCache

Jest может закешировать невалидный результат теста.

## Jest Transform

Иногда необходимо протестировать модуль, включающий в себя js, css, ts и т.д., однако, по умолчанию jest умеет только в js. Выход - подключить jest transform модули. Это позволит прогнать код через babel или иные loader-ы и включить недостающие файлы.

### Внимание **jest может отключать эту функцию по умолчанию для некоторых модулей, чтобы не выполнять работу понапрасну. Это конфигурируется в jest.config.js"**

- подключаем расширенные настройки в общий js.config.js

```javascript
module.exports = {
  transformIgnorePatterns: [],
};
```

- общий js.config.js

```javascript
module.exports = {
  collectCoverageFrom: ['<rootDir>/packages/*/src/**/*.{js,jsx,mjs}', '!<rootDir>/node_modules/'],
  setupFiles: [require.resolve('./setupTests.js'), require.resolve('./polyfills.js')],
  testMatch: [
    '<rootDir>/packages/**/__tests__/**/*.{js,jsx,mjs,ts,tsx}',
    '<rootDir>/packages/**/?(*.)(spec|test).{js,jsx,mjs,ts,tsx}',
  ],
  testEnvironment: 'node',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(js|jsx|mjs|ts|tsx)$': require.resolve('babel-jest'),
    '^.+\\.css$': require.resolve('./jest/cssTransform'),
    '^(?!.*\\.(js|jsx|mjs|css|json)$)': require.resolve('./jest/fileTransform'),
  },
  transformIgnorePatterns: [],
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
  },
  moduleFileExtensions: ['web.js', 'js', 'json', 'web.jsx', 'jsx', 'node', 'mjs', 'ts', 'tsx'],
};
```
