from flask import jsonify, Response
import numpy as np
import cv2


class TfDetectionWrapper:
    def __init__(self, model, file, labels, id_map={}):
        self.model = model
        self.file = file
        self.labels = labels
        self.id_map = id_map

    def detection_response(self) -> Response:
        file_bytes = np.fromstring(self.file, np.uint8)

        im = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
        im = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
        im = cv2.resize(im, dsize=(200, 300), interpolation=cv2.INTER_AREA)

        X = []
        X.append(im)
        X = np.array(X)
        X = X.astype('float32')
        X = X / 255.0
        X = X.reshape(-1, 300, 200, 1)

        prediction_result = self.model.predict(X)

        print(prediction_result)
        print(self.labels)
        print(prediction_result[0])


        prediction_result_list = prediction_result[0].tolist()
        prediction_result_index = prediction_result_list.index(
            max(prediction_result_list))

        return jsonify(result=self.labels[prediction_result_index], id=self.id_map[self.labels[prediction_result_index]]) if self.id_map else jsonify(result=self.labels[prediction_result_index])
