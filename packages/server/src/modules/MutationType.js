/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import { GraphQLObjectType } from 'graphql';
import glob from 'glob';

const DIRNAME = __dirname;
const mutationPaths = glob.sync(`${__dirname}/**/mutations/**/*.js`, {
  realpath: true,
});

const normalizeMutationName = string => {
  const mutationName = string.replace('Mutation', '');

  return `${mutationName[0].toLowerCase()}${mutationName.substring(1)}`;
};

const normalizeMutationLocation = string => {
  const mutationLocation = string.slice(string.lastIndexOf('/') + 1);

  return mutationLocation.replace(/\.js/i, '');
};

const getMutationRelativePath = path => path.replace(DIRNAME, '.');

const mutationFieldsReducer = (fields, mutation) => {
  const [name, field] = mutation;

  return {
    ...fields,
    [normalizeMutationName(name)]: field.default,
  };
};

const mutationFieldsInfo = mutationPaths.map(mutationPath => [
  normalizeMutationLocation(mutationPath),
  require(getMutationRelativePath(mutationPath)),
]);

const mutationFields = mutationFieldsInfo.reduce(mutationFieldsReducer, {});

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: mutationFields,
});
