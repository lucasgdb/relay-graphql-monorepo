/**
 * @generated SignedSource<<ac1cebec63d3518a0c180512381e15b3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from 'relay-runtime';
export type Article_article$data = {
  readonly id: string;
  readonly title: string;
  readonly text: string;
  readonly created_at: string;
  readonly ' $fragmentType': 'Article_article';
};
export type Article_article$key = {
  readonly ' $data'?: Article_article$data;
  readonly ' $fragmentSpreads': FragmentRefs<'Article_article'>;
};

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: 'Fragment',
  metadata: null,
  name: 'Article_article',
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
  type: 'Article',
  abstractKey: null,
};

(node as any).hash = '37f864aa6c43890d09b8c8abfa947baa';

export default node;
