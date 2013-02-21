# milliseconds

Milliseconds is a small utility for converting a string representation of a time interval into milliseconds.

## Features

- Build-in milliseconds, seconds, minutes, hours, days and weeks with multiple aliases:


```js
milliseconds('1 second')
milliseconds('3 minutes 2 seconds');
milliseconds('1w3h5m14');
```

- Extensibility, including internationalization:

```js

milliseconds.config({
    years: 365 * milliseconds.config.days
});

milliseconds('3 years')

milliseconds.config({
    'минут': milliseconds.config.minutes
});

milliseconds('15 минут')
```