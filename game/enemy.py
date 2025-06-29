class Enemy:
    def __init__(self, level):
        self.hp = 100 + level * 10
        self.on_fire = False
        self.firedmg = 1

    def take_damage(self, dmg):
        self.hp = max(0, self.hp - dmg)

    def burn(self):
        if self.on_fire:
            self.take_damage(self.firedmg)

