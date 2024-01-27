import AuthService from '@/src/services/Auth';
import { errorFormatter } from '@/src/utils';
import React, { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';

interface FormAvatarProps {
  name: string;
  imageUrl?: string;
}

const FormAvatar: React.FC<FormAvatarProps> = ({
  name,
  imageUrl,
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const generateInitials = (name: string): string => {
    const words = name.split(' ');
    return words
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase();
  };

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      if (!file) {
        throw "File not present!!!";
      }
      let data = new FormData();
      data.append("image", file)
      await AuthService.updateUserProfile(data).then(
        (resp) => {
          toast("Profile updated", { type: 'success' });
          return resp.data
        }
      ).catch((error) => {
        const message = errorFormatter(error);
        toast(message, { type: 'error' });
      }).finally(() => {
        toast("Profile updation will work when aws will integrate", { type: 'info' });
      })
    }
  };

  return (
    <div className="relative flex justify-center">
      <div className="w-14 h-14 rounded-full bg-gray-300 flex flex-col items-center justify-center overflow-hidden">
        {selectedImage ? (
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="User Avatar"
            className="object-cover w-full h-full"
          />
        ) : imageUrl ? (
          <img
            src={imageUrl}
            alt="User Avatar"
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center bg-gray-300 text-gray-700 font-semibold text-lg">
            {generateInitials(name)}
          </div>
        )}


        <label
          htmlFor="avatar-input"
          className="absolute top-8 left-[52%] bg-blue-500 text-white rounded-full cursor-pointer p-1"
        >
          <input
            id="avatar-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </label>

      </div>
    </div>
  );
};

export default FormAvatar;
