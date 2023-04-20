# Install Pycocotools
pip install 'git+https://github.com/cocodataset/cocoapi.git#subdirectory=PythonAPI'
# Install detectron 2
python -m pip install 'git+https://github.com/facebookresearch/detectron2.git'

mkdir 'input/'
mkdir 'input/Coco Car Damage Detection Dataset/'
mkdir 'input/Coco Damage Detection Trained Models/'

wget -O 'Coco Car Damage Detection Dataset.zip' 'https://storage.googleapis.com/kaggle-data-sets/929361/1572269/bundle/archive.zip?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=gcp-kaggle-com%40kaggle-161607.iam.gserviceaccount.com%2F20230417%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20230417T202826Z&X-Goog-Expires=259200&X-Goog-SignedHeaders=host&X-Goog-Signature=5ab0a37feba4b9d8e10dade64f57760d813d3aaf2bd0fa80a04374e016ec255aefc58f40938e6e3d35d6464e6bb9641e43032024e8fa9bdfb642d88b6a0026726f6bab015a5361034ba94bb09c5c26ed529a37fc2e9b13cc08296e4ec44c7aaa4b9d3965c9c7f29ec0ab11723bf75f4ed60f5dfe6010bdff00adc1397388037017eb76a16b38a14ed67cd4da58618077e0c057c332a0ff599dfd968c4d826d2c12b59c98f4d20e33fffa9e06e30f22262928298c9463c8dc6140469d1f56dd751a626879da5d370a3d5d4334c8d9db4734ea746ede2411baee2af9c9c67c1cd6a0bd32fff1defc5eb5d552609f6ce74ce65cc2773ea9e04909e86def29f620f4'
wget -O 'Coco Damage Detection Trained Models.zip' 'https://storage.googleapis.com/kaggle-data-sets/1265041/2108524/bundle/archive.zip?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=gcp-kaggle-com%40kaggle-161607.iam.gserviceaccount.com%2F20230417%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20230417T202841Z&X-Goog-Expires=259200&X-Goog-SignedHeaders=host&X-Goog-Signature=a1300cc7745d8523db68c33edd26e6314359fe67e7712ed451aa51b303d431280570fb86ec9100b510416954e329f9f7d4537a2a60ed68e13c68b0034d1606d208944c177b224ff595cf538a1a276c88adc867c6533732c94dc99e210a22746a3c3781acb84773a2fcb48c8ba36ecab60069fcf51594a7ab1537ce1d3169c5ebf30b31f8bd58bfc513db5bcd588a153038467952582873966d245335d96b338fb862399fb72b595e44746c8f62554c82a4a0595b7da1371d88b313fabc538e355e463af7ffedb7d3948a39ee242fbd95f5ae027eb2af31af6bcc89aa2db385faa05f0f570439322d5a7d320704628d82f43d3a4f9a6633fedc39abe960a10d93'

unzip 'Coco Car Damage Detection Dataset.zip' -d 'input/Coco Car Damage Detection Dataset/' 
unzip 'Coco Damage Detection Trained Models.zip' -d 'input/Coco Damage Detection Trained Models/'
