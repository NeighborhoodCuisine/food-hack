from flask_restful import Resource
from flask import request, jsonify
from app.credentials import access_token
from app.model import ActiveUsers
import requests

active_users = ActiveUsers()


class Session(Resource):
    @staticmethod
    def post():
        data = request.get_json()
        print(data)
        active_users.add_user(data)
        print(active_users)


class Ingredients(Resource):
    @staticmethod
    def get():
        return {}


class Match(Resource):
    @staticmethod
    def get():
        ingredients = ','.join(active_users.joined_ingredients())
        header = {
            'X-Mashape-Key': access_token,
            'Accept': 'application/json'
        }
        params = {
            'ingredients': ingredients,
            'limitLicense': False,
            'ranking': 2
        }
        response = requests.get('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients',
                                header=header, params=params).json()
        return jsonify(response)
