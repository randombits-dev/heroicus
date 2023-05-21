import {shutdown} from './vm';

shutdown().then(() => {
  console.log('Shutdown!');
});
