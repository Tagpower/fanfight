//Constants
var MAX_CDR = 50;
var PLAYER_SPEED = 150;



// State
var preload = function(game) {
   console.log("Preloading...");
   Phaser.State.call(this);
}

preload.prototype = Object.create(Phaser.State);
preload.prototype.constructor = preload;

preload.prototype = {
   preload: function() {

      var loadingBar = this.game.add.sprite(game.world.centerX, 400, "loading");
      this.load.setPreloadSprite(loadingBar, 0);

      var text_loading = self.game.add.text(self.game.world.centerX, 350, '', {font: '12px 8bitoperator', fill: '#ffffff', align: 'center'});
      text_loading.smoothed = false;
      text_loading.anchor.setTo(0.5);

      var loading_strings = ["Finissage des sprites",
                             "C'est les musiques qui mettent longtemps",
                             "Deux secondes",
                             "Auto-réparation du code",
                             "Suppression de commentaires grossiers",
                             "Un p'tit verre en attendant ?",
                             "Traînage sur reddit",
                             "OH MON DIEU UN JOUEUR VITE GROUILLE-TOI DE CHARGER !",
                             "Obtention d'un Master",
                             "Ne jouez pas à ça en amphi les enfants",
                             "Écriture d'un algo génétique",
                             "Apprentissage du Javascript"];

      text_loading.text = loading_strings[this.game.rnd.integerInRange(0, loading_strings.length-1)] + '...';

      var tween_fade = game.add.tween(text_loading).to( { alpha: 0.2}, 500, Phaser.Easing.Linear.In, true, 0 , -1);
      tween_fade.yoyo(true, 0);

      //Images
      this.game.load.image('heart', 'assets/heart.png');
      this.game.load.image('btn_fight', 'assets/fight.png');
      this.game.load.image('btn_act', 'assets/act.png');
      this.game.load.image('btn_item', 'assets/item.png');
      this.game.load.image('btn_mercy', 'assets/mercy.png');

      //Spritesheets
      this.game.load.spritesheet('bouli', 'assets/bouli.png', 96, 100);
      this.game.load.spritesheet('boulihard', 'assets/bouli2.png', 96, 100);

      //Music
      this.game.load.audio('ambient', 'assets/audio/friends.mp3');

      //Sounds
      this.game.load.audio('text', 'assets/audio/voice_text.wav');

   },
   create: function() {
      console.log("-*- Preloaded -*-");
      this.game.stateTransition.to("Game");
   }
}
