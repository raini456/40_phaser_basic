(function () {
    var platforms, player, cursors;
    var config={
        //Phaser.AUTO sucht automatisch, ob Browser 2-D oder 3-D darstellt
        type:Phaser.AUTO,
        width:800,
        height:600,
        //physics definiert die Eigenschaften des Spielobjektes, in dem Fall dem 'dude'
        physics:{
            default:'arcade',
                arcade:{
                    //regelt die Anziehung des Spielers an den Boden
                    gravity:{y:300},
                    debug:false
                }
        },
        scene:{
            preload:preload,
            create:create,
            //update lädt immer wieder
            update:update
        }
    };
    console.log(Phaser);
    //neues Phaser-Objekt
    var game = new Phaser.Game(config);
    function preload() {
        this.load.image('sky', 'assets/images/sky.png');
        this.load.image('star', 'assets/images/star.png');
        //this.load.image('cat', 'assets/images/cat.png');
        this.load.image('ground', 'assets/images/platform.png');
        this.load.image('bomb', 'assets/images/bomb.png');
        this.load.spritesheet('dude', "assets/images/dude.png", {
            frameWidth: 32,
            frameHeight: 48
        });
    }
    function create() {
        //Phaser positioniert immer in der Mitte des Bildschirms ...

        this.add.image(400, 300, 'sky');
        //this.add.image(300,200, 'cat');       
        platforms = this.physics.add.staticGroup();
        this.add.image(40, 250, 'bomb');
        this.add.image(150, 140, 'dude');
        this.add.image(400,300,'star');//es wird eine Gruppe von Platformen erstellt, auf denen Aktionen stattfinden können
        platforms.create(400, 128, 'ground').setScale(2).refreshBody();
        platforms.create(600, 400, 'ground');
        platforms.create(400, 568, 'ground').setScale(2.6).refreshBody();
        platforms.create(50, 249, 'ground').setScale(1.5).refreshBody();
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
        key:'turn',
        frames:[{key:'dude', fame:4}],
        frameRate:20
    });
    this.physics.add.collider(player, platforms);
    cursors = this.input.keyboard.createCursorKeys();
    }
    function update(){
       if(cursors.left.isDown){           
        player.setVelocityX(-160);
        player.anims.play('left', true);
       } 
    }
})();