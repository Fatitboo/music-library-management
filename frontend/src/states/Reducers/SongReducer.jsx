import {
  PLAY_SONG_REQUEST,
  PAUSE_SONG_REQUEST,
  PLAY_MASTER,
  PAUSE_MASTER,
  // SEARCH_MASTER,
} from "../Contants/SongConstant";
export const songReducer = (
  state = { masterSong: {}, isPlaying: false, playlists: [], tracks: [] },
  action
) => {
  switch (action.type) {
    case PLAY_SONG_REQUEST:
      return { ...state, masterSong: action.payload, isPlaying: true };
    case PAUSE_SONG_REQUEST:
      return { ...state, isPlaying: false };
    case PLAY_MASTER:
      return { ...state, isPlaying: true };
    case PAUSE_MASTER:
      return { ...state, isPlaying: false };
    // case SEARCH_MASTER:
    //     return { ...state, p };
    default:
      return state;
  }
};
