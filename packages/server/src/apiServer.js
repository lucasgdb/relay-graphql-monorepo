import testController from './controllers/testController';

const version = 'v1';

const apiServer = server => {
  server.get(`/${version}/test`, testController.testGet);
};

export default apiServer;
