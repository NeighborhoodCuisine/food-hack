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


class Ingredients(Resource):
    @staticmethod
    def get():
        return {}


class Match(Resource):
    @staticmethod
    def get():
        ingredients = ','.join(active_users.joined_ingredients())
        headers = {
            'X-Mashape-Key': access_token,
            'Accept': 'application/json'
        }
        params = {
            'ingredients': ingredients,
            'limitLicense': False,
            'ranking': 2
        }
        recipes = requests.get('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients',
                               headers=headers, params=params).json()
        return recipes
