function attack() {
    fetch("/attack", { method: "POST" })
        .then(response => response.json())
        .then(data => {
            document.getElementById("enemy-hp").textContent = data.enemy_hp;
            document.getElementById("log").textContent = `You hit for ${data.dmg} damage!`;
        });
}