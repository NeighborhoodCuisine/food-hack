from flask_restful import Resource
from flask import request

from app.model import ActiveUsers
from app.recipes import RecipeProvider

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
    @classmethod
    def get(cls):
        ingredients = ','.join(active_users.joined_ingredients())
        recipe = RecipeProvider.best_recipe(ingredients)
        if recipe:
            return RecipeProvider.recipe(recipe['id'])
        else:
            return {}
