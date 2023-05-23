from flask import Blueprint, request, current_app, jsonify
import keras

from tf_detection_wrapper import TfDetectionWrapper

blueprint = Blueprint('brand_detection', __name__)

brand_detection_model = keras.models.load_model('models/marka-detection2023-05-23 01_43_28.605340.h5') 

car_brands = ["Ford", "Hyundai", "Toyota", "Volkswagen"]

@blueprint.route('/', methods=['POST'])
def brand_detection():
    model_image = request.files['model_image']
    current_app.logger.info(
        f'file received from brand endpoint {model_image.__dict__}')
    
    detector = TfDetectionWrapper(brand_detection_model, request.files['model_image'].read(), car_brands)
    return detector.detection_response()
