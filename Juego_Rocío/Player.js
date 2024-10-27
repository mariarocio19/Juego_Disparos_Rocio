/**
 * Personaje principal del juego. Hereda de la clase Character.
 * @extends Character
 */
class Player extends Character {
    constructor(game) {
        const height = PLAYER_HEIGHT * game.width / 100,
            width = PLAYER_WIDTH * game.width / 100,
            x = game.width / 2 - width / 2,
            y = game.height - height,
            speed = PLAYER_SPEED,
            myImage = PLAYER_PICTURE,
            myImageDead = PLAYER_PICTURE_DEAD;

        // Añadido nuevo atributo 'lives'
        const lives = PLAYER_INITIAL_LIVES;
        
        super(game, width, height, x, y, speed, myImage, myImageDead);
        this.lives = lives;
    }

    update() {
        if (!this.dead) {
            switch (this.game.keyPressed) {
                case KEY_LEFT:
                    if (this.x > this.speed) {
                        this.x -= this.speed;
                    }
                    break;
                case KEY_RIGHT:
                    if (this.x < this.game.width - this.width - this.speed) {
                        this.x += this.speed;
                    }
                    break;
                case KEY_SHOOT:
                    this.game.shoot(this);
                    break;
            }
        }
    }

    collide() {
        if (!this.dead) {
            // Modificación para restar una vida al jugador al ser alcanzado por un disparo
            this.lives--;

            if (this.lives > 0) {
                // Si el jugador tiene vidas restantes, morir temporalmente y renacer después
                super.collide();
                setTimeout(() => {
                    this.image.src = this.myImage;
                    this.dead = false;
                }, 2000);
            } else {
                // Si el jugador no tiene vidas restantes, morir definitivamente y terminar el juego
                setTimeout(() => {
                    this.game.endGame();
                }, 2000);
                super.collide();
            }

            // Actualizar el contador de vidas en la pantalla
            this.updateLives();
        }
    }

    /**
     * Actualiza el contador de vidas en la pantalla
     */
    updateLives() {
        document.getElementById("livesli").innerHTML = `Lives: ${this.lives}`;
    }
}
