from flask_restful import Resource
from flask import request
from app.credentials import access_token
from app.model import ActiveUsers
import requests

active_users = ActiveUsers()


class Session(Resource):
    @staticmethod
    def put():
        data = request.get_json()
        print(data)
        active_users.add_user(data)
        print(active_users)
        print(active_users.joined_ingredients())


class Match(Resource):
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
        recipe = recipes.sort(key=lambda r: r.get('likes'), reverse=True)[0]
        return recipe

    @classmethod
    def recipe(cls, _id):
        params = {
            'includeNutrition': False
        }
        return requests.get(cls.base_url + '/recipes/{}/information'.format(_id),
                            headers=cls.headers, params=params).json()

    @classmethod
    def get(cls):
        ingredients = ','.join(active_users.joined_ingredients())
        recipe = cls.best_recipe(ingredients)
        if recipe:
            return cls.recipe(recipe['id'])
        else:
            return {}
