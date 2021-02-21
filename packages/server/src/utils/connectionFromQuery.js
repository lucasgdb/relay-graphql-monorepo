const FIRST = 1000;
const MAX_FIRST = 10000;

export const base64 = str => Buffer.from(str, 'ascii').toString('base64');
export const unbase64 = b64 => Buffer.from(b64, 'base64').toString('ascii');

export const cursorToOffset = cursor => parseInt(unbase64(cursor), 10);

export const getOffsetWithDefault = (cursor, defaultOffset) => {
  if (cursor === undefined || cursor === null) {
    return defaultOffset;
  }

  const offset = cursorToOffset(cursor);
  return isNaN(offset) ? defaultOffset : offset;
};

export const offsetToCursor = offset => base64(offset);

export const getTotalCount = async ({ query }) => {
  const resolvedQuery = await query
    .count('*')
    .clearOrder()
    .clearSelect()
    .limit(1)
    .queryContext({ limit: 1 });

  return resolvedQuery.count;
};

export const getTotalDistinctCount = async props => {
  const { query, distinctExpression } = props;

  if (distinctExpression) {
    const resolvedQuery = await query
      .countDistinct(distinctExpression)
      .clearOrder()
      .clearSelect()
      .limit(1)
      .queryContext({ limit: 1 });

    return resolvedQuery.count;
  }

  return getTotalCount(props);
};

export const calculateOffsets = ({ args, totalCount }) => {
  const { after, before } = args;
  let { first, last } = args;

  if (!first && !last) {
    first = FIRST;
  } else if (first && first > MAX_FIRST) {
    first = MAX_FIRST;
  } else if (last && last > MAX_FIRST) {
    last = MAX_FIRST;
  }

  const beforeOffset = getOffsetWithDefault(before, totalCount);
  const afterOffset = getOffsetWithDefault(after, -1);

  let startOffset = Math.max(-1, afterOffset) + 1;
  let endOffset = Math.min(totalCount, beforeOffset);

  if (first !== undefined) {
    endOffset = Math.min(endOffset, startOffset + first);
  }

  if (last !== undefined) {
    startOffset = Math.max(startOffset, endOffset - (last || 0));
  }

  const offset = Math.max(startOffset, 0);

  const limit = endOffset - startOffset;

  return {
    first,
    last,
    before,
    after,
    offset,
    limit,
    beforeOffset,
    afterOffset,
    startOffset,
    endOffset,
    startCursorOffset: offset,
    endCursorOffset: limit + offset,
  };
};

export function getPageInfo({
  edges,
  totalCount,
  startCursorOffset,
  endCursorOffset,
}) {
  const firstEdge = edges[0];
  const lastEdge = edges[edges.length - 1];

  return {
    startCursor: firstEdge ? firstEdge.cursor : null,
    endCursor: lastEdge ? lastEdge.cursor : null,
    hasPreviousPage: startCursorOffset > 0,
    hasNextPage: endCursorOffset < totalCount,
  };
}

async function connectionFromPostgres({
  query,
  args = {},
  customOffset = null,
  customGetTotalCount = getTotalDistinctCount,
  distinctExpression,
}) {
  const clonedQuery = query.clone();

  const totalCount =
    (await customGetTotalCount({ query: clonedQuery, distinctExpression })) ||
    2147483647;

  const {
    first,
    last,
    before,
    after,
    offset,
    limit,
    beforeOffset,
    afterOffset,
    startOffset,
    endOffset,
    startCursorOffset,
    endCursorOffset,
  } = calculateOffsets({ args, totalCount });

  query.offset(offset);
  query.limit(limit);

  const slice = await query;
  const edges = slice.map((value, index) => ({
    cursor: offsetToCursor(
      `${customOffset ? customOffset(value) : startOffset + index}`,
    ),
    node: value,
  }));

  return {
    edges,
    count: totalCount,
    endCursorOffset,
    startCursorOffset,
    pageInfo: getPageInfo({
      edges,
      before,
      after,
      first,
      last,
      afterOffset,
      beforeOffset,
      startOffset,
      endOffset,
      totalCount,
      startCursorOffset,
      endCursorOffset,
    }),
  };
}

export default connectionFromPostgres;
