'use client'
import React, { useState, useEffect, MouseEventHandler } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { RiFileDownloadFill } from 'react-icons/ri';
import { CiEdit } from "react-icons/ci";
import { toast_msg } from '@/lib/toast'; // Assuming toast_msg is a custom function

interface Uploader_props {
    id: string;
    title?: string;
    url: string;
    onFileUpload?: (fileUrl: string, id?:string) => void;
    type?: string;

}



const cloudinary_url = process.env.NEXT_PUBLIC_CLOUDINARY_URL

export const FileUploaderNew = ({ id, title, url, onFileUpload }: Uploader_props) => {
    const [filePreview, setFilePreview] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);



    useEffect(() => {
        if (url) {
        setFilePreview(url);
        setIsUploaded(!!url); // Set isUploaded if initial url is provided
        }
    }, [url]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        
        if (selectedFile) {
            const maxSizeInBytes = 5 * 1024 * 1024; // 5MB in bytes
            if (selectedFile.size > maxSizeInBytes) {
                alert('File size exceeds 2MB limit. Please select a smaller file.');
                return;
            }

            setFile(selectedFile);
            const previewUrl = URL.createObjectURL(selectedFile);
            setFilePreview(previewUrl);
            setIsLoading(true);

            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('upload_preset', 'crm_images');

            try {
                if (!cloudinary_url) {
                    toast_msg({title:'Cloudinary url not found', type:'danger'})
                    return;
                }
                const response = await axios.post(cloudinary_url, formData);
                const uploadedFileUrl = response.data.secure_url;
                if (onFileUpload) {
                    onFileUpload(uploadedFileUrl, id);
                }
                setIsUploaded(true);
            } catch (error) {
                console.error('Error uploading file:', error);
                toast_msg({ title: 'File upload failed, try again.', type: 'danger' });
                setFilePreview('');
                setFile(null);
            } finally {
                setIsLoading(false);
            }
        } else {
            setFilePreview('');
            setFile(null);
            alert('Please select a valid file.');
        }
    };

    const renderPreview = () => {
        if (!filePreview) return null;

        const fileType = file?.type;

        if (fileType?.startsWith('image/')) {
        return (
            <span
            className="relative w-full h-[340px] rounded-[3px] overflow-hidden cursor-pointer"
            onClick={() => window.open(filePreview, '_blank')}
            >
            <Image
                src={filePreview}
                alt="File Preview"
                layout="fill"
                objectFit="cover"
            />
            </span>
        );
        } else if (fileType === 'application/pdf') {
        return (
            <iframe
            src={filePreview}
            title="PDF Preview"
            className="w-full h-[340px] rounded-[3px] cursor-pointer"
            onClick={() => window.open(filePreview, '_blank')}
            />
        );
        } else if (fileType === 'application/acad' || fileType === 'application/dwg') {
        return (
            <div
            className="w-full h-full flex justify-center items-center h-[340px] rounded-[3px] cursor-pointer"
            onClick={() => window.open(filePreview, '_blank')}
            >
            <p className="text-gray-500">DWG File Uploaded</p>
            </div>
        );
        } else {
        return (
            <div
            className="w-full h-full flex justify-center items-center h-[340px] rounded-[3px] cursor-pointer"
            onClick={() => window.open(filePreview, '_blank')}
            >
            <p className="text-gray-500">File Uploaded</p>
            </div>
        );
        }
    };

    return (
        <div className="w-full flex flex-col justify-start items-start gap-2 h-full">
            {filePreview && (
                <>
                {isLoading ? (
                    <div className="w-full h-[340px] flex justify-center items-center rounded-[3px] bg-gray-200">
                    <span className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></span>
                    </div>
                ) : (
                    renderPreview()
                )}
                </>
            )}
            {!filePreview && 
            <div className="w-full h-[340px] bg-gray-100 rounded-md flex items-center justify-center">
                <p className="text-sm font-medium text-gray-700">No File has been uploaded yet.</p>
            </div>}
            <span className="w-full flex flex-col items-start justify-start">
                <input  type="file"  name={`file-${id}`}  accept="image/*,application/pdf,application/acad,application/dwg"    onChange={handleFileChange}    id={`fileInput-${id}`} style={{ display: 'none' }} />

                <button type="button"  className="w-full h-[50px] rounded-[3px] text-sm flex items-center justify-center bg-[#306ce9] text-white hover:bg-[#306ce9]/90 duration-300"  onClick={() => document.getElementById(`fileInput-${id}`)?.click()}  >
                    {isUploaded ? 'Change File' : `${title || 'Select File'}`}
                </button>
            </span>
        </div>
    );
};


export const ImgUploader = ({ id, title, url, onFileUpload, type }: Uploader_props) => {
    const [filePreview, setFilePreview] = useState<string>('');
    const [isImage, setIsImage] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (url) {
        const fileType = url.split('.').pop()?.toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'].includes(fileType || '')) {
            setIsImage(true);
        } else {
            setIsImage(false);
        }
        setFilePreview(url);
        }
    }, [url]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            // Check file size (5MB limit)
            const maxSizeInBytes = 5 * 1024 * 1024; // 5MB in bytes
            if (selectedFile.size > maxSizeInBytes) {
                alert('File size exceeds 5MB limit. Please select a smaller image.');
                return;
            }

            const fileType = selectedFile.type;
            setIsLoading(true);

            if (fileType.startsWith('image/')) {
                setIsImage(true);
                const previewUrl = URL.createObjectURL(selectedFile);
                setFilePreview(previewUrl);
            } else {
                alert('Unsupported file type. Please select an image.');
                setIsLoading(false);
                return;
            }

            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('upload_preset', 'crm_images'); // Replace with your Cloudinary upload preset

            try {
                if (!cloudinary_url) {
                toast_msg({ title: 'Cloudinary url not found.', type: 'danger' });
                return;
                }
                const response = await axios.post(cloudinary_url, formData);
                const fileUrl = response.data.secure_url;

                // Invoke the callback to send the URL back to the parent component
                if (onFileUpload) {
                onFileUpload(fileUrl, id);
                }
            } catch (error) {
                console.log('Error uploading file:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleEditClick = () => {
        document.getElementById(`fileInput-${id}`)?.click();
    };

    return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-[15px] relative">
        {/* <h4 className="text-sm text-slate-200">{title}</h4> */}

        <div className="relative w-full h-full rounded-full overflow-hidden cursor-pointer" style={{ backgroundColor: '#f0f0f0' }}>
            {filePreview && (
            <div className="relative w-full h-full">
                <Image
                src={filePreview}
                alt="Profile Picture"
                layout="fill"
                objectFit="cover"
                />
                {isLoading && (
                <div className="absolute inset-0 bg-black opacity-50 flex items-center justify-center ">
                    
                    <span className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></span>
                </div>
                )}
            </div>
            )}
            {!filePreview && (
            <Image
                src="/default-male.png" // Path to your default profile image
                alt="Default Profile"
                layout="fill"
                objectFit="cover"
            />
            )}
        </div>

        <input
            type="file"
            id={`fileInput-${id}`}
            accept="image/*" // Accept only image files
            style={{ display: 'none' }} // Hide the input
            onChange={handleFileChange}
        />

        <CiEdit
            className="text-gray-600 size-[25px] absolute bottom-5 right-5 group-hover:text-[#306ce9] duration-150 cursor-pointer"
            onClick={handleEditClick}
        />
        </div>
    );
};