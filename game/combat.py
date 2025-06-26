from .player import Player
from .enemy import Enemy

class Combat:
    def __init__(self):
        self.player = Player()
        self.enemy = Enemy(level=1)
        self.turn = "player"

    def player_attack(self):
        if self.turn != "player":
            return { "error": "Not player's turn"}
        dmg = self.player.attack()
        self.enemy.take_damage(dmg)
        self.turn = "enemy"
        return {"dmg": dmg, "enemy_hp": self.enemy.hp, "turn": self.turn}

    def player_fireball(self):
        if self.turn != "player":
            return {"error": "Not player's turn"}
        dmg = self.player.cast_fireball()
        self.enemy.take_damage(dmg)
        self.enemy.on_fire = True
        self.enemy.firedmg = max(1,round(dmg * 0.2))
        self.turn = "enemy"
        return {"dmg": dmg, "enemy_hp": self.enemy.hp, "turn": self.turn}

    def enemy_turn(self):
        if self.turn != "enemy":
            return {"error": "Not enemy's turn"}
        self.enemy.burn()
        dmg = 8
        self.player.take_damage(dmg)
        self.turn = "player"
        return {"dmg": dmg, "player_hp": self.player.hp, "turn": self.turn}

    def get_state(self):
        return {
            "player_hp": self.player.hp,
            "enemy_hp": self.enemy.hp,
            "turn": self.turn
        }