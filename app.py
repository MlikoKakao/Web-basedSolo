from flask import Flask, render_template, request, jsonify
from game.combat import Combat

app = Flask(__name__)
combat = Combat()

@app.route("/")
def index():
    return render_template("index.html", stats={"hp": combat.player.hp}, enemy={"hp": combat.enemy.hp})

@app.route("/attack", methods=["POST"])
def attack():
    result = combat.player_attack()
    return jsonify(result)

@app.route("/fireball", methods=["POST"])
def fireball():
    result = combat.player_fireball()
    return jsonify(result)

@app.route("/heal", methods=["POST"])
def heal():
    result = combat.player_heal()
    return jsonify(result)

@app.route("/enemy_turn", methods=["POST"])
def enemy_turn():
    result = combat.enemy_turn()
    return jsonify(result)

@app.route("/state", methods=["GET"])
def state():
    return jsonify(combat.get_state())

if __name__ == "__main__":
    app.run(debug=True)
