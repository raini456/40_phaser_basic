(function () {
    
    var platforms, player, cursors, stars, bombs, death, meow;
    var score = 0;
    var scoreText;
    var config = {
        //Phaser.AUTO sucht automatisch, ob Browser 2-D oder 3-D darstellt
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        //physics definiert die Eigenschaften des Spielobjektes, in dem Fall dem 'dude'
        physics: {
            default: 'arcade',
            arcade: {
                //regelt die Anziehung des Spielers an den Boden
                gravity: {y: 300},
                debug: false
            }
        },
        scene: {
            preload:preload,
            create:create,
            update:update
            
        }
    };
    console.log(Phaser);
    //neues Phaser-Objekt
    var game = new Phaser.Game(config);
    function preload() {
        this.load.image('backyard', 'assets/images/backyard.jpg');
        this.load.image('sky', 'assets/images/sky.png');
        this.load.image('star', 'assets/images/star.png');
        //this.load.image('cat', 'assets/images/cat.png');
        this.load.image('ground', 'assets/images/platform.png');
        this.load.image('bomb', 'assets/images/bomb.png');
        this.load.spritesheet('dude', "assets/images/dude.png", {
            frameWidth: 32,
            frameHeight: 48
        });  
        this.load.audioSprite('sfx', 
            'assets/audio/fx_mixdown.json', 
            [
            'assets/audio/fx_mixdown.ogg',
            'assets/audio/fx_mixdown.mp3'
            ]
        );
        //death = this.sound.playAudioSprite('sfx', 'death');
        //meow = this.sound.playAudioSprite('sfx', 'meow');
        
    }
    function create() {
        //Phaser positioniert immer in der Mitte des Bildschirms ...
        this.add.image(400, 300, 'backyard');
        //this.add.image(400, 300, 'sky');
        //this.add.image(300,200, 'cat');       
        platforms = this.physics.add.staticGroup();        
        //es wird eine Gruppe von Platformen erstellt, auf denen Aktionen stattfinden können
        platforms.create(10, 128, 'ground').setScale(1.3).refreshBody();
        platforms.create(740, 249, 'ground').refreshBody();
        platforms.create(589, 400, 'ground');
        platforms.create(400, 568, 'ground').setScale(2.6).refreshBody();
        //fügt dem Canvas den Spieler hinzu
        player = this.physics.add.sprite(100, 50, 'dude');
        //setBounce regelt das Aufkommen auf dem Rahmen
        player.setBounce(0.6);
        //setzt den Rahmen des Canvas als Maßstab der Bewegungsmöglichkeit
        player.setCollideWorldBounds(true);
        //Definiert die Animation des Spiels, this ist hier das Spiel selbt
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', {
                start: 0,
                end: 3
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', {
                start: 5,
                end: 8
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [{key: 'dude', frame: 4}],
            frameRate: 20
        });
        this.physics.add.collider(player, platforms);
        cursors = this.input.keyboard.createCursorKeys();
        stars = this.physics.add.group({
            key: 'star',
            repeat: 15,
            setXY: {x: 10, y: 10, stepX: 50}
        });
        stars.children.iterate(function(child){
            child.setBounceY(Phaser.Math.FloatBetween(0.2,0.8));
        });
        this.physics.add.collider(stars, platforms);
        this.physics.add.overlap(player,stars,collectStar, null, this);
        scoreText = this.add.text(250,20,'Points: 0',{            
            fontSize:'40px',
            fill:'whitesmoke'
        });
        bombs=this.physics.add.group();
        
        /*{
            key: 'bomb',
            repeat: 3,
            setXY: {x: 30, y: 12, stepX: 112}
        }*/
        this.physics.add.collider(bombs, platforms);
        this.physics.add.overlap(player, bombs, bumm, null, this);
    }
    
        
    function bumm(player, bomb){
        player.setTint(0xff0000);//.clearTint ist die Gegenfunktion
        this.physics.pause();
        bomb.disableBody(true,true);
        player.anims.play('turn');   
        death;
    }
    function collectStar(player, star){
        //1. true macht das Objekt nicht mehr ansprechbar, 2. true lässt es verschwinden
        meow;
        star.disableBody(true, true);
        score +=1;
        scoreText.setText('Points: '+score);
        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(0.1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;
        
        
        //Möglich auch (true, false) oder auch (false, true) oder (false, false)
    }
    function update(){       
       if(cursors.left.isDown){           
        player.setVelocityX(-160);
        player.anims.play('left', true);
       }
       else if(cursors.right.isDown){
           player.setVelocityX(160);
           player.anims.play('right', true);
       }
       else{
           player.setVelocityX(0);
           player.anims.play('turn', true);
       }
       if(cursors.up.isDown && player.body.touching.down){           
        player.setVelocityY(-330);
        //player.anims.play('left', true);
       }
    }    
})();