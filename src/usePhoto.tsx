import {useState, useEffect, ChangeEvent} from 'react';
import { isPlatform } from '@ionic/react';

import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import {Filesystem, Directory, WriteFileResult} from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "./firebase-config";
import {sendImage} from "./userService";



export function usePhotoGallery() {
    const [photos, setPhotos] = useState<UserPhoto[]>([]);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [downloadURL, setDownloadURL] = useState<string | null>(null);
    const [savedFile, setSavedFile] = useState<Blob>();
    const [savePhoto, setSavePhoto] = useState<Photo>()




    const takePhoto = async (ownerId:string, ownerUsername:string) => {
        const photo = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100,
        });
        const fileName = Date.now() + '.jpeg';
        const blobImage = await base64FromPath(photo.webPath!);
        console.log("premier",photos)
        const newPhotos = [
            {
                filepath: fileName,
                webviewPath: photo.webPath,
            },
            ...photos,
        ];
        setPhotos(newPhotos);
        uploadPhoto(ownerId, fileName, blobImage, ownerUsername);
    };
    const uploadPhoto = (ownerId: string, filename:string, blobImage:Blob, ownerUsername:string) => {
            const storageRef = ref(storage, `story/${filename}`);
            const uploadTask = uploadBytesResumable(storageRef, blobImage);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                    console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                    console.error('Upload failed', error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        sendImage(ownerId, downloadURL, ownerUsername );
                        console.log('File available at', downloadURL);

                    });
                }
            );
    };

    return {
        photos,
        takePhoto,
        uploadPhoto
    };

}

export async function base64FromPath(path: string) {
    const response = await fetch(path);
    const blob = await response.blob();
    return blob;
}


export interface UserPhoto {
    filepath: string;
    webviewPath?: string;
}

