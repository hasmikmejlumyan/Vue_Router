import { createRouter, createWebHistory } from 'vue-router';

import TeamsList from './pages/TeamsList.vue';
import UsersList from './pages/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './pages/NotFound.vue';
import TeamsFooter from './pages/TeamsFooter.vue';
import UserFooter from './pages/UserFooter.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/', redirect: '/teams'},
    {
      name: 'teams',
      path: '/teams',
      meta: { needsAuth: true },
      components: {
        default: TeamsList, footer: TeamsFooter
      },
      children: [
        {name: 'team-members', path: ':teamId', component: TeamMembers, props: true},
      ]},
    {path: '/users',
      components: {
        default: UsersList,
        footer: UserFooter
      },
      // beforeEnter(to, from, next) {
      //     next();
      // }
    },
    {path: '/:notFound(.*)', component: NotFound}
  ],
  linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { left: 0, top: 0 };
  }
});

router.beforeEach((to, from, next) => {
  if (to.meta.needsAuth) {
    next();
  } else {
    next();
  }
});

// router.afterEach((to, from) => {
//     // Send analytics data
// })

export default router;