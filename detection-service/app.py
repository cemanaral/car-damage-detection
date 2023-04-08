from flask import Flask, request, json
from werkzeug.exceptions import HTTPException
from model_detection import blueprint as model_detection_blueprint

app = Flask(__name__)
app.register_blueprint(model_detection_blueprint, url_prefix='/model')


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
    app.run(host='localhost', port=8080, debug=True)
