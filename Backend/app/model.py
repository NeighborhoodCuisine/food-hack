from itertools import combinations

from app.recipes import RecipeProvider


MIN_GUESTS = 3
MAX_GUESTS = 8


class ActiveUsers:

    def __init__(self):
        self.users = []

    def __repr__(self):
        return str(self)

    def __str__(self):
        return str(self.users)

    def add_user(self, data):
        for user in self.users:
            if user.merge(data):
                return

        self.users.append(User(data))

    def remove_user(self, identifier):
        for user in self.users:
            if user.name == identifier:
                self.users.remove(user)
                break

    @classmethod
    def _joined_ingredients(cls, users):
        ingredients = [u.ingredients for u in users]
        ingredients = [i for u in ingredients for i in u]
        ingredients = [i.lower() for i in ingredients]
        return list(set(ingredients))

    def joined_ingredients(self):
        return self._joined_ingredients(self.users)

    def _get_combinations(self):
        subsets = []
        for i in range(MIN_GUESTS, MAX_GUESTS+1):
            subsets.append([l for l in combinations(self.users, i)])
        return [s for sub in subsets for s in sub if sub]

    @classmethod
    def _filter_combinations(cls, sets):
        return [l for l in sets if len(l) <= max(u.max_guests for u in l)]

    @classmethod
    def _calculate_ingredients(cls, subsets):
        options = []
        for group in subsets:
            ingredients = cls._joined_ingredients(group)
            options.append({
                'group': group,
                'ingredients': ingredients,
                'recipe': RecipeProvider.best_recipe(ingredients)
            })
        return options

    def subset_ingredients(self):
        subsets = self._get_combinations()
        subsets = self._filter_combinations(subsets)
        print(subsets, 'after')
        possible_groups = self._calculate_ingredients(subsets)
        print(possible_groups)


class User:

    def __init__(self, data):
        self.name = data.get('user')
        self.location = [data.get('location').get('lat', 0),
                         data.get('location').get('lon', 0)]
        self.cuisine = data.get('cuisine', '')
        self.max_guests = data.get('max_guests', 0)
        self.ingredients = data.get('ingredients', [])

    def __repr__(self):
        return str(self)

    def __str__(self):
        return self.name

    def merge(self, data):
        if self.name != data.get('user'):
            return False
        else:
            self.location = [data.get('lat'), data.get('lon')]
            self.cuisine = data.get('cuisine')
            self.max_guests = data.get('max_guests')
            self.ingredients = data.get('ingredients')
            return True
