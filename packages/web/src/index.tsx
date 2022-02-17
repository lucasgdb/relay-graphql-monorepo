import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as ReactDOM from 'react-dom';

import App from './App';

const container = document.getElementById('root');
// @ts-expect-error it's an experimental feature of React, so it wasn't added to DefinitelyTyped yet.
const root = ReactDOM.createRoot(container);
root.render(<App />);

module.hot?.accept();
