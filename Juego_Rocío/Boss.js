class Boss extends Opponent {
    constructor(game) {
        const height = OPPONENT_HEIGHT * game.width / 100;
        const width = OPPONENT_WIDTH * game.width / 100;
        const x = getRandomNumber(game.width - width / 2);
        const y = 0;

        super(game, width, height, x, y);

        this.myImage = "assets/jefe.png";
        this.myImageDead = "assets/jefe_muerto.png";
        this.speed = OPPONENT_SPEED * 2; // Velocidad del jefe es el doble de un oponente normal
        this.health = 2;

        // Configurar las imágenes del jefe
        this.image.src = this.myImage;
    }

    collide() {
        if (!this.dead) {
            if (!this.killedOnce) {
                // Mostrar "You Win" al eliminar al jefe una sola vez
                setTimeout(() => {
                    let youWinImage = new Entity(this.game, this.game.width / 2, "auto", this.game.width / 4, this.game.height / 4, 0, "assets/you_win.png");
                    youWinImage.render();
                    this.game.endGame(); // Finalizar el juego al eliminar al jefe
                }, 2000);

                this.killedOnce = true; // Marcar que el jefe ha sido eliminado al menos una vez
            }

            super.collide(); // Llama al método de la clase padre para realizar otras operaciones si es necesario
        }
    }
}
