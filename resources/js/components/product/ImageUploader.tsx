import SortableImage from '@/components/product/SortableImage';
import { closestCenter, DndContext, DragEndEvent, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import React, { useEffect, useState } from 'react';

interface ImageUploaderProps {
    filesProps?: {
        image_path: string;
    }[];
    onFilesSelect: (files: File[]) => void;
}

export default function ImageUploader({ filesProps, onFilesSelect }: ImageUploaderProps) {
    const [previews, setPreviews] = useState<string[]>([]);
    const [files, setFiles] = useState<File[]>([]);

    useEffect(() => {
        if (filesProps !== undefined) {
            const newPreviews = [] as string[];
            const newFiles = [] as File[];

            filesProps.map(async (fileData) => {
                if (fileData !== undefined) {
                    const file = await getFileFromUrl('http://localhost:8000/storage/' + fileData.image_path, fileData.image_path);
                    console.log(file);
                    console.log(URL.createObjectURL(file));

                    newFiles.push(file);

                    newPreviews.push(URL.createObjectURL(file));

                    setFiles(newFiles);
                    setPreviews(newPreviews);

                    onFilesSelect(newFiles); // Send files to parent (form)
                }
            });
        }
    }, [filesProps]);

    const getFileFromUrl = async (url: string, name: string, defaultType = 'image/jpeg') => {
        const response = await fetch(url);
        const data = await response.blob();
        return new File([data], name, {
            type: data.type || defaultType,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const newPreviews = [...previews.values(), URL.createObjectURL(file)];
            setPreviews(newPreviews);

            const newFiles = [...files.values(), file];
            setFiles(newFiles);

            onFilesSelect(newFiles); // Send files to parent (form)
        }
    };

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            const oldIndexPreview = previews.findIndex((item) => item === active.id);
            const newIndexPreview = previews.findIndex((item) => item === over?.id);

            setPreviews((items) => arrayMove(items, oldIndexPreview, newIndexPreview));
            setFiles((items) => arrayMove(items, oldIndexPreview, newIndexPreview));

            const filesInNewOrder = arrayMove(files, oldIndexPreview, newIndexPreview);
            onFilesSelect(filesInNewOrder); // Send files to parent (form)
        }
    };

    const removeImage = (index: string) => {
        const indexPreview = previews.findIndex((item) => item === index);

        const newPreview = previews.filter((_, index) => index !== indexPreview);
        setPreviews(newPreview);

        const newFiles = files.filter((_, index) => index !== indexPreview);
        setFiles(newFiles);
        onFilesSelect(newFiles);
    };

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={previews} strategy={horizontalListSortingStrategy}>
                <div className="flex flex-row flex-wrap space-y-2 space-x-2">
                    {previews.length > 0 && previews.map((src, index) => <SortableImage removeImage={removeImage} key={index} id={src} src={src} />)}

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
            </SortableContext>
        </DndContext>
    );
}
