from flask_restful import Resource
from flask import request

from app.model import ActiveUsers
from app.recipes import RecipeProvider


SRC_FACEBOOK = 'fb'
SRC_SESSION = 'ses'

active_users = ActiveUsers()


class Session(Resource):
    @staticmethod
    def put():
        data = request.get_json()
        active_users.add_user(data, SRC_SESSION)


class Match(Resource):
    @staticmethod
    def get():
        active_users.get_best_permutation()
        ingredients = ','.join(active_users.joined_ingredients())
        recipe = RecipeProvider.best_recipe(ingredients)
        if recipe:
            return RecipeProvider.recipe(recipe['id'])
        else:
            return {}


class InitUser(Resource):
    @staticmethod
    def put():
        data = request.get_json()
        active_users.add_user(data, SRC_FACEBOOK)
