'use strict';

var play_audio = require('play-audio');

module.exports = function(game, opts) {
  return new SfxPlugin(game, opts);
};

module.exports.pluginInfo = {
  clientOnly: true,
  loadAfter: ['voxel-health', 'voxel-harvest', 'voxel-registry']
};

function SfxPlugin(game, opts) {
  this.game = game;

  this.artPacks = this.game.materials.artPacks;
  if (!this.artPacks) throw new Error('voxel-sfx requires game.materials to support artPacks (try voxel-texture-shader)');

  this.registry = game.plugins.get('voxel-registry');

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

  this.harvestPlugin = this.game.plugins.get('voxel-harvest');
  if (this.harvestPlugin && this.registry) {
    this.harvestPlugin.on('harvested', this.onHarvested = function(event) {
      var blockName = self.registry.getBlockName(event.target.value);
      var harvestSound = self.registry.getProp(blockName, 'harvestSound');
      if (harvestSound) self.play(harvestSound);
    });
  }
};

SfxPlugin.prototype.disable = function() {
  if (this.healthPlugin) this.healthPlugin.removeListener('hurt', this.onHurt);
  if (this.harvestPlugin) this.harvestPlugin.removeListener('harvested', this.onHarvested);
};

SfxPlugin.prototype.play = function(name) {
  var url = this.artPacks.getSound(name);
  if (!url) return false;

  console.log('Playing sound',name,url);

  play_audio(url).autoplay();
};
