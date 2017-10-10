const Worker = require('worker-loader!./worker');
import { Store } from 'redux-webworker';
export default new Store(Worker);
