from flask_restful import Resource
from flask import request

from app.model import ActiveUsers

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

