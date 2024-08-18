# splay-mini-control

Minimal package for controlling the ENTTEC S-Play Mini<br>
<br>
**WARNING**: ENTTEC has explicitly told me that they do not wish for users of this product to have this functionality. It is natively coded in for use with their browser control, but shut behind authorization tokens to prevent their customers from accessing it. So no guarantees this code will continue to work, as ENTTEC continues their mission to make their customers suffer.


## Basic Usage
```typescript
import Splay from 'splay-mini-control'; //TypeScript, (maybe, depending on your tsconfig)
const Splay = require('splay-mini-control').default; //JavaScript

let mySplay = new Splay("192.168.1.2");
mySplay
  .getAllCues()
  .then((resp) => {
    console.log(`All cues: ${JSON.stringify(resp)}`);
  })
  .catch((err) => {
    console.error(err);
  });

mySplay
  .playCue({ cue_id: 1 })
  .then((resp) => {
    console.log(`Play cue response: ${resp}`);
  })
  .catch((err) => {
    console.error(err);
  });
```

## More Documentation
The API is documented in [ENTTEC's GitHub repo here](https://github.com/ENTTEC/SplayApi), for users of more expensive S-Plays. This package is nearly a one-to-one connection to the API, plus functionality to receive the required authorization string.<br>
<br>
If anyone wants to do a PR to allow this package to talk to other S-Plays, feel free