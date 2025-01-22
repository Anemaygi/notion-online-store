import NextImage, { ImageProps } from 'next/image';

interface GImageProps extends ImageProps {
    src: string;
}

const Image: React.FC<GImageProps> = ({ src, ...props }) => {
    const pathway = process.env.NODE_ENV === "production" ? '/pet-sites-boilerplate' : ''; 
    return (
        <NextImage
            src={pathway + src}
            {...props}
        />
    );
};

export default Image;