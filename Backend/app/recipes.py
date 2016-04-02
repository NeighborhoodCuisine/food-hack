import requests

from app.credentials import access_token


class RecipeProvider:

    base_url = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com'
    headers = {
        'X-Mashape-Key': access_token,
        'Accept': 'application/json'
    }

    @classmethod
    def best_recipe(cls, ingredients):
        params = {
            'ingredients': ingredients,
            'limitLicense': False,
            'ranking': 2
        }
        recipes = requests.get(cls.base_url + '/recipes/findByIngredients',
                               headers=cls.headers, params=params).json()
        if not recipes:
            return None
        recipes.sort(key=lambda r: r.get('likes'), reverse=True)
        return recipes[0]

    @classmethod
    def recipe(cls, _id):
        params = {
            'includeNutrition': False
        }
        return requests.get(cls.base_url + '/recipes/{}/information'.format(_id),
                            headers=cls.headers, params=params).json()