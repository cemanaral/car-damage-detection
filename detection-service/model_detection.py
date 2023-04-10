from flask import Blueprint, request, current_app, jsonify
import keras

from tf_detection_wrapper import TfDetectionWrapper


blueprint = Blueprint('model_detection', __name__)

ford_model_detection_model = keras.models.load_model('models/Ford_Detection-2023-03-27 20_02_28.515633.h5')
ford_models = ["Fiesta", "Mustang"]

hyundai_model_detection_model = keras.models.load_model('models/Hyundai_Detection-2023-03-27 21_09_27.955566.h5')
hyundai_models = ["Accent", "Elentra"]

@blueprint.route('/ford', methods=['POST'])
def ford_model_detection():
    model_image = request.files['model_image']
    current_app.logger.info(
        f'file received from ford model detection endpoint {model_image.__dict__}')
    
    detector = TfDetectionWrapper(ford_model_detection_model, request.files['model_image'].read(), ford_models)
    return detector.detection_response()


@blueprint.route('/hyundai', methods=['POST'])
def hyundai_model_detection():
    model_image = request.files['model_image']
    current_app.logger.info(
        f'file received from hyundai model detection endpoint {model_image.__dict__}')
    
    detector = TfDetectionWrapper(hyundai_model_detection_model, request.files['model_image'].read(), hyundai_models)
    return detector.detection_response()
