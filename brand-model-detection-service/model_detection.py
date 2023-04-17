from flask import Blueprint, request, current_app, jsonify
import keras

from tf_detection_wrapper import TfDetectionWrapper


blueprint = Blueprint('model_detection', __name__)

ford_model_detection_model = keras.models.load_model('models/Ford_Detection-2023-03-27 20_02_28.515633.h5')
ford_models = ["Fiesta", "Mustang"]

hyundai_model_detection_model = keras.models.load_model('models/Hyundai_Detection-2023-03-27 21_09_27.955566.h5')
hyundai_models = ["Accent", "Elantra"]

volkswagen_model_detection_model = keras.models.load_model('models/Volkswagen_Detection-2023-03-27 21_56_43.286214.h5') 
volkswagen_models = ["Beetle", "Golf"]

toyota_model_detection_model = keras.models.load_model('models/Toyota_Detection-2023-03-27 21_34_40.002761.h5')
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
