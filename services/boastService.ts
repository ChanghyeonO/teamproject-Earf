import { Diary } from "../models/schemas/diary";

const boastService = {
  // shareStatus가 true인 다이어리 찾기
  async loadBoast() {
    try {
      const diaries = await Diary.find({ shareStatus: true }).sort({
        createdAt: -1,
      });
      return diaries;
    } catch (error) {
      console.error(error);
      throw new Error("자랑하기 게시글을 불러오는데 실패했습니다.");
    }
  },

  //tag 검색 기능, tag.length가 1 이하인 게시글만 검색
  async searchByTag(tag: string) {
    try {
      const diaries = await Diary.find({
        shareStatus: true,
        tag: { $in: [tag] },
      }).sort({ createdAt: -1 });

      return diaries;
    } catch (error) {
      console.error(error);
      throw new Error("태그 검색에 실패했습니다.");
    }
  },
};

export default boastService;
