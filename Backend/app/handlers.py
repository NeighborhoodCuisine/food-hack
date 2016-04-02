from flask_restful import Resource
from flask import request


class Session(Resource):

    @staticmethod
    def post():
        data = request.get_json()
        print(data)