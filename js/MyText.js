var MyText = function (game, x,y, string, style, delay_char=60, sound) {

   Phaser.Text.call(this, game, x, y, "", style);

   this.game.add.existing(this);
   this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
   this.delay_char = delay_char;
   this.sound = sound;
   this.targetstring = string;
   
   var chars = [];
   var wordIndex = 0;
   this.create()
};

MyText.prototype = Object.create(Phaser.Text.prototype);
MyText.prototype.constructor = MyText;

MyText.prototype.create = function() {

    this.game.add.text(this.x, this.y, '', this.style);

    //  Split the current line on spaces, so one word per array element
    chars = this.targetstring.split('');

    //  Reset the word index to zero (the first word in the line)
    wordIndex = 0;

    game.time.events.repeat(this.delay_char, chars.length, this.nextChar, this);

}

MyText.prototype.nextChar = function() {
   if (chars[wordIndex] !== ' ' && chars[wordIndex] !== ',' && chars[wordIndex] !== '.' && this.sound != null) {
        this.sound.play()
    }
    //  Add the next word onto the text string, followed by a space
    this.text = this.text.concat(chars[wordIndex]);

    //  Advance the word index to the next word in the line
    wordIndex++;
}