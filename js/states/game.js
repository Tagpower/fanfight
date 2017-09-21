var fight = function(game) { 
   Phaser.State.call(this);
}

fight.prototype = Object.create(Phaser.State);
fight.prototype.constructor = fight;

fight.prototype = {
   // {{{ INIT
   init: function(config) {
      var self = this;
      console.log("Running the game...");
      console.log(self.config);

      self.READY = false;
   },
   // }}}
   // {{{ CREATE
   create: function() {
      var self = this;
      //Create the background

      //self.background = game.add.tileSprite(0, 0, game.width, game.height, 'space');
      //self.background.tint = (difficulty == OHGOD ? 0xff1111 : 0x3355ee);


      //self.enemies = self.game.add.physicsGroup();


      //All inputs
      self.cursors = self.game.input.keyboard.createCursorKeys();
      self.action_btn = self.game.input.keyboard.addKey(Phaser.Keyboard.Z);
      self.cancel_btn = self.game.input.keyboard.addKey(Phaser.Keyboard.X);

      //mute_btn.onUp.add(muteGame, self)
      //self.pause_btn.onDown.add(self.pauseGame, self);

      //Ingame Text
      var style_white = {font: '20px 8bitoperator', fill:'#ffffff'};

      /*
      self.game.add.sprite(20, 29, 'powerups', 12);
      self.game.add.sprite(64, 29, 'powerups', 39);
      self.game.add.sprite(108, 29, 'powerups', 7);
      self.game.add.sprite(152, 29, 'powerups', 27);
      */

      self.player = self.game.add.sprite(400, 500, 'heart')
      self.game.physics.arcade.enable(self.player);

      self.cursor = self.game.add.sprite(-10,-10, 'heart')
      self.cursor.anchor.setTo(0.5,0.5)

      self.bouli = self.game.add.sprite(400, 250, 'bouli')
      self.bouli.animations.add('float', [0,1,2,3], 4, true)
      self.bouli.animations.play('float')
      self.bouli.anchor.setTo(0.5,0.5);

      self.btn_fight = self.game.add.sprite(125,500, 'btn_fight')
      self.btn_act = self.game.add.sprite(275,500, 'btn_act')
      self.btn_item = self.game.add.sprite(425,500, 'btn_item')
      self.btn_mercy = self.game.add.sprite(575,500, 'btn_mercy')

      self.music = self.game.add.audio('ambient');
      self.music.loop = true;
      self.music.play();

      //Create all sounds
      //self.pickup_sd = self.game.add.audio('pickup');
      //self.pickup_sd.volume = 0.5;
      //self.game.saveCpu.renderOnFPS = 60;
      self.READY = true;
   },

   // }}}
   // {{{ UPDATE
   update: function() {
      var self = this;
      if (self.READY) {
      

         //Check collisions for everything
         //self.game.physics.arcade.collide(self.weapon, self.enemies, self.hitEnemy, null, self);
         //self.game.physics.arcade.collide(self.player, self.enemies, self.playerHit, function() {return self.shield_time == 0 && !self.lostAlife;}, self);

         //All controls are disabled when the player dies

            //Control the player
            self.player.body.velocity.x = 0;
            self.player.body.velocity.y = 0;
            //if (!player.touched) {
            //player.body.velocity.y = 0; 
            //};
            if (self.cursors.up.isDown) {
               self.player.body.velocity.y = -PLAYER_SPEED;
               self.player.body.velocity.x = 0; 
               //player.animations.play('left');
            } else if (self.cursors.down.isDown) {
               self.player.body.velocity.y = PLAYER_SPEED;
               self.player.body.velocity.x = 0; 
               //player.animations.play('right');
            }

            if (self.cursors.left.isDown) {
               self.player.body.velocity.x = -PLAYER_SPEED;
               //player.body.velocity.y = 0; 
            } else if (self.cursors.right.isDown) {
               self.player.body.velocity.x = PLAYER_SPEED;
               //player.body.velocity.y = 0; 
            } 

         /*//Move the enemies
         self.enemies.forEachAlive(function(enemy){
            if (self.left) {
               self.enemies.setAll('body.velocity.x', -self.speed);   
            } else {
               self.enemies.setAll('body.velocity.x', self.speed);               
            }
            if (enemy.body.position.x < 10) {
               self.left = false;
               if (!self.in_boss_level) {
                  self.enemies.addAll('body.position.x', 10);        
                  self.enemies.addAll('body.position.y', enemy.body.height);      
               }
            } else if (enemy.body.position.x >= self.game.world.width - 25) {
               self.left = true;
               if (!self.in_boss_level) {
                  self.enemies.addAll('body.position.x', -10);
                  self.enemies.addAll('body.position.y', enemy.body.height);
               }
            }

         });
         */

      }
   },
   // }}}

   // {{{ CREATEPLAYER
   createPlayer: function() {
      var self = this;
      self.player = self.game.add.sprite(self.init_x,self.init_y,'heart');
      self.game.physics.arcade.enable(self.player);

      self.player.body.collideWorldBounds = true;
      self.player.body.immovable = false;
      self.touched = false;

      self.player.anchor.setTo(0.5,0.5);

      //self.player.animations.add('idle', [0,1],6,true);
      //self.player.animations.add('hit', [2,3],6,true);

   },
   // }}}


   // {{{ HITENEMY
   // When an enemy is hit by a player shot or an explosion
   hitEnemy: function(shot, enemy) {
      var self = this;
      var amount = shot.power;

      if (shot.key != 'explosion')  {
         shot.kill();
      }

      enemy.damage(amount);

      if (enemy.alive && !self.mute) {
         self.hitenemy_sd.play();
      }
   },
   // }}}


   // {{{ PLAYERHIT
   // When the player is hit by enemy fire or an enemy 
   playerHit: function(player, shot) {
      var self = this;
      shot.kill();
      
   },
   // }}}

   gameOver: function() {
      var self = this;

      //this.game.state.start("GameOver");
   }

}
