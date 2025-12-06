import Image from 'next/image';

interface AvatarProps {
  src: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export default function Avatar({
  src,
  alt = 'Avatar',
  size = 'md',
  className = '',
}: AvatarProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div
      className={`
        relative rounded-full overflow-hidden bg-gray-200
        ${sizes[size]}
        ${className}
      `}
    >
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  );
}
