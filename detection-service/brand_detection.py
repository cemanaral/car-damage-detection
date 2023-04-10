from flask import Blueprint, request, current_app
import keras

blueprint = Blueprint('brand_detection', __name__)

brand_detection_model = keras.models.load_model('models/marka-detection-2023-04-08 14_39_33.073557.h5') 

@blueprint.route('/', methods=['POST'])
def brand_detection():
    model_image = request.files['model_image']
    current_app.logger.info(
        f'file received from brand endpoint {model_image.__dict__}')
    return model_image.name
