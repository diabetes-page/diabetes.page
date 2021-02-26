import React, { useCallback, useContext } from 'react';
import { Button, View } from 'react-native';
import { Document, Page, pdfjs } from 'react-pdf';
import { useSelector } from '../../../../redux/root/hooks';
import { renderIf } from '../../../../utilities/misc/rendering';
import { requests } from '../../../../utilities/requests/requests';

// todo: pdf worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const PresentationOld = (): JSX.Element => {
  const conference = useSelector((state) => state.live.conference!);
  const slideIndex = conference.slideIndex;
  const [previousSlide, nextSlide] = useChangeSlide();

  return (
    <View>
      <Document file={require('../../../../../assets/pdf.pdf')}>
        <Page
          pageNumber={slideIndex + 1}
          renderAnnotationLayer={false}
          height={600}
        />
      </Document>
      {renderIf(!!conference?.state.chatRoom)(() => (
        <>
          <Button
            title="Vorherige Slide"
            onPress={previousSlide}
            disabled={slideIndex <= 0}
          />
          <Button
            title="Nächste Slide"
            onPress={nextSlide}
            disabled={slideIndex >= 49}
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
    (slideIndex) => {
      requests // todo: don't hardcode slide number
        .switchConferenceSlide(5, {
          slideIndex,
        })
        .then((response) => {
          sendMessage(response.data.officialMessage);
        });
    },
    [sendMessage],
  );

  const previousSlide = useCallback(() => {
    const oldSlide = conference?.state.slideIndex ?? 1;
    const newSlide = Math.max(0, oldSlide - 1);
    return changeSlide(newSlide);
  }, [conference, changeSlide]);

  const nextSlide = useCallback(() => {
    const oldSlide = conference?.state.slideIndex ?? 48;
    const newSlide = Math.min(49, oldSlide + 1);
    return changeSlide(newSlide);
  }, [conference, changeSlide]);

  return [previousSlide, nextSlide];
}
