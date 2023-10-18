import React from 'react';

import { createSwatches } from '../../lib/colors';
import { DEFAULT_PALETTE_CONFIG } from '../../lib/constants';
import { isReactNative } from '../../lib/utils';
import { Brand } from '@protoxyz/types';

interface SwatchProps {
  name: string;
  value: string;
}
export function swatch({ name, value }: SwatchProps) {
  if (!value) return '';

  const swatches = createSwatches({
    ...DEFAULT_PALETTE_CONFIG,
    name,
    value,
  });

  return `
    --${name}: ${swatches[6]?.h} ${swatches[6]?.s}% ${swatches[6]?.l}%;
    --${name}-${swatches[0]?.stop}: ${swatches[0]?.h} ${swatches[0]?.s}% ${swatches[0]?.l}%;
    --${name}-${swatches[1]?.stop}: ${swatches[1]?.h} ${swatches[1]?.s}% ${swatches[1]?.l}%;
    --${name}-${swatches[2]?.stop}: ${swatches[2]?.h} ${swatches[2]?.s}% ${swatches[2]?.l}%;
    --${name}-${swatches[3]?.stop}: ${swatches[3]?.h} ${swatches[3]?.s}% ${swatches[3]?.l}%;
    --${name}-${swatches[4]?.stop}: ${swatches[4]?.h} ${swatches[4]?.s}% ${swatches[4]?.l}%;
    --${name}-${swatches[5]?.stop}: ${swatches[5]?.h} ${swatches[5]?.s}% ${swatches[5]?.l}%;
    --${name}-${swatches[6]?.stop}: ${swatches[6]?.h} ${swatches[6]?.s}% ${swatches[6]?.l}%;
    --${name}-${swatches[7]?.stop}: ${swatches[7]?.h} ${swatches[7]?.s}% ${swatches[7]?.l}%;
    --${name}-${swatches[8]?.stop}: ${swatches[8]?.h} ${swatches[8]?.s}% ${swatches[8]?.l}%;
    --${name}-${swatches[9]?.stop}: ${swatches[9]?.h} ${swatches[9]?.s}% ${swatches[9]?.l}%;
    --${name}-${swatches[10]?.stop}: ${swatches[10]?.h} ${swatches[10]?.s}% ${swatches[10]?.l}%;
    --${name}-${swatches[11]?.stop}: ${swatches[11]?.h} ${swatches[11]?.s}% ${swatches[11]?.l}%;
    --${name}-${swatches[12]?.stop}: ${swatches[12]?.h} ${swatches[12]?.s}% ${swatches[12]?.l}%;
     `;
}

export function Variables({ variables }: { variables: Brand }) {
  if (isReactNative()) return null;

  const keys = Object.keys(variables);
  const lightKeys = keys.filter(
    (key) => !key.startsWith('dark') && key !== 'radius',
  );
  const darkKeys = keys.filter(
    (key) => key.startsWith('dark') && key !== 'darkRadius',
  );

  return (
    <>
      <style type="text/css">
        {`:root {
          ${lightKeys
            .map((key) => {
              const value = variables[key as keyof Brand] as string;
              return swatch({ name: key, value });
            })
            .join('\n')}

          ${variables.radius ? `--radius: ${variables.radius};` : ''}
        }
      `}
      </style>

      {darkKeys.length > 0 && (
        <style type="text/css">
          {` 
        .dark {
          ${darkKeys
            .map((key) => {
              const value = variables[key as keyof Brand] as string;
              return swatch({ name: key, value });
            })
            .join(' \n')}

          ${variables.darkRadius ? `--radius: ${variables.darkRadius};` : ''}
        }
      `}
        </style>
      )}
    </>
  );
}
