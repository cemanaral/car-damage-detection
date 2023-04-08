from flask import Blueprint, request, current_app

blueprint = Blueprint('model_detection', __name__)


@blueprint.route('/ford', methods=['POST'])
def ford_model_detection():
    model_image = request.files['model_image']
    current_app.logger.info(
        f'file received from ford/model endpoint {model_image.__dict__}')
    return model_image.name
