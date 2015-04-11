# voxel-sfx

Play sound effects on events (voxel.js plugin)

Currently integrates with:

* [voxel-health](https://github.com/deathcap/voxel-health): plays hurt sound on damage

Requires [artpacks](https://github.com/deathcap/artpacks) to be available in `game.materials`,
such as via [voxel-texture-shader](https://github.com/deathcap/voxel-texture-shader).
Needs a resource pack with sound (example: [ProgrammerArt](https://github.com/deathcap/ProgrammerArt)
2.2-dev+).

## API

    var sfx = game.plugins.get('voxel-sfx');

    sfx.play(name[, loop[, url]]);

* name: name of the sound for artpacks lookup
* loop: if true, continuously repeat the sound
* url: URL of the sound to play, overrides artpacks URL resolution

Example:

    sfx.play('damage/fallsmall');

## License

MIT

