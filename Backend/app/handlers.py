from flask_restful import Resource, reqparse

parser = reqparse.RequestParser()
parser.add_argument('test')
parser.add_argument('ses')


class Session(Resource):

    @staticmethod
    def get():
        return {'get': 'test'}

    @staticmethod
    def post():
        data = parser.parse_args()
        print(data)