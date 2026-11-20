import React, { useState } from 'react';
import LibraryHero from '../components/library/LibraryHero';
import FeaturedBook from '../components/library/FeaturedBook';
import ResourceArchive from '../components/library/ResourceArchive';
import PreviewModal from '../components/library/PreviewModal';

export default function Library() {
  const [libraryQuery, setLibraryQuery] = useState('');
  const [libraryCategory, setLibraryCategory] = useState('All Resources');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <>
      <LibraryHero />
      <FeaturedBook onOpenPreview={() => setIsPreviewOpen(true)} />
      <ResourceArchive 
        searchQuery={libraryQuery}
        searchCategory={libraryCategory}
      />
      <PreviewModal 
        isOpen={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)} 
      />
    </>
  );
}
