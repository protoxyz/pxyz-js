import { ResizeMode } from '@protoxyz/types';

export interface UploadOptions {
  path: string;
  access?: 'public' | 'private';
  originalFilename: string;
  mime: string;
  size: number;
  meta?: Record<string, any>;
  publicKey?: string;
  secretKey?: string;
}

export type ImageProcessorOptions = {
  format?: string;
  width?: number;
  height?: number;
  resizeMode?: ResizeMode;
  quality?: number;
  compression?: number;
};

export type ImageProcessorTransformationOptions = {
  transformation?: string;
};
