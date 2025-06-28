function attack() {
    fetch("/attack", { method: "POST" })
        .then(response => response.json())
        .then(data => {
            document.getElementById("enemy-hp").textContent = data.enemy_hp;
            document.getElementById("damageNotif").textContent = `You hit for ${data.dmg} damage!`;
            let enemyHealth = document.getElementById("enemyHPBar")
            enemyHealth.value = data.enemy_hp;
             const sprite = document.getElementById("enemy-sprite");
             idlePaused = true;
             sprite.style.width = "260px";
             sprite.style.height = "520px";

             sprite.style.backgroundPosition = "0px -450px";
            if (data.enemy_dead) {
                const sprite = document.getElementById("enemy-sprite");
                idlePaused = true;
                sprite.style.backgroundImage = 'url("/static/sprites/skeleDeath.png")';
                sprite.style.backgroundPosition = "0px 0px";
                setTimeout(() => {
                    sprite.style.backgroundPosition = "0px -290px";
                },500)


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

                 setTimeout(() => {
                       fetch("/enemy_turn", { method: "POST" })
                             .then(res => res.json())
                             .then(enemyData => {
                                    document.getElementById("playerHP").textContent = `Your HP: ${enemyData.player_hp}`;
                             });
                       }, 300);
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

function fireball(){
    fetch("/fireball", {method:"POST"})
        .then(response => response.json())
        .then(data => {
                const currentHP = data.enemy_hp;
                const maxHP = data.enemy_max_hp || 100;
                const fillRatio = currentHP / maxHP;

                document.getElementById("enemy-hp").textContent = currentHP;
                document.getElementById("damageNotif").textContent = `Fireball hit for ${data.dmg} damage!`;
                document.getElementById("enemyHPBar").value = currentHP;

                document.getElementById("hp-fill").style.transform = `scaleX(${fillRatio})`;

                 if (data.turn === "enemy") {
                    setTimeout(() => {
                        fetch("/enemy_turn", { method: "POST" })
                            .then(res => res.json())
                            .then(enemyData => {
                                document.getElementById("playerHP").textContent = `Your HP: ${enemyData.player_hp}`;
                                document.getElementById("playerHPBar").value = enemyData.player_hp;
                            });
                    }, 500);
                }
            });
    }
let idleFrame = 0;
let idlePaused = false;

setInterval(() => {
    if (idlePaused) return;

    const sprite = document.getElementById("enemy-sprite");
    sprite.style.backgroundPosition = `-${idleFrame*790}px 0`;
    idleFrame = (idleFrame + 1) % 2;
}, 500);
