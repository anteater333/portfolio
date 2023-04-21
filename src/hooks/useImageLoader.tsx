import {
  ClassAttributes,
  HTMLAttributes,
  ImgHTMLAttributes,
  useEffect,
  useMemo,
  useState,
} from "react";

/**
 * Loading을 추적할 수 있는 Image 컴포넌트 사용
 */
export const useImageLoader = (imageURL: string) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imgBlob, setImgBlob] = useState(imageURL);
  const [imgRequest, setImgRequest] = useState<XMLHttpRequest>(
    new XMLHttpRequest()
  );

  /** 최초 호출 시 필요 리스너 등록 및 요청 생성 */
  useEffect(() => {
    imgRequest.open("GET", imageURL, true);
    imgRequest.responseType = "arraybuffer";

    imgRequest.onload = (e) => {
      setIsLoaded(true);
      setProgress(100);
      setImgBlob(window.URL.createObjectURL(new Blob([imgRequest.response])));
    };
    imgRequest.onprogress = (e) => {
      if (e.lengthComputable) setProgress((e.loaded / e.total) * 100);
    };

    imgRequest.send(null);
  }, [imageURL, imgRequest]);

  const ImageComponent = useMemo(() => {
    if (!isLoaded)
      return (
        props: JSX.IntrinsicAttributes &
          ClassAttributes<HTMLDivElement> &
          HTMLAttributes<HTMLDivElement>
      ) => <div {...props}></div>;

    return (
      props: JSX.IntrinsicAttributes &
        ClassAttributes<HTMLImageElement> &
        ImgHTMLAttributes<HTMLImageElement>
    ) => <img {...props} src={imgBlob} alt={props.alt} />;
  }, [imgBlob, isLoaded]);

  return {
    /** 이미지 컴포넌트 */
    ImageComponent,
    /** 이미지 로딩 진행률 */
    progress,
    /** 로딩 완료 여부 */
    isLoaded,
  };
};
