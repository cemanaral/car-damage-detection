from flask import Blueprint, request, current_app

blueprint = Blueprint('brand_detection', __name__)


@blueprint.route('/', methods=['POST'])
def brand_detection():
    model_image = request.files['model_image']
    current_app.logger.info(
        f'file received from brand endpoint {model_image.__dict__}')
    return model_image.name
