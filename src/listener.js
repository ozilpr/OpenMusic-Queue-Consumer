class Listener {
  constructor(playlistsService, mailSender) {
    this._playlistService = playlistsService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }
 
  async listen(message) {
    try {
      const { id, targetEmail } = JSON.parse(message.content.toString());
      
      const notes = await this._playlistService.getPlaylists(id);
      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(notes));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
