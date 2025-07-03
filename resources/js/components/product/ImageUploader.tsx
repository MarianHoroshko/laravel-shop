import { closestCenter, DndContext, DragEndEvent, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, horizontalListSortingStrategy, SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { useState } from 'react';

interface ImageUploaderProps {
    onFilesSelect: (files: File[]) => void;
}

interface SortableImageProps {
    src: string;
    id: string;
}

function SortableImage({ src, id }: SortableImageProps) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} {...attributes} {...listeners} style={style} className="h-48 w-48">
            <img src={src} alt="Preview" className="h-full w-full rounded border object-scale-down" />
        </div>
    );
}

export default function ImageUploader({ onFilesSelect }: ImageUploaderProps) {
    const [previews, setPreviews] = useState<string[]>([]);
    const [files, setFiles] = useState<File[]>([]);

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

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={previews} strategy={horizontalListSortingStrategy}>
                <div className="flex flex-row flex-wrap space-y-2 space-x-2">
                    {previews.length > 0 && previews.map((src, index) => <SortableImage key={index} id={src} src={src} />)}

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
