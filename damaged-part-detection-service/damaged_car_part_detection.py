# -*- coding: utf-8 -*-
"""damaged car part detection (2 nisan 2023).ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1ogR9T2gYaZytP-2EJQ8Et9BGE66FXaN8
"""


# Commented out IPython magic to ensure Python compatibility.
# %matplotlib inline
from pycocotools.coco import COCO
import numpy as np
import skimage.io as io
import matplotlib.pyplot as plt
import pylab
import random
pylab.rcParams['figure.figsize'] = (8.0, 10.0)# Import Libraries

# For visualization
import os
import seaborn as sns
from matplotlib import colors
from tensorboard.backend.event_processing import event_accumulator as ea
from PIL import Image

# Scipy for calculating distance
from scipy.spatial import distance

# I am visualizing some images in the 'val/' directory

dataDir='input/Coco Car Damage Detection Dataset/val'
dataType='COCO_val_annos'
mul_dataType='COCO_mul_val_annos'
annFile='{}/{}.json'.format(dataDir,dataType)
mul_annFile='{}/{}.json'.format(dataDir,mul_dataType)
img_dir = "input/Coco Car Damage Detection Dataset/img"

# initialize coco api for instance annotations
coco=COCO(annFile)
mul_coco=COCO(mul_annFile)

import torch, torchvision
print(torch.__version__, torch.cuda.is_available())

# assert torch.__version__.startswith("1.7")

import detectron2
from detectron2.utils.logger import setup_logger
setup_logger()

# import some common libraries
import numpy as np
import os, json, cv2, random
import matplotlib.pyplot as plt
import skimage.io as io

# import some common detectron2 utilities
from detectron2 import model_zoo
from detectron2.engine import DefaultPredictor
from detectron2.config import get_cfg
from detectron2.utils.visualizer import Visualizer
from detectron2.data import MetadataCatalog, DatasetCatalog
from detectron2.engine import DefaultTrainer
from detectron2.utils.visualizer import ColorMode
from detectron2.evaluation import COCOEvaluator, inference_on_dataset
from detectron2.data import build_detection_test_loader

# Set base params
plt.rcParams["figure.figsize"] = [16,9]

# To find out inconsistent CUDA versions, if there is no "failed" word in this output then things are fine.

dataset_dir = "input/Coco Car Damage Detection Dataset"
img_dir = "img/"
train_dir = "train/"
val_dir = "val/"

from detectron2.data.datasets import register_coco_instances
register_coco_instances("car_dataset_val", {}, os.path.join(dataset_dir,val_dir,"COCO_val_annos.json"), os.path.join(dataset_dir,img_dir))
register_coco_instances("car_mul_dataset_val", {}, os.path.join(dataset_dir,val_dir,"COCO_mul_val_annos.json"), os.path.join(dataset_dir,img_dir))

#get configuration
cfg = get_cfg()
cfg.merge_from_file(model_zoo.get_config_file("COCO-InstanceSegmentation/mask_rcnn_R_50_FPN_3x.yaml"))
cfg.MODEL.ROI_HEADS.NUM_CLASSES = 2  # only has one class (damage) + 1
cfg.MODEL.RETINANET.NUM_CLASSES = 2 # only has one class (damage) + 1
cfg.MODEL.WEIGHTS = os.path.join("input/Coco Damage Detection Trained Models/damage_segmentation_model.pth")
cfg.MODEL.ROI_HEADS.SCORE_THRESH_TEST = 0.7 
cfg['MODEL']['DEVICE']='cpu'#or cpu
damage_predictor = DefaultPredictor(cfg)

cfg_mul = get_cfg()
cfg_mul.merge_from_file(model_zoo.get_config_file("COCO-InstanceSegmentation/mask_rcnn_R_50_FPN_3x.yaml"))
cfg_mul.MODEL.ROI_HEADS.NUM_CLASSES = 6  # only has five classes (headlamp,hood,rear_bumper,front_bumper_door) + 1
cfg_mul.MODEL.RETINANET.NUM_CLASSES = 6 # only has five classes (headlamp,hood,rear_bumper,front_bumper_door) + 1
cfg_mul.MODEL.WEIGHTS = os.path.join("input/Coco Damage Detection Trained Models/part_segmentation_model.pth")
cfg_mul.MODEL.ROI_HEADS.SCORE_THRESH_TEST = 0.7 
cfg_mul['MODEL']['DEVICE']='cpu' #or cpu
part_predictor = DefaultPredictor(cfg_mul)


from flask import Blueprint, request, current_app, jsonify
blueprint = Blueprint('damaged_car_part_detection', __name__)

id_map_parts = {'headlamp': 1, 
                'rear_bumper': 2, 
                'door': 3,
                'hood': 4,
                'front_bumper': 5
              }

@blueprint.route('/', methods=['POST'], strict_slashes=False)
def detect_endpoint():
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
      assert len(damage_dict)>0, "AssertError: damage_dict should have atleast one damage"
      assert len(parts_dict)>0, "AssertError: parts_dict should have atleast one part"
      max_distance_dict = dict(zip(damage_dict.keys(),[max_distance]*len(damage_dict)))
      part_name = dict(zip(damage_dict.keys(),['']*len(damage_dict)))

      for y in parts_dict.keys():
          for x in damage_dict.keys():
            dis = distance.euclidean(damage_dict[x], parts_dict[y])
            if dis < max_distance_dict[x]:
              part_name[x] = y.rsplit('_',1)[0]

      return list(set(part_name.values()))
    except Exception as e:
      print(e)

  damage_class_map= {0:'damage'}
  parts_class_map={0:'headlamp',1:'rear_bumper', 2:'door', 3:'hood', 4: 'front_bumper'}

  # !! TEST MODELS

  fig, (ax1, ax2) = plt.subplots(1, 2, figsize =(16,12))
  im = io.imread(request.files['model_image'])

  #damage inference
  damage_outputs = damage_predictor(im)
  damage_v = Visualizer(im[:, :, ::-1],
                    metadata=MetadataCatalog.get("car_dataset_val"), 
                    scale=0.5, 
                    instance_mode=ColorMode.IMAGE_BW   # remove the colors of unsegmented pixels. This option is only available for segmentation models
  )
  damage_out = damage_v.draw_instance_predictions(damage_outputs["instances"].to("cpu"))

  #part inference
  parts_outputs = part_predictor(im)
  parts_v = Visualizer(im[:, :, ::-1],
                    metadata=MetadataCatalog.get("car_mul_dataset_val"), 
                    scale=0.5, 
                    instance_mode=ColorMode.IMAGE_BW   # remove the colors of unsegmented pixels. This option is only available for segmentation models
  )
  parts_out = parts_v.draw_instance_predictions(parts_outputs["instances"].to("cpu"))

  #plot
  ax1.imshow(damage_out.get_image()[:, :, ::-1],)
  ax2.imshow(parts_out.get_image()[:, :, ::-1])

  """# Yeni Bölüm"""

  damage_prediction_classes = [ damage_class_map[el] + "_" + str(indx) for indx,el in enumerate(damage_outputs["instances"].pred_classes.tolist())]
  damage_polygon_centers = damage_outputs["instances"].pred_boxes.get_centers().tolist()
  damage_dict = dict(zip(damage_prediction_classes,damage_polygon_centers))

  parts_prediction_classes = [ parts_class_map[el] + "_" + str(indx) for indx,el in enumerate(parts_outputs["instances"].pred_classes.tolist())]
  parts_polygon_centers =  parts_outputs["instances"].pred_boxes.get_centers().tolist()



  #Remove centers which lie in beyond 800 units
  parts_polygon_centers_filtered = list(filter(lambda x: x[0] < 800 and x[1] < 800, parts_polygon_centers))
  parts_dict = dict(zip(parts_prediction_classes,parts_polygon_centers_filtered))

  detection_result = detect_damage_part(damage_dict,parts_dict)
  print("Damaged Parts: ",detection_result)
  result_response = []
  for r in detection_result:
    result_response.append({"id": id_map_parts[r], "result": r})

  print("Damaged Parts: ", result_response)
  return jsonify(result=result_response)

