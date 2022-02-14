/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import { GraphQLObjectType } from 'graphql';
import { glob } from 'glob';

const mutationPaths = glob.sync(`${__dirname}/**/mutations/**/*.ts`, {
  realpath: true,
});

const normalizeMutationName = (mutationName: string) => {
  const newMutationName = mutationName.replace('Mutation', '');
  return `${newMutationName[0].toLowerCase()}${newMutationName.substring(1)}`;
};

const normalizeMutationLocation = (mutationLocation: string) => {
  const newMutationLocation = mutationLocation.slice(
    mutationLocation.lastIndexOf('/') + 1
  );

  return newMutationLocation.replace(/\.(js|ts)/, '');
};

const getMutationRelativePath = (path: string) => path.replace(__dirname, '.');

const mutationFieldsReducer = (fields: object, mutation: any) => {
  const [name, field] = mutation;

  return {
    ...fields,
    [normalizeMutationName(name)]: field.default,
  };
};

const mutationFieldsInfo = mutationPaths.map((mutationPath) => [
  normalizeMutationLocation(mutationPath),
  require(getMutationRelativePath(mutationPath)),
]);

const mutationFields = mutationFieldsInfo.reduce(mutationFieldsReducer, {});

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: mutationFields,
});
