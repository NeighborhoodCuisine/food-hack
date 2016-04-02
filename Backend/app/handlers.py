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
    def possible_recipes(cls, ingredients):
        params = {
            'ingredients': ingredients,
            'limitLicense': False,
            'ranking': 2
        }
        return requests.get(cls.base_url + '/recipes/findByIngredients',
                            headers=cls.headers, params=params).json()

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
        recipes = cls.possible_recipes(ingredients)
        if not recipes:
            return {}
        recipes.sort(key=lambda r: r.get('likes'), reverse=True)
        best_recipe = recipes[0]
        recipe = cls.recipe(best_recipe['id'])
        return recipe
