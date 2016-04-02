from flask import Flask, jsonify
from flask import make_response
from flask_restful import Api

from app.handlers import Session, Ingredients


app = Flask(__name__, static_url_path="")
api = Api(app)


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

api.add_resource(Session, '/session')
api.add_resource(Ingredients, '/ingredients')


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080, debug=True)
