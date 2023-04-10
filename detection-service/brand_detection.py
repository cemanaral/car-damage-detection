from flask import Blueprint, request, current_app, jsonify
import keras
import numpy as np
import cv2

blueprint = Blueprint('brand_detection', __name__)

brand_detection_model = keras.models.load_model('models/marka-detection-2023-04-08 14_39_33.073557.h5') 

car_brands = ["Ford", "Hyundai", "Toyota", "Volkswagen"]

@blueprint.route('/', methods=['POST'])
def brand_detection():
    model_image = request.files['model_image']
    current_app.logger.info(
        f'file received from brand endpoint {model_image.__dict__}')
    
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

    prediction_result = brand_detection_model.predict(X)
    
    print(car_brands)
    print(prediction_result[0])
    
    prediction_result_list = prediction_result[0].tolist()
    prediction_result_index = prediction_result_list.index(max(prediction_result_list)) 
    return jsonify(result=car_brands[prediction_result_index])
    