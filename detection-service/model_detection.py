from flask import Blueprint, request, current_app, jsonify
import keras
import numpy as np
import cv2

blueprint = Blueprint('model_detection', __name__)

ford_model_detection_model = keras.models.load_model('models/Ford_Detection-2023-03-27 20_02_28.515633.h5')
ford_models = ["Fiesta", "Mustang"]

@blueprint.route('/ford', methods=['POST'])
def ford_model_detection():
    model_image = request.files['model_image']
    current_app.logger.info(
        f'file received from ford model detection endpoint {model_image.__dict__}')
    
    filestr = request.files['model_image'].read()
    file_bytes = np.fromstring(filestr, np.uint8)

    im = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
    im = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
    im = cv2.resize(im, dsize=(200, 300), interpolation=cv2.INTER_AREA)

    X = []
    X.append(im)
    X = np.array(X)
    X = X.astype('float32')
    X = X /255.0
    X = X.reshape(-1,300,200,1)

    prediction_result = ford_model_detection_model.predict(X)
    
    print(ford_models)
    print(prediction_result[0])
    
    prediction_result_list = prediction_result[0].tolist()
    prediction_result_index = prediction_result_list.index(max(prediction_result_list)) 
    return jsonify(result=ford_models[prediction_result_index])
    