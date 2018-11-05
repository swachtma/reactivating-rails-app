import * as constants from "../constants/bookmarks";

export const setBookmarkLocations = (chapter_id) => ({
  type: constants.SET_BOOKMARK_LOCATIONS, payload: {chapter: chapter_id}
});

export const setBookmarkOffered = (bool) => ({
  type: constants.SET_BOOKMARK_OFFERED, payload: {prompt_shown: bool}
});