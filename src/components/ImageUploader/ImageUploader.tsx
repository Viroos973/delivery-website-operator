import { type ComponentProps } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import {useImageUploader} from "@/components/ImageUploader/hooks/useImageUploader.ts";
import {Button} from "@/components/ui/button.tsx";
import {AspectRatio} from "@/components/ui/aspect-ratio.tsx";

interface ImageUploaderProps extends ComponentProps<'div'> {
    onFileSelected: (file: File, index: number) => void;
    removePhoto: () => void;
    index: number;
    photoUrl?: string;
}

const ImageUploader = ({ className, onFileSelected, removePhoto, index, photoUrl, children, ...props }: ImageUploaderProps) => {
    const { state, functions } = useImageUploader(onFileSelected, index)

    return (
        <div>
            <input
                type='file'
                accept='image/*'
                className='hidden'
                ref={state.fileInputRef}
                onChange={functions.handleFileChange}
            />
            {photoUrl ? (
                <div className={cn('mt-2', className)} {...props}>
                    <div className='flex items-center justify-center'>
                        <div className='relative h-[96px] w-[96px] rounded-lg'>
                            <AspectRatio ratio={1}>
                                <img
                                    src={photoUrl}
                                    alt='preview'
                                    className='h-full w-full rounded-lg object-cover'
                                />
                            </AspectRatio>
                            <Button
                                variant='ghost'
                                onClick={removePhoto}
                                type='button'
                                className='absolute right-[-8px] top-[-8px] h-4 w-4 rounded-full bg-[#F87171] p-3
                                    hover:bg-[#F87171] cursor-pointer remove-photo-into-order'
                            >
                                <X color='white'/>
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='flex items-center gap-2'>
                    <div
                        className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm
                        transition-colors cursor-pointer"
                        onClick={functions.handleClick}
                        role='button'
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                functions.handleClick();
                            }
                        }}
                    >
                        {children}
                    </div>
                    <Button type='button' variant='ghost' onClick={removePhoto}>
                        <X color='#F87171'/>
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ImageUploader;