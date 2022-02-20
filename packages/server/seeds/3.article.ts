import { Knex } from 'knex';

export const seed = async (knex: Knex) => {
  await knex('article').del();

  await knex('article').insert([
    {
      title: 'Artigo 01',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure deserunt et eos molestiae, minus quia praesentium sint ducimus error. Magni ab at voluptate deserunt earum aspernatur amet accusamus, perspiciatis necessitatibus.',
    },
    {
      title: 'Artigo 02',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure deserunt et eos molestiae, minus quia praesentium sint ducimus error. Magni ab at voluptate deserunt earum aspernatur amet accusamus, perspiciatis necessitatibus.',
    },
    {
      title: 'Artigo 03',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure deserunt et eos molestiae, minus quia praesentium sint ducimus error. Magni ab at voluptate deserunt earum aspernatur amet accusamus, perspiciatis necessitatibus.',
    },
    {
      title: 'Artigo 04',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure deserunt et eos molestiae, minus quia praesentium sint ducimus error. Magni ab at voluptate deserunt earum aspernatur amet accusamus, perspiciatis necessitatibus.',
    },
    {
      title: 'Artigo 05',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure deserunt et eos molestiae, minus quia praesentium sint ducimus error. Magni ab at voluptate deserunt earum aspernatur amet accusamus, perspiciatis necessitatibus.',
    },
    {
      title: 'Artigo 06',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure deserunt et eos molestiae, minus quia praesentium sint ducimus error. Magni ab at voluptate deserunt earum aspernatur amet accusamus, perspiciatis necessitatibus.',
    },
    {
      title: 'Artigo 07',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure deserunt et eos molestiae, minus quia praesentium sint ducimus error. Magni ab at voluptate deserunt earum aspernatur amet accusamus, perspiciatis necessitatibus.',
    },
    {
      title: 'Artigo 08',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure deserunt et eos molestiae, minus quia praesentium sint ducimus error. Magni ab at voluptate deserunt earum aspernatur amet accusamus, perspiciatis necessitatibus.',
    },
    {
      title: 'Artigo 09',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure deserunt et eos molestiae, minus quia praesentium sint ducimus error. Magni ab at voluptate deserunt earum aspernatur amet accusamus, perspiciatis necessitatibus.',
    },
    {
      title: 'Artigo 10',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure deserunt et eos molestiae, minus quia praesentium sint ducimus error. Magni ab at voluptate deserunt earum aspernatur amet accusamus, perspiciatis necessitatibus.',
    },
  ]);
};
