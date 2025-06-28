class Player:
    def __init__(self):
        self.hp = 100
        self.str = 5
        self.sns = 3
        self.ap = 2
        self.xp = 0
        self.lvl = 1

    def attack(self):
        return self.str * 10

    def cast_fireball(self):
        return self.ap * 10

    def take_damage(self, dmg):
        self.hp = max(0, self.hp - dmg)

    def heal(self):
        heal_amount = 2 * self.ap
        self.hp = min(100 + self.lvl * 10, self.hp + heal_amount)
        return heal_amount

    def level_up(self):
        self.lvl += 1
        self.str += 1
        self.sns += 1
        self.hp = 100 + self.lvl *10