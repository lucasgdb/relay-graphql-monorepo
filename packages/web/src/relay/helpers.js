export const isMutation = request => request.operationKind === 'mutation';
export const isQuery = request => request.operationKind === 'query';
export const forceFetch = cacheConfig => !!(cacheConfig && cacheConfig.force);
export const offsetToCursor = str => Buffer.from(`${str}`).toString('base64');
