/**
 * @generated SignedSource<<57a55738d1bbf3497721c7a9d81f97db>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from 'relay-runtime';
export type homeQuery$variables = {};
export type homeQuery$data = {
  readonly system: {
    readonly ' $fragmentSpreads': FragmentRefs<'Articles_system'>;
  } | null;
};
export type homeQuery = {
  variables: homeQuery$variables;
  response: homeQuery$data;
};

const node: ConcreteRequest = {
  fragment: {
    argumentDefinitions: [],
    kind: 'Fragment',
    metadata: null,
    name: 'homeQuery',
    selections: [
      {
        alias: null,
        args: null,
        concreteType: 'System',
        kind: 'LinkedField',
        name: 'system',
        plural: false,
        selections: [
          {
            args: null,
            kind: 'FragmentSpread',
            name: 'Articles_system',
          },
        ],
        storageKey: null,
      },
    ],
    type: 'Query',
    abstractKey: null,
  },
  kind: 'Request',
  operation: {
    argumentDefinitions: [],
    kind: 'Operation',
    name: 'homeQuery',
    selections: [
      {
        alias: null,
        args: null,
        concreteType: 'System',
        kind: 'LinkedField',
        name: 'system',
        plural: false,
        selections: [
          {
            alias: null,
            args: [
              {
                kind: 'Literal',
                name: 'first',
                value: 5,
              },
            ],
            concreteType: 'ArticleConnection',
            kind: 'LinkedField',
            name: 'articles',
            plural: false,
            selections: [
              {
                alias: null,
                args: null,
                concreteType: 'ArticleEdge',
                kind: 'LinkedField',
                name: 'edges',
                plural: true,
                selections: [
                  {
                    alias: null,
                    args: null,
                    concreteType: 'Article',
                    kind: 'LinkedField',
                    name: 'node',
                    plural: false,
                    selections: [
                      {
                        alias: null,
                        args: null,
                        kind: 'ScalarField',
                        name: 'id',
                        storageKey: null,
                      },
                      {
                        alias: null,
                        args: null,
                        kind: 'ScalarField',
                        name: 'title',
                        storageKey: null,
                      },
                      {
                        alias: null,
                        args: null,
                        kind: 'ScalarField',
                        name: 'text',
                        storageKey: null,
                      },
                      {
                        alias: null,
                        args: null,
                        kind: 'ScalarField',
                        name: 'created_at',
                        storageKey: null,
                      },
                    ],
                    storageKey: null,
                  },
                ],
                storageKey: null,
              },
            ],
            storageKey: 'articles(first:5)',
          },
        ],
        storageKey: null,
      },
    ],
  },
  params: {
    cacheID: '4fbd931fed90f34a668a7ae923e61a63',
    id: null,
    metadata: {},
    name: 'homeQuery',
    operationKind: 'query',
    text: 'query homeQuery {\n  system {\n    ...Articles_system\n  }\n}\n\nfragment Article_article on Article {\n  id\n  title\n  text\n  created_at\n}\n\nfragment Articles_system on System {\n  articles(first: 5) {\n    edges {\n      node {\n        id\n        ...Article_article\n      }\n    }\n  }\n}\n',
  },
};

(node as any).hash = 'ca96ae937385b9a99d9d61e6529fe6ca';

export default node;
