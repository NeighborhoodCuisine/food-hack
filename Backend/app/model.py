from itertools import combinations
import grequests

from app.recipes import RecipeProvider
from app.utils import distance


MIN_GUESTS = 1
MAX_GUESTS = 8


class ActiveUsers:

    def __init__(self):
        self.users = []

    def __repr__(self):
        return str(self)

    def __str__(self):
        return str(self.users)

    def add_user(self, data, source):
        for user in self.users:
            if user.merge(data, source):
                return

        self.users.append(User(data, source))

    def get_user(self, _id):
        for user in self.users:
            if user.identifier == _id:
                return user

    def remove_user(self, identifier):
        for user in self.users:
            if user.name == identifier:
                self.users.remove(user)
                break

    def find_nearby(self, user, radius=100.):
        user = self.get_user(user)
        return len([u for u in self.users if u.identifier != user and
                    distance(u.location, user.location) <= radius])

    @classmethod
    def _joined_ingredients(cls, users):
        ingredients = [u.ingredients for u in users]
        ingredients = [i for u in ingredients for i in u]
        ingredients = [i.lower() for i in ingredients]
        return list(set(ingredients))

    def joined_ingredients(self):
        return self._joined_ingredients([u for u in self.users if u.active])

    @classmethod
    def _get_combinations(cls, users):
        subsets = []
        for i in range(MIN_GUESTS, MAX_GUESTS+1):
            subsets.append([l for l in combinations(users, i)])
        return [s for sub in subsets for s in sub if sub]

    @classmethod
    def _filter_combinations(cls, sets):
        return [l for l in sets if len(l) <= max(u.max_guests for u in l)]

    @classmethod
    def _find_recipes(cls, subsets):
        ingredients = [g['ingredients'] for g in subsets]
        fetch_list = (grequests.get(
            RecipeProvider.recipe_list, headers=RecipeProvider.headers,
            params=RecipeProvider.params(ing)) for ing in ingredients)
        recipes = grequests.map(fetch_list, size=50)
        recipes = [r.json() for r in recipes]
        for recipe_list in recipes:
            recipe_list.sort(key=lambda r: r.get('likes'), reverse=True)
        return [r[0] for r in recipes]

    @classmethod
    def _calculate_ingredients(cls, subsets):
        options = []
        for group in subsets:
            ingredients = cls._joined_ingredients(group)
            options.append({
                'group': group,
                'ingredients': ingredients
            })

        result = cls._find_recipes(options)

        for i, group in enumerate(options):
            group['recipe'] = result[i]

        return options

    @classmethod
    def _enrich_recipe(cls, recipe):
        info = RecipeProvider.recipe_info(recipe['id'])
        summary = RecipeProvider.recipe_summary(recipe['id'])
        recipe.update(info)
        recipe.update(summary)

    def get_best_permutation(self):
        users = [u for u in self.users if u.active]
        subsets = self._get_combinations(users)
        subsets = self._filter_combinations(subsets)
        possible_groups = self._calculate_ingredients(subsets)
        possible_groups.sort(key=lambda r: r['recipe'].get('likes'),
                             reverse=True)
        best = possible_groups[0]
        self._enrich_recipe(best['recipe'])
        print(best)
        return best


class User:

    def __init__(self, data, source):
        assert data.get('id') is not None
        self.identifier = data.get('id')
        self.active = False
        self._set_dispatch(data, source)

    def _set_session(self, data):
        self.location = [data.get('location').get('lat', 0),
                         data.get('location').get('lon', 0)]
        self.cuisine = data.get('cuisine', '')
        self.max_guests = data.get('max_guests', 0)
        self.ingredients = data.get('ingredients', [])
        self.active = True

    def _set_facebook(self, data):
        self.email = data.get('email')
        self.first_name = data.get('first_name')
        self.last_name = data.get('last_name')
        self.fb_link = data.get('fb_link')
        self.image_url = data.get('small_image_url')
        self.fb_token = data.get('fb_token')
        self.location = [data.get('location').get('lat', 0),
                         data.get('location').get('lon', 0)]

    def _set_dispatch(self, data, source):
        if source == 'fb':
            self._set_session(data)
        elif source == 'ses':
            self._set_session(data)
        else:
            raise Exception('Invalid source')

    def __repr__(self):
        return str(self)

    def __str__(self):
        return self.identifier

    def merge(self, data, source):
        if self.identifier != data.get('id'):
            return False
        else:
            self._set_dispatch(data, source)
            return True
