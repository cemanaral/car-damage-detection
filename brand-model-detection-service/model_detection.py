from flask import Blueprint, request, current_app, jsonify
import keras

from tf_detection_wrapper import TfDetectionWrapper


blueprint = Blueprint('model_detection', __name__)

ford_model_detection_model = keras.models.load_model('models/model-detection-ford2023-05-22 23_35_14.164348.h5')
ford_models = ["Fiesta", "Mustang"]

hyundai_model_detection_model = keras.models.load_model('models/model-detection-hyundai2023-05-22 23_53_01.743859.h5')
hyundai_models = ["Accent", "Elantra"]

volkswagen_model_detection_model = keras.models.load_model('models/model-detection-volkswagen2023-05-23 00_32_49.948807.h5') 
volkswagen_models = ["Beetle", "Golf"]

toyota_model_detection_model = keras.models.load_model('models/model-detection-toyota2023-05-23 00_12_46.181222.h5')
toyota_models = ["Corolla", "Yaris"]

brand_id_map = {
    "Golf": 1,
    "Beetle": 2,
    "Fiesta": 3,
    "Mustang": 4,
    "Corolla": 5,
    "Yaris": 6,
    "Accent": 7,
    "Elantra": 8
}


@blueprint.route('/ford', methods=['POST'])
def ford_model_detection():
    model_image = request.files['model_image']
    current_app.logger.info(
        f'file received from ford model detection endpoint {model_image.__dict__}')
    
    detector = TfDetectionWrapper(ford_model_detection_model, request.files['model_image'].read(), ford_models, brand_id_map)
    return detector.detection_response()


@blueprint.route('/hyundai', methods=['POST'])
def hyundai_model_detection():
    model_image = request.files['model_image']
    current_app.logger.info(
        f'file received from hyundai model detection endpoint {model_image.__dict__}')
    
    detector = TfDetectionWrapper(hyundai_model_detection_model, request.files['model_image'].read(), hyundai_models, brand_id_map)
    return detector.detection_response()

@blueprint.route('/volkswagen', methods=['POST'])
def volkswagen_model_detection():
    model_image = request.files['model_image']
    current_app.logger.info(
        f'file received from volkswagen model detection endpoint {model_image.__dict__}')
    
    detector = TfDetectionWrapper(volkswagen_model_detection_model, request.files['model_image'].read(), volkswagen_models, brand_id_map)
    return detector.detection_response()

@blueprint.route('/toyota', methods=['POST'])
def toyota_model_detection():
    model_image = request.files['model_image']
    current_app.logger.info(
        f'file received from toyota model detection endpoint {model_image.__dict__}')
    
    detector = TfDetectionWrapper(toyota_model_detection_model, request.files['model_image'].read(), toyota_models, brand_id_map)
    return detector.detection_response()
