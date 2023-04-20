type SectionProps = {
  /** 현재 섹션의 로딩 진행률을 부모에게 전달하는 함수 */
  updateLoadingProgress: (progress: number, sectionIndex: number) => void;
};

export default SectionProps;
