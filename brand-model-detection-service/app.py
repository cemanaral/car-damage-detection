from flask import Flask, request, json
from flask_cors import CORS

from werkzeug.exceptions import HTTPException

app = Flask(__name__)
CORS(app)

from model_detection import blueprint as model_detection_blueprint
from brand_detection import blueprint as brand_detection_blueprint

app.register_blueprint(model_detection_blueprint, url_prefix='/model')
app.register_blueprint(brand_detection_blueprint, url_prefix='/brand')

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
    app.run(host='0.0.0.0', port=8080, debug=False)
