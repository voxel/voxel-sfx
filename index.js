
module.exports = function(game, opts) {
  return new SfxPlugin(game, opts);
};

module.exports.pluginInfo = {
  clientOnly: true,
  loadAfter: ['voxel-health']
};

function SfxPlugin(game, opts) {
  this.game = game;

  this.enable();
}

SfxPlugin.prototype.enable = function() {
  var self = this;

  this.healthPlugin = this.game.plugins.get('voxel-health');
  if (this.healthPlugin) {
    this.healthPlugin.on('hurt', this.onHurt = function() {
      self.play('damage/fallsmall');
    });
  }
};

SfxPlugin.prototype.disable = function() {
  if (this.healthPlugin) 
    this.healthPlugin.removeListener('hurt', this.onHurt);
};

SfxPlugin.prototype.play = function(name) {
  console.log('TODO: play ',name);
};
