import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { PDF_HEIGHT } from '../../../config/style';
import { useSelector } from '../../../redux/root/hooks';
import { FullTrainingResource } from '../../../utilities/requests/requests';

// todo: pdf worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

type Props = { training: FullTrainingResource };

// This export must be default in order to work with next.js dynamic import
export default function Slide({ training }: Props): JSX.Element {
  const conference = useSelector((state) => state.live.conference!);
  const pdfIndex = training.slides[conference.slideIndex] ?? 0;

  return (
    <>
      <Document file="/pdf.pdf">
        <Page
          pageNumber={pdfIndex + 1}
          renderAnnotationLayer={false}
          height={PDF_HEIGHT}
        />
      </Document>
    </>
  );
}
