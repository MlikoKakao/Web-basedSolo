let gameState = "combat";

function applyEnemyTurn() {
    setTimeout(() => {
        fetch("/enemy_turn", { method: "POST" })
            .then(res => res.json())
            .then(data => {
                const playerHp = data.player_hp;
                document.getElementById("playerHP").textContent = `Your HP: ${playerHp}`;
                document.getElementById("playerHPBar").value = playerHp;
            });
    }, 500);
}

function handleEnemyDeath() {
    gameState = "levelup";
    const sprite = document.getElementById("enemy-sprite");
    sprite.style.backgroundImage = 'url("/static/sprites/skeleDeath.png")';
    sprite.style.backgroundPosition = "0px 0px";

    setTimeout(() => {
        document.getElementById("damageNotif").textContent = "Enemy defeated!";
        document.getElementById("levelup-menu").classList.remove("hidden");
    }, 2000);
}

function attack() {
    if (gameState !== "combat") return;
    fetch("/attack", { method: "POST" })
        .then(response => response.json())
        .then(data => {
            const enemyHp = data.enemy_hp;
            const enemyDead = data.enemy_dead;

            document.getElementById("enemy-hp").textContent = enemyHp;
            document.getElementById("damageNotif").textContent = `You hit for ${data.dmg} damage!`;
            document.getElementById("enemyHPBar").value = enemyHp;

            const sprite = document.getElementById("enemy-sprite");
            idlePaused = true;
            sprite.style.width = "260px";
            sprite.style.height = "520px";
            sprite.style.backgroundPosition = "0px -450px";

            if (enemyDead) {
                handleEnemyDeath();
                return;
            }

            setTimeout(() => {
                idlePaused = false;
                idleFrame = 0;
                sprite.style.width = "220px";
                sprite.style.height = "440px";
                if (data.turn === "enemy") {
                    idlePaused = true;
                    sprite.style.backgroundPosition = "-720px -450px";
                    sprite.style.width = "400px";
                    setTimeout(() => applyEnemyTurn(), 300);
                    setTimeout(() => {
                        idlePaused = false;
                        idleFrame = 0;
                        sprite.style.backgroundPosition = "0px 0";
                        setTimeout(() => {
                            sprite.style.width = "220px";
                            sprite.style.height = "440px";
                        }, 100);
                    }, 600);
                }
            }, 1000);
        });
}

function fireball() {
    if (gameState !== "combat") return;
    fetch("/fireball", { method: "POST" })
        .then(response => response.json())
        .then(data => {
            const enemyHp = data.enemy_hp;
            const enemyDead = data.enemy_dead;
            const fillRatio = enemyHp / 100;

            document.getElementById("enemy-hp").textContent = enemyHp;
            document.getElementById("damageNotif").textContent = `Fireball hit for ${data.dmg} damage!`;
            document.getElementById("enemyHPBar").value = enemyHp;
            document.getElementById("hp-fill").style.transform = `scaleX(${fillRatio})`;

            const sprite = document.getElementById("enemy-sprite");
            idlePaused = true;
            sprite.style.width = "260px";
            sprite.style.height = "520px";
            sprite.style.backgroundPosition = "0px -450px";

            if (enemyDead) {
                handleEnemyDeath();
                return;
            }

            setTimeout(() => {
                idlePaused = false;
                idleFrame = 0;
                sprite.style.width = "220px";
                sprite.style.height = "440px";
                if (data.turn === "enemy") {
                    idlePaused = true;
                    sprite.style.backgroundPosition = "-720px -450px";
                    sprite.style.width = "400px";
                    setTimeout(() => applyEnemyTurn(), 300);
                    setTimeout(() => {
                        idlePaused = false;
                        idleFrame = 0;
                        sprite.style.backgroundPosition = "0px 0";
                        setTimeout(() => {
                            sprite.style.width = "220px";
                            sprite.style.height = "440px";
                        }, 100);
                    }, 600);
                }
            }, 1000);
        });
}

function heal() {
    if (gameState !== "combat") return;
    fetch("/heal", { method: "POST" })
        .then(response => response.json())
        .then(data => {
            const playerHp = data.player_hp;
            const healAmount = data.heal_amount;
            document.getElementById("playerHP").textContent = `Your HP: ${playerHp}`;
            document.getElementById("playerHPBar").value = playerHp;
            document.getElementById("damageNotif").textContent = `You healed for ${healAmount} HP!`;

            if (data.turn === "enemy") {
                applyEnemyTurn();
            }
        });
}

let idleFrame = 0;
let idlePaused = false;

setInterval(() => {
    if (idlePaused) return;
    const sprite = document.getElementById("enemy-sprite");
    sprite.style.backgroundPosition = `-${idleFrame * 790}px 0`;
    idleFrame = (idleFrame + 1) % 2;
}, 500);

fetch("/state")
    .then(res => res.json())
    .then(data => {
        const maxHp = data.player_max_hp;
        document.getElementById("playerHPBar").max = maxHp;
        document.getElementById("playerHPBar").value = data.player_hp;
        document.getElementById("playerHP").textContent = `Your HP: ${data.player_hp}`;
    });
