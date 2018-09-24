// define variables
var game;
var player;
var platforms;
var badges;
var items;
var cursors;
var jumpButton;
var text;
var winningMessage;
var won = false;
var currentScore = 0;
var winningScore = 50;

// add collectable items to the game
function addItems() {
  items = game.add.physicsGroup();
  createItem(150, 450, 'coin');
  createItem(550, 450, 'coin');
  createItem(350, 350, 'coin');
  createItem(500, 250, 'coin');
  createItem(700, 200, 'coin');
  createItem(150, 200, 'coin');
  createItem(250, 150, 'coin');
  createItem(550, 100, 'coin');
  createItem(200, 50, 'coin');
  createItem(370, 500, 'poison');
  createItem(100, 375, 'poison');
  createItem(125, 50, 'star');

}

// add platforms to the game
function addPlatforms() {
  platforms = game.add.physicsGroup();
  platforms.create(100, 500, 'platform');
  platforms.create(500, 500, 'platform');
  platforms.create(300, 400, 'platform_2');
  platforms.create(450, 300, 'platform_2');
  platforms.create(650, 250, 'platform');
  platforms.create(100, 250, 'platform');
  platforms.create(200, 200, 'platform');
  platforms.create(500, 150, 'platform_2');
  platforms.create(150, 100, 'platform_2');
  platforms.setAll('body.immovable', true);
}

// create a single animated item and add to screen
function createItem(left, top, image) {
  var item = items.create(left, top, image);
  item.animations.add('spin');
  item.animations.play('spin', 10, true);
}

// create the winning badge and add to screen
function createBadge() {
  badges = game.add.physicsGroup();
  var badge = badges.create(750, 400, 'badge');
  badge.animations.add('spin');
  badge.animations.play('spin', 10, true);
}

// when the player collects an item on the screen
function itemHandler(player, item) {
  item.kill();
  if(item.key=='poison'){
    currentScore=currentScore-10;
  }else{
    currentScore = currentScore + 10;
  }
  if (currentScore === winningScore) {
      createBadge();
  }
}

// when the player collects the badge at the end of the game
function badgeHandler(player, badge) {
  badge.kill();
  won = true;
}

// setup game when the web page loads
window.onload = function () {
  game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
  
  // before the game begins
  function preload() {
  game.stage.backgroundColor = '#68a5e2';

    
    //Load images
    game.load.image('platform', 'platform_1.png');
    game.load.image('platform_2', 'platform_2.png');
    game.load.image('poison', 'poison.png');
    game.load.image('star', 'star.png');
    
    //Load spritesheets
    game.load.spritesheet('player', 'ash.png', 40, 57);
    game.load.spritesheet('coin', 'coin.png', 36, 44);
    game.load.spritesheet('poison', 'poison.png', 32, 32);
    game.load.spritesheet('star', 'star.png', 32, 32);
    game.load.spritesheet('badge', 'badge.png', 42, 54);
  }

  // initial game set up
  function create() {
    player = game.add.sprite(50, 600, 'player');
    player.animations.add('walk');
    player.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 500;

    addItems();
    addPlatforms();

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    text = game.add.text(16, 16, "SCORE: " + currentScore, { font: "bold 24px Arial", fill: "white" });
    winningMessage = game.add.text(game.world.centerX, 275, "", { font: "bold 48px Arial", fill: "white" });
    winningMessage.anchor.setTo(0.5, 1);
  }

  // while the game is running
  function update() {
    text.text = "SCORE: " + currentScore;
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, items, itemHandler);
    game.physics.arcade.overlap(player, badges, badgeHandler);
    player.body.velocity.x = 0;

    // is the left cursor key presssed?
    if (cursors.left.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = -300;
      player.scale.x = - 1;
    }
    // is the right cursor key pressed?
    else if (cursors.right.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = 300;
      player.scale.x = 1;
    }
    // player doesn't move
    else {
      player.animations.stop();
    }
    
    if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down)) {
      player.body.velocity.y = -400;
    }
    // when the player winw the game
    if (won) {
      winningMessage.text = "YOU WIN!!!";
    }
  }

  function render() {

  }

};
