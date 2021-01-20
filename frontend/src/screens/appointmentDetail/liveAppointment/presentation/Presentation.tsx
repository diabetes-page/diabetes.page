import React, { useCallback, useContext } from 'react';
import { Button, View } from 'react-native';
import { Document, Page, pdfjs } from 'react-pdf';
import { Put, withAuth } from '../../../../utilities/axios/axios';
import { renderIf } from '../../../../utilities/rendering/rendering';
import { ConferenceContext } from '../utilities/conferenceContext/ConferenceContext';
import { useSendMessage } from '../utilities/hooks/useSendMessage';

// todo: pdf worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const Presentation = (): JSX.Element => {
  const conference = useContext(ConferenceContext);
  const presentationIndex = conference?.state.presentationIndex ?? 0;
  const [previousSlide, nextSlide] = useChangeSlide();

  return (
    <View>
      <Document file={require('../../../../../assets/pdf.pdf')}>
        <Page
          pageNumber={presentationIndex + 1}
          renderAnnotationLayer={false}
          height={600}
        />
      </Document>
      {renderIf(!!conference?.state.chatRoom)(() => (
        <>
          <Button
            title="Vorherige Slide"
            onPress={previousSlide}
            disabled={presentationIndex <= 0}
          />
          <Button
            title="Nächste Slide"
            onPress={nextSlide}
            disabled={presentationIndex >= 49}
          />
        </>
      ))}
    </View>
  );
};

function useChangeSlide(): [() => void, () => void] {
  const conference = useContext(ConferenceContext);
  const sendMessage = useSendMessage();

  const changeSlide = useCallback(
    (presentationIndex) => {
      Put(
        '/appointments/1/conference/slide',
        {
          presentationIndex,
        },
        withAuth(),
      ).then((response) => {
        sendMessage(response.data.officialMessage);
      });
    },
    [sendMessage],
  );

  const previousSlide = useCallback(() => {
    const oldSlide = conference?.state.presentationIndex ?? 1;
    const newSlide = Math.max(0, oldSlide - 1);
    return changeSlide(newSlide);
  }, [conference, changeSlide]);

  const nextSlide = useCallback(() => {
    const oldSlide = conference?.state.presentationIndex ?? 48;
    const newSlide = Math.min(49, oldSlide + 1);
    return changeSlide(newSlide);
  }, [conference, changeSlide]);

  return [previousSlide, nextSlide];
}
