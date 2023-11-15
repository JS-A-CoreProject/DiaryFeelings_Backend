"use client";

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import axios from 'axios'
// 이미지 여러 개 올리기 하자...
const page = () => {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const imgRef = useRef<HTMLInputElement>(null);

  const handleImageView = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newImages = [...images];
    const newPreviews = [...previews];
    for (let i=0; i < e.target.files!.length; i++) {
      if (newImages.length < 3) {
        const file = e.target.files![i];
        newImages.push(file)
        const reader = new FileReader();
        reader.onload = (e) => {
          newPreviews.push(e.target!.result as string);
          setPreviews(newPreviews);
        };
        reader.readAsDataURL(file);
      }
    }
    setImages(newImages);
  };

  const handleDeletePreview = (index: number) => {
    const newImages = [...images];
    const newPreviews = [...previews];
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    setImages(newImages);
    setPreviews(newPreviews);
  };

  const send = async() => {
    const formData = new FormData();
    images.forEach((img) => {
      if( img instanceof File && img.size > 0) {
        formData.append('img', img)
      };
    });
    const result = await axios.put(
      '/api/diary',
      formData,
      {
        headers: {
          'Content-Type':'multipart/form-data'
        }
      }
    );
    console.log(result);
  };
  return (
    <div>
      {
        previews?.map((prev, index) =>(
          <div key={index}>
            <Image
              src={prev}
              width={200}
              height={300}
              alt={`${prev}-${index}`}
            />
            <button
              onClick={() => handleDeletePreview(index)}
            >
              X
            </button>
          </div>
        ))
      }
      <input
        ref={imgRef}
        type='file'
        multiple
        accept='image/*'
        className='border'
        onChange={(e) => handleImageView(e)}
      />
      <button onClick={send}>
        gogo
      </button>
    </div>
  );
}

export default page
