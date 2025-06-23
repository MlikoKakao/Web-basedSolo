function attack() {
    fetch("/attack", { method: "POST" })
        .then(response => response.json())
        .then(data => {
            document.getElementById("enemy-hp").textContent = data.enemy_hp;
            document.getElementById("attackBut").textContent = `You hit for ${data.dmg} damage!`;
        });
}

function fireball(){
    fetch("/fireball", {method:"POST"})
        .then(response => response.json())
        .then(data => {
            document.getElementById("enemy-hp").textContent = data.enemy_hp;
            document.getElementById("fireballBut").textContent = `Fireball hit for ${data.dmg} damage!`;
            })
}