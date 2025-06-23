from flask import Flask, render_template, request, jsonify
from game.player import Player
from game.enemy import Enemy


app = Flask(__name__)

player = Player()
enemy = Enemy(player.lvl)

@app.route("/")
def index():
    return render_template("index.html", stats=vars(player), enemy=vars(enemy))

@app.route("/attack", methods=["POST"])
def attack():
    dmg = player.attack()
    enemy.take_damage(dmg)
    return jsonify({"dmg": dmg, "enemy_hp": enemy.hp})

@app.route("/fireball", methods=["POST"])
def fireball():
    dmg = player.cast_fireball()
    enemy.take_damage(dmg)
    return jsonify({"dmg": dmg, "enemy_hp": enemy.hp})

if __name__ == "__main__":
    app.run(debug=True)
