import { Request, Response } from "express";
import boastService from "../services/boastService";

const BoastController = {
  // 자랑하기 게시글 불러오기
  async loadBoast(req: Request, res: Response) {
    try {
      const diaries = await boastService.loadBoast();
      res.status(200).json(diaries);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res
          .status(500)
          .json({ error: "자랑하기 게시글을 불러오는데 실패했습니다." });
      }
    }
  },

  // 태그 이름으로 게시글 불러오기
  async searchByTag(req: Request, res: Response) {
    try {
      const { tag } = req.query;
      const decodedTag = decodeURIComponent(tag as string); // URL 디코딩

      const diaries = await boastService.searchByTag(decodedTag);
      res.status(200).json(diaries);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res
          .status(500)
          .json({ error: "자랑하기 게시글을 불러오는데 실패했습니다." });
      }
    }
  },
};

export default BoastController;
