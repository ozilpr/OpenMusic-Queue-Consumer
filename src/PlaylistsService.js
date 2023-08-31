const { Pool } = require('pg');
 
class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylists(id) {

    console.log(id)
    const qPlaylist = {
      text: `SELECT playlists.id, playlists.name FROM playlist_songs
      LEFT JOIN playlists ON playlist_songs.playlist_id = playlists.id
      JOIN songs ON playlist_songs.song_id = songs.id
      WHERE playlists.id = $1
      GROUP BY playlists.id, songs.id`,
      values: [id],
    };

    const qSongs = {
      text: `SELECT songs.id, songs.title, songs.performer FROM playlist_songs
      LEFT JOIN playlists ON playlist_songs.playlist_id = playlists.id
      JOIN songs ON playlist_songs.song_id = songs.id
      WHERE playlists.id = $1
      GROUP BY playlists.id, songs.id, playlist_songs.id`,
      values: [id],
    };

    const resultPlaylist = await this._pool.query(qPlaylist);
    const resultSongs = await this._pool.query(qSongs);

    const playlist = resultPlaylist.rows[0]
    const songs = resultSongs.rows;

    const content = { 
      playlist: {
        id: playlist.id,
        name: playlist.name,
        songs: songs,
      }
    };

    console.log(content)
    
    return content;
  }
}

module.exports = PlaylistsService;
