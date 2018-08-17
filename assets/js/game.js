(function () {
    var config={
        type:Phaser.AUTO,
        width:800,
        height:600,
        scene:{
            preload:preload,
            create:create,
            update:update
        }
    };
    console.log(Phaser);
    var game = new Phaser.Game(config);
    function preload(){
        this.load.image('sky','assets/images/sky.png');
        this.load.image('star','assets/images/star.png');
    }
    function create(){
        //Phaser positioniert immer in der Mitte des Bildschirms ...
        
        this.add.image(400,300,'sky');        
        this.add.image(400,300,'star');
    }
    function update(){
        
    }
})();