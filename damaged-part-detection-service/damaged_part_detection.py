import cv2
import json
from detectron2.data import build_detection_test_loader
from detectron2.evaluation import COCOEvaluator, inference_on_dataset
from detectron2.utils.visualizer import ColorMode
from detectron2.engine import DefaultTrainer
from detectron2.data import MetadataCatalog, DatasetCatalog
from detectron2.utils.visualizer import Visualizer
from detectron2.config import get_cfg
from detectron2.engine import DefaultPredictor
from detectron2 import model_zoo
from detectron2.utils.logger import setup_logger
import detectron2
from scipy.spatial import distance
from PIL import Image
from tensorboard.backend.event_processing import event_accumulator as ea
import os
from flask import request, jsonify

import torch
import torchvision
from pycocotools.coco import COCO
import numpy as np
import skimage.io as io
import matplotlib.pyplot as plt
import pylab
import random

from flask import Flask
from flask_cors import CORS
from werkzeug.exceptions import HTTPException


pylab.rcParams['figure.figsize'] = (8.0, 10.0)  # Import Libraries

app = Flask(__name__)
CORS(app)

@app.errorhandler(HTTPException)
def handle_exception(e):
    """Return JSON instead of HTML for HTTP errors."""
    # start with the correct headers and status code from the error
    response = e.get_response()
    # replace the body with JSON
    response.data = json.dumps({
        "code": e.code,
        "name": e.name,
        "description": e.description,
    })
    response.content_type = "application/json"
    return response


# For visualization

# Scipy for calculating distance

annFile = 'COCO_val_annos.json'
mul_annFile = 'COCO_mul_val_annos.json'

coco = COCO(annFile)
mul_coco = COCO(mul_annFile)


setup_logger()

# import some common libraries


cfg = get_cfg()
cfg.merge_from_file(model_zoo.get_config_file(
    "COCO-InstanceSegmentation/mask_rcnn_R_50_FPN_3x.yaml"))
cfg.MODEL.ROI_HEADS.NUM_CLASSES = 2  # only has one class (damage) + 1
cfg.MODEL.RETINANET.NUM_CLASSES = 2  # only has one class (damage) + 1
cfg.MODEL.WEIGHTS = os.path.join(
    "models/damage_segmentation_model.pth")
cfg.MODEL.ROI_HEADS.SCORE_THRESH_TEST = 0.7
cfg['MODEL']['DEVICE'] = 'cpu'  # or cpu
damage_predictor = DefaultPredictor(cfg)


cfg_mul = get_cfg()
cfg_mul.merge_from_file(model_zoo.get_config_file(
    "COCO-InstanceSegmentation/mask_rcnn_R_50_FPN_3x.yaml"))
# only has five classes (headlamp,hood,rear_bumper,front_bumper_door) + 1
cfg_mul.MODEL.ROI_HEADS.NUM_CLASSES = 6
# only has five classes (headlamp,hood,rear_bumper,front_bumper_door) + 1
cfg_mul.MODEL.RETINANET.NUM_CLASSES = 6
cfg_mul.MODEL.WEIGHTS = os.path.join(
    "models/part_segmentation_model.pth")
cfg_mul.MODEL.ROI_HEADS.SCORE_THRESH_TEST = 0.7
cfg_mul['MODEL']['DEVICE'] = 'cpu'  # or cpu
part_predictor = DefaultPredictor(cfg_mul)


def detect_damage_part(damage_dict, parts_dict):
    """
    Returns the most plausible damaged part for the list of damages by checking the distance 
    between centers centers of damage_polygons and parts_polygons

    Parameters
    -------------
     damage_dict: dict
                  Dictionary that maps damages to damage polygon centers.
     parts_dict: dict
                  Dictionary that maps part labels to parts polygon centers.
    Return
    ----------
    part_name: str
              The most plausible damaged part name.
    """
    try:
        max_distance = 10e9
        assert len(
            damage_dict) > 0, "AssertError: damage_dict should have atleast one damage"
        assert len(
            parts_dict) > 0, "AssertError: parts_dict should have atleast one part"
        max_distance_dict = dict(
            zip(damage_dict.keys(), [max_distance]*len(damage_dict)))
        part_name = dict(zip(damage_dict.keys(), ['']*len(damage_dict)))

        for y in parts_dict.keys():
            for x in damage_dict.keys():
                dis = distance.euclidean(damage_dict[x], parts_dict[y])
                if dis < max_distance_dict[x]:
                    part_name[x] = y.rsplit('_', 1)[0]

        return list(set(part_name.values()))
    except Exception as e:
        print(e)


damage_class_map = {0: 'damage'}
parts_class_map = {0: 'headlamp', 1: 'rear_bumper',
                   2: 'door', 3: 'hood', 4: 'front_bumper'}



@app.route('/', methods=['POST'])
def detect_parts():
    im = request.files['model_image'].read()
    app.logger.info(f'file received from brand endpoint {request.files["model_image"].__dict__}')


    # damage inference
    damage_outputs = damage_predictor(im)
    damage_v = Visualizer(im[:, :, ::-1],
                          metadata=MetadataCatalog.get("car_dataset_val"),
                          scale=0.5,
                          # remove the colors of unsegmented pixels. This option is only available for segmentation models
                          instance_mode=ColorMode.IMAGE_BW
                          )
    damage_outputs = damage_v.draw_instance_predictions(
    damage_outputs["instances"].to("cpu"))

    # part inference
    parts_outputs = part_predictor(im)
    parts_v = Visualizer(im[:, :, ::-1],
                         metadata=MetadataCatalog.get("car_mul_dataset_val"),
                         scale=0.5,
                         # remove the colors of unsegmented pixels. This option is only available for segmentation models
                         instance_mode=ColorMode.IMAGE_BW
                         )
    parts_outputs = parts_v.draw_instance_predictions(
    parts_outputs["instances"].to("cpu"))

    damage_prediction_classes = [damage_class_map[el] + "_" + str(
        indx) for indx, el in enumerate(damage_outputs["instances"].pred_classes.tolist())]
    damage_polygon_centers = damage_outputs["instances"].pred_boxes.get_centers(
    ).tolist()
    damage_dict = dict(zip(damage_prediction_classes, damage_polygon_centers))

    parts_prediction_classes = [parts_class_map[el] + "_" + str(
        indx) for indx, el in enumerate(parts_outputs["instances"].pred_classes.tolist())]
    parts_polygon_centers = parts_outputs["instances"].pred_boxes.get_centers(
    ).tolist()

    # Remove centers which lie in beyond 800 units
    parts_polygon_centers_filtered = list(
        filter(lambda x: x[0] < 800 and x[1] < 800, parts_polygon_centers))
    parts_dict = dict(zip(parts_prediction_classes,
                      parts_polygon_centers_filtered))

    result = detect_damage_part(damage_dict, parts_dict)
    print("Damaged Parts: ", result)
    return jsonify(result)






if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8081, debug=False)
