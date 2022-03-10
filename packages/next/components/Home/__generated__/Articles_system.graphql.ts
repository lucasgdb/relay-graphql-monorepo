/**
 * @generated SignedSource<<f17426f2af3d717510796c0020129347>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from 'relay-runtime';
export type Articles_system$data = {
  readonly articles: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly ' $fragmentSpreads': FragmentRefs<'Article_article'>;
      } | null;
    } | null> | null;
  } | null;
  readonly ' $fragmentType': 'Articles_system';
};
export type Articles_system$key = {
  readonly ' $data'?: Articles_system$data;
  readonly ' $fragmentSpreads': FragmentRefs<'Articles_system'>;
};

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: 'Fragment',
  metadata: null,
  name: 'Articles_system',
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
                  args: null,
                  kind: 'FragmentSpread',
                  name: 'Article_article',
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
  type: 'System',
  abstractKey: null,
};

(node as any).hash = '69c31ca7f9e66761d0fade8e2e5db6d1';

export default node;
