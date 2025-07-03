import { Button } from '@/components/ui/button';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { X } from 'lucide-react';
import React from 'react';

interface SortableImageProps {
    src: string;
    id: string;
    removeImage: (id: string) => void;
}

export default function SortableImage({ src, id, removeImage }: SortableImageProps) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const handleRemoveBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        removeImage(id);
    };

    return (
        <div ref={setNodeRef} {...attributes} {...listeners} style={style} className="relative h-48 w-48">
            <Button onClick={handleRemoveBtn} className="absolute top-1 right-1 z-10 rounded-full">
                <X />
            </Button>

            <img src={src} alt="Preview" className="h-full w-full rounded border object-scale-down" />
        </div>
    );
}
