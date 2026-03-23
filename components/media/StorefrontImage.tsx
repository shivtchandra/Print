import Image, { type ImageProps } from 'next/image';

import { normalizeExternalImageUrl, shouldUseUnoptimizedImage } from '@/lib/images/normalizeExternalImageUrl';

type Props = ImageProps;

/**
 * Normalizes Google Drive share links and skips Next optimization for Drive (more reliable).
 */
export function StorefrontImage({ src, unoptimized, alt, ...rest }: Props) {
  if (typeof src !== 'string') {
    return <Image src={src} alt={alt} unoptimized={unoptimized} {...rest} />;
  }

  const normalized = normalizeExternalImageUrl(src);
  const drive = shouldUseUnoptimizedImage(normalized);
  const useUnoptimized = unoptimized !== undefined ? unoptimized : drive;

  return <Image src={normalized} alt={alt} unoptimized={useUnoptimized} {...rest} />;
}
