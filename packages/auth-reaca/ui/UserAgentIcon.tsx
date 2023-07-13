import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid';
import {
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  DeviceTabletIcon,
} from '@heroicons/react/24/solid';
import React, { useMemo } from 'react';
import SocialIcons from '../icons/social';
import DeviceIcons from '../icons/devices';

export interface UserAgentIconProps {
  userAgent: string;
}

export function UserAgentIcon({ userAgent }: UserAgentIconProps) {
  const device = useMemo(() => {
    if (userAgent.includes('Android')) {
      return 'mobile';
    } else if (userAgent.includes('iPhone')) {
      return 'mobile';
    } else if (userAgent.includes('iPad')) {
      return 'tablet';
    } else if (userAgent.includes('Macintosh')) {
      return 'desktop';
    } else if (userAgent.includes('Windows')) {
      return 'desktop';
    } else if (userAgent.includes('Linux')) {
      return 'desktop';
    } else {
      return 'unknown';
    }
  }, [userAgent]);

  const manufacturer = useMemo(() => {
    if (userAgent.includes('Android')) {
      return 'Android';
    } else if (userAgent.includes('iPhone')) {
      return 'Apple';
    } else if (userAgent.includes('iPad')) {
      return 'Apple';
    } else if (userAgent.includes('Macintosh')) {
      return 'Apple';
    } else if (userAgent.includes('Windows')) {
      return 'Microsoft';
    } else if (userAgent.includes('Linux')) {
      return 'Linux';
    } else if (userAgent.includes('Chrome')) {
      return 'Google';
    } else if (userAgent.includes('Firefox')) {
      return 'Mozilla';
    } else {
      return 'Unknown';
    }
  }, [userAgent]);

  const deviceStyle = useMemo(() => {
    const baseStyle = {
      width: '4rem',
      height: '4rem',
      color: '#71717a',
    };
    switch (device) {
      case 'desktop':
        return {
          ...baseStyle,
        } as React.CSSProperties;
      case 'tablet':
        return {
          ...baseStyle,
        } as React.CSSProperties;
      case 'mobile':
        return {
          ...baseStyle,
        } as React.CSSProperties;
      default:
        return {
          ...baseStyle,
        } as React.CSSProperties;
    }
  }, [device]);

  const manufacturerStyle = useMemo(() => {
    const baseStyle = {
      width: '1rem',
      height: '1rem',
      position: 'absolute',
      marginTop: device === 'desktop' ? '-1rem' : '',
      color: '#71717a',
    };
    switch (manufacturer) {
      case 'Apple':
        return {
          ...baseStyle,
        } as React.CSSProperties;
      case 'Microsoft':
        return {
          ...baseStyle,
        } as React.CSSProperties;
      case 'Linux':
        return {
          ...baseStyle,
        } as React.CSSProperties;
      case 'Android':
        return {
          ...baseStyle,
        } as React.CSSProperties;
      default:
        return {
          ...baseStyle,
        } as React.CSSProperties;
    }
  }, [manufacturer]);

  return (
    <div
      style={{
        width: '4rem',
        height: '4rem',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {device === 'desktop' && <ComputerDesktopIcon style={deviceStyle} />}
      {device === 'tablet' && <DeviceTabletIcon style={deviceStyle} />}
      {device === 'mobile' && <DevicePhoneMobileIcon style={deviceStyle} />}

      {manufacturer === 'Apple' && (
        <SocialIcons.apple style={manufacturerStyle} />
      )}
      {manufacturer === 'Microsoft' && (
        <DeviceIcons.windows style={manufacturerStyle} />
      )}
      {manufacturer === 'Linux' && (
        <DeviceIcons.linux style={manufacturerStyle} />
      )}
      {manufacturer === 'Android' && (
        <DeviceIcons.android style={manufacturerStyle} />
      )}
      {manufacturer === 'Unknown' && (
        <QuestionMarkCircleIcon style={manufacturerStyle} />
      )}
    </div>
  );
}
