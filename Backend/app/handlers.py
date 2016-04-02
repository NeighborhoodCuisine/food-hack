from flask import request
from flask_restful import Resource


class Session(Resource):

    @staticmethod
    def post():
        data = request.get_json()
        # debug printing
        print(data)