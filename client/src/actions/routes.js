import * as routes from '../constants/settings';

export const routeHome = () => ({type: routes.HOME_ROUTE});

export const routeChapter = (chapter_id) => (
  {type: routes.CHAPTER_ROUTE, payload: { chapter_id }}
);