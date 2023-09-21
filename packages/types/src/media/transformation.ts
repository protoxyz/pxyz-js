export enum ResizeMode {
  minimum = 'minimum',
  maximum = 'maximum',
  stretch = 'stretch',
  crop = 'crop',
}

export interface TransformationStep {
  name: string;
  description: string | null;
  type: string;
  options: {
    width: number | null | undefined;
    height: number | null | undefined;
    resizeMode: ResizeMode | null | undefined;
    quality: number | null | undefined;
    compression: number | null | undefined;
  };
}

export interface Transformation {
  id: string;
  tenantId: string;

  name: string;
  description: string | null;
  outputFormat: string;
  outputQuality: number;
  outputCompression: number;
  outputWidth: number;
  outputHeight: number;
  outputResizeMode: ResizeMode;

  steps: TransformationStep[];

  createdAt: Date | string;
  updatedAt: Date | string;
}
