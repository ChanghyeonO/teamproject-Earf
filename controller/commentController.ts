import { Types } from "mongoose";
import { Request, Response } from "express";
import CommentService from "../services/commentService";
import { IUser } from "../models";

const CommentController = {
  // 새로운 댓글 생성
  async createComment(req: Request, res: Response) {
    try {
      const { id, name, profileImage, checkedBadge } = req.user as IUser;
      const { postId } = req.params;
      const { comment } = req.body;

      if (!Types.ObjectId.isValid(postId)) {
        res.status(400).json({ error: "유효하지 않은 게시글 ID입니다." });
        return;
      }

      const _postId = new Types.ObjectId(postId);
      const newComment = await CommentService.createComment(
        _postId,
        id,
        name,
        profileImage,
        checkedBadge,
        comment,
      );
      res.status(201).json(newComment);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "알 수 없는 오류가 발생했습니다." });
      }
    }
  },

  // 댓글 수정
  async updateComment(req: Request, res: Response) {
    try {
      const { id: userId } = req.user as IUser;
      const { id } = req.params;
      if (!Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: "유효하지 않은 ID입니다." });
        return;
      }
      const _id = new Types.ObjectId(id);
      const { comment } = req.body;
      const updatedComment = await CommentService.updateComment(
        _id,
        comment,
        userId,
      );
      res.json(updatedComment);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "알 수 없는 오류가 발생했습니다." });
      }
    }
  },

  // 댓글 삭제
  async deleteComment(req: Request, res: Response) {
    try {
      const { id: userId } = req.user as IUser;
      const { id } = req.params;
      if (!Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: "유효하지 않은 ID입니다." });
        return;
      }
      const _id = new Types.ObjectId(id);
      const deletedComment = await CommentService.deleteComment(_id, userId);
      res.json(deletedComment);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "알 수 없는 오류가 발생했습니다." });
      }
    }
  },

  // 특정 댓글 조회
  async readComment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: "유효하지 않은 ID입니다." });
        return;
      }
      const _id = new Types.ObjectId(id);
      const comment = await CommentService.readComment(_id);
      res.json(comment);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "알 수 없는 오류가 발생했습니다." });
      }
    }
  },

  // 특정 게시글의 모든 댓글 조회
  async readAllCommentsOfPost(req: Request, res: Response) {
    try {
      const { postId } = req.params;
      if (!Types.ObjectId.isValid(postId)) {
        res.status(400).json({ error: "유효하지 않은 게시글 ID입니다." });
        return;
      }
      const _postId = new Types.ObjectId(postId);
      const comments = await CommentService.readAllCommentsOfPost(_postId);
      res.json(comments);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "알 수 없는 오류가 발생했습니다." });
      }
    }
  },
  // 댓글 좋아요 누르기 / 취소하기
  async toggleLike(req: Request, res: Response) {
    try {
      const { postId, commentId } = req.params;
      const { _id, name } = req.user as IUser;
      const comment = await CommentService.toggleLike(
        postId,
        commentId,
        _id,
        name,
      );
      res.json(comment);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "알 수 없는 오류가 발생했습니다." });
      }
    }
  },
};

export default CommentController;
