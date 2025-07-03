import React, { useState } from 'react';

interface ImageUploaderProps {
    onFileSelect: (file: File) => void;
}

export default function ImageUploader({ onFileSelect }: ImageUploaderProps) {
    const [previews, setPreviews] = useState<string[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const newPreviews = [...previews.values(), URL.createObjectURL(file)];
            setPreviews(newPreviews); // Preview images
            onFileSelect(file); // Send to parent (form)
        }
    };

    return (
        <div className="flex flex-row flex-wrap space-x-2 space-y-2">
            {previews.length > 0 &&
                previews.map((preview, index) => <img key={index} src={preview} alt="Preview" className="h-48 w-48 rounded border object-scale-down" />)}

            {previews.length < 8 && (
                <>
                    <input type="file" id="fileUpload" className="hidden" onChange={handleFileChange} />
                    <label
                        htmlFor="fileUpload"
                        className="flex h-48 w-48 cursor-pointer items-center justify-center rounded bg-black font-semibold text-white select-none hover:bg-gray-700"
                    >
                        Add image
                    </label>
                </>
            )}
        </div>
    );
}
