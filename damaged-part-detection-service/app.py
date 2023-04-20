from flask import Flask, request, json
from flask_cors import CORS

from werkzeug.exceptions import HTTPException

app = Flask(__name__)
CORS(app)

from damaged_car_part_detection import blueprint as damaged_car_part_detection_blueprint 
app.register_blueprint(damaged_car_part_detection_blueprint, url_prefix='/part')


@app.errorhandler(HTTPException)
def handle_exception(e):
    """Return JSON instead of HTML for HTTP errors."""
    # start with the correct headers and status code from the error
    response = e.get_response()
    # replace the body with JSON
    response.data = json.dumps({
        "code": e.code,
        "name": e.name,
        "description": e.description,
    })
    response.content_type = "application/json"
    return response


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8081, debug=False)
