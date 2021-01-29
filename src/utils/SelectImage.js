import ImagePicker from 'react-native-image-crop-picker';
import {Image} from 'react-native';
import demo from '../assets/demo.png';

const ImageUri = Image.resolveAssetSource(demo).uri;

const uriToBlob = (uri) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      // return the blob
      resolve(xhr.response);
    };
    
    xhr.onerror = function() {
      // something went wrong
      reject(new Error('uriToBlob failed'));
    };
    // this helps us get a blob
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    
    xhr.send(null);
  });
}

export const openGallery = async () => {
  let d;
  await ImagePicker.openPicker({
    // width: 300,
    // height: 400,
    cropping: true,
    mediaType: 'image',
    freeStyleCropEnabled: true,
    cropperToolbarTitle: 'Crop Photo',
    hideBottomControls: true,
  })
    .then((image) => {
      console.log(image);
      d = image.path;
    })
    .catch((e) => {
      d = ImageUri;
    });
    
  return {uri: d, blob: uriToBlob(d)};
};
export const openCamera = async () => {
  let d;
  await ImagePicker.openCamera({
    // width: 300,
    // height: 400,
    cropping: true,
    mediaType: 'image',
    freeStyleCropEnabled: true,
    cropperToolbarTitle: 'Crop Photo',
    hideBottomControls: true,
  })
    .then((image) => {
      console.log(image);
      d = image.path;
    })
    .catch((e) => {
      d = ImageUri;
    });
  return d;
};

export const openCrop = async (img) => {
  let d;
  await ImagePicker.openCropper({
    path: img,
    width: 200,
    height: 200,
    cropperToolbarTitle: 'Edit Photo',
    // freeStyleCropEnabled: true,
    hideBottomControls: true,
  }).then((image) => {
    console.log(image);
    d = image.path;
  });
  return d;
};
