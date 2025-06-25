function attack() {
    fetch("/attack", { method: "POST" })
        .then(response => response.json())
        .then(data => {
            document.getElementById("enemy-hp").textContent = data.enemy_hp;
            document.getElementById("damageNotif").textContent = `You hit for ${data.dmg} damage!`;
            let enemyHealth = document.getElementById("enemyHPBar")
            enemyHealth.value = data.enemy_hp;
        });
}

function fireball(){
    fetch("/fireball", {method:"POST"})
        .then(response => response.json())
        .then(data => {
            const currentHP = data.enemy_hp;
                const maxHP = data.enemy_max_hp || 100;
                const fullBarWidth = 270;

                document.getElementById("enemy-hp").textContent = currentHP;
                document.getElementById("damageNotif").textContent = `Fireball hit for ${data.dmg} damage!`;
                document.getElementById("enemyHPBar").value = currentHP;

                const newWidthPx = (currentHP / maxHP) * fullBarWidth;
                const hpFill = document.getElementById("hp-fill");
                hpFill.style.width = newWidthPx + "px";
            })
}

function updateHP(percent) {
    const hpFill = document.querySelector('.hp-fill');
    hpFill.style.width = percent + '%';
}
