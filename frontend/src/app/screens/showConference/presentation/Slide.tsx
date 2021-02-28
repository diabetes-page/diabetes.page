import React from 'react';
import { View } from 'react-native';
import { Document, Page, pdfjs } from 'react-pdf';
import { PDF_HEIGHT } from '../../../../config/style';
import { useSelector } from '../../../../redux/root/hooks';
import { FullTrainingResource } from '../../../../utilities/requests/requests';

// todo: pdf worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

type Props = { training: FullTrainingResource };
export const Slide = ({ training }: Props): JSX.Element => {
  const conference = useSelector((state) => state.live.conference!);
  const pdfIndex = training.slides[conference.slideIndex] ?? 0;

  return (
    <View>
      <Document file={require('../../../../../assets/pdf.pdf')}>
        <Page
          pageNumber={pdfIndex + 1}
          renderAnnotationLayer={false}
          height={PDF_HEIGHT}
        />
      </Document>
    </View>
  );
};
