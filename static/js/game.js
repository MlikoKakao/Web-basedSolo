function attack() {
    fetch("/attack", { method: "POST" })
        .then(response => response.json())
        .then(data => {
            document.getElementById("enemy-hp").textContent = data.enemy_hp;
            document.getElementById("damageNotif").textContent = `You hit for ${data.dmg} damage!`;
            let enemyHealth = document.getElementById("enemyHPBar")
            enemyHealth.value = data.enemy_hp;


            if (data.turn === "enemy") {
                 setTimeout(() => {
                       fetch("/enemy_turn", { method: "POST" })
                             .then(res => res.json())
                             .then(enemyData => {
                                    document.getElementById("playerHP").textContent = `Your HP: ${enemyData.player_hp}`;
                             });
                       }, 500);
                 }
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
setInterval(() => {
    const sprite = document.getElementById("enemy-sprite");
    sprite.style.backgroundPosition = `-${idleFrame * 192}px 0`;
    idleFrame = (idleFrame + 1) % 3;
}, 200);
