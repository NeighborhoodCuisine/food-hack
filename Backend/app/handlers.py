from flask_restful import Resource
from flask import request
import requests
from app.credentials import *


class Session(Resource):
    @staticmethod
    def post():
        data = request.get_json()
        print(data)


class Ingredients(Resource):
    @staticmethod
    def get():
        return {}

