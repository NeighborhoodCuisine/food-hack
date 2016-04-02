from flask_restful import Resource
from flask import request
import requests

from app.credentials import *
from app.model import ActiveUsers

active_users = ActiveUsers()


class Session(Resource):
    @staticmethod
    def post():
        data = request.get_json()
        active_users.add_user(data)


class Ingredients(Resource):
    @staticmethod
    def get():
        return {}

