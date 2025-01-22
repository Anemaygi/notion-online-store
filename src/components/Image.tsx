import NextImage, { ImageProps } from 'next/image';

interface GImageProps extends ImageProps {
    src: string;
}

const Image: React.FC<GImageProps> = ({ src, ...props }) => {
    return (
        <NextImage
            src={src}
            {...props}
        />
    );
};

export default Image;