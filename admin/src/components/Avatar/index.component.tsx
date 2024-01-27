import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

type AvatarProps = {
    size?: number;
    imageUrl?: string | null;
    altText?: string;
};

const Avatar: React.FC<AvatarProps> = ({ size = 40, imageUrl, altText }) => {
    return (
        <div className="relative">
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt={altText}
                    className={`rounded-full object-cover`}
                    style={{
                        width: size,
                        height: size
                    }}
                />
            ) : (
                <FaUserCircle className={`text-gray-500`}   style={{
                    width: size,
                    height: size
                }}/>
            )}
        </div>
    );
};

export default Avatar;
