import moment from 'moment-timezone';
import get from 'lodash/get';

const transformErrorToGraphQLError = (graphQLError, originalError) => {
  const { message, path, locations } = graphQLError;
  const { code, errorParams } = originalError;

  const graphQLErrorObject = {
    message,
    path,
    locations,
  };

  graphQLErrorObject.extensions = {
    ...get(code, 'code', {}),
    ...get(errorParams, 'errorParams', {}),
    timestamp: moment().format(),
  };

  return graphQLErrorObject;
};

export default transformErrorToGraphQLError;
