import React from 'react';
import DocVersionBanner from '@theme-original/DocVersionBanner';

export default function DocVersionBannerWrapper(props) {
  return (
    <>
      <DocVersionBanner {...props} />
      {/* TODO: custom styles of the docs verions banner */}
    </>
  );
}
