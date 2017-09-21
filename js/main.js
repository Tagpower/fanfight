var game = new Phaser.Game(800, 600, Phaser.AUTO, 'contentor');

game.state.add("Boot", boot);
game.state.add("Preload", preload);
//game.state.add("GameTitle", gameTitle);
game.state.add("Game", fight);
game.state.add("GameOver", gameOver);

game.state.start("Boot");
