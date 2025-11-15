import { type ComponentProps } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import {useImageUploader} from "@/components/ImageUploader/hooks/useImageUploader.ts";
import {Button} from "@/components/ui/button.tsx";
import {AspectRatio} from "@/components/ui/aspect-ratio.tsx";

interface ImageUploaderProps extends ComponentProps<'div'> {
    onFileSelected: (file: File | null) => void;
    files: File;
}

const ImageUploader = ({ className, onFileSelected, files, children, ...props }: ImageUploaderProps) => {
    const { state, functions } = useImageUploader(onFileSelected, files)

    return (
        <div>
            <input
                type='file'
                accept='image/*'
                className='hidden'
                ref={state.fileInputRef}
                onChange={functions.handleFileChange}
            />

            {files ? (
                <div className={cn('mt-2', className)} {...props}>
                    <div className='relative'>
                        {state.imagePreview && (
                            <div className='relative h-[96px] w-[96px] overflow-hidden rounded-lg'>
                                <AspectRatio ratio={1}>
                                    <img
                                        src={state.imagePreview}
                                        alt='preview'
                                        className='h-full w-full rounded-lg object-cover'
                                    />
                                </AspectRatio>
                            </div>
                        )}
                        <Button
                            variant='ghost'
                            onClick={() => {
                                onFileSelected(files);
                            }}
                            type='button'
                            className='absolute right-[-8px] top-[-8px] h-4 w-4 rounded-full bg-[#F87171] p-3 hover:bg-[#F87171]'
                        >
                            <X color='white'/>
                        </Button>
                    </div>
                </div>
            ) : (
                <div
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
            )}
        </div>
    );
};

export default ImageUploader;