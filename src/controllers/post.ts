import { Request, Response } from 'express';
import { getConnection, getManager, getRepository } from 'typeorm';
import { Post } from '../entity/Post';

const getPostList = async (req: Request, res: Response) => {
  const isSecret = [false]
  const page = req.query.page;
  const pageOffset = (Number(page) - 1) * 15;
  // 관리자 권한이면 isSecret = [true, false]

  if (!page) {
    const result = await getRepository(Post).createQueryBuilder('post')
    .select(['post.id AS id', 'post.title AS title'])
    .addSelect('SUBSTR(post.codeContent, 1, 200)', 'codeContent')
    .addSelect('user.name', 'userName')
    .leftJoin('post.user','user')
    .where('post.secret In (:...isSecret)', { isSecret })
    .getRawMany();
    
    res.send({ postList: result });

  } else {
    const result = await getRepository(Post).createQueryBuilder('post')
    .select(['post.id AS id', 'post.title AS title'])
    .addSelect('SUBSTR(post.codeContent, 1, 200)', 'codeContent')
    .addSelect('user.name', 'userName')
    .leftJoin('post.user','user')
    .where('post.secret In (:...isSecret)', { isSecret })
    .offset(pageOffset)
    .limit(15)
    .getRawMany();

    res.status(200).send({ postList: result });
  }

}

const getUserPostList = async (req: Request, res: Response) => {
  const id = req.body.authUserId;
  const search = req.query.search;

  const result = await Post.createQueryBuilder()
  .where('userId = :id', { id })
  .getMany();

  res.status(200).send({ postList: result, message: 'getUserPostList'});
}

const getPost = async (req: Request, res: Response) => {

  const result = await Post.createQueryBuilder('post')
  .select(['post', 'user.name', 'postTag.tagId', 'tag.name', 'tag.category'])
  .leftJoin('post.user', 'user')
  .leftJoin('post.postTags', 'postTag')
  .leftJoin('postTag.tag', 'tag')
  .where('post.id = :id', { id: req.params.id })
  .getOne();

  result['userName'] = result.user.name;
  delete result.user;

  res.status(200).send({ post: result });
}

const addPost = async (req: Request, res: Response) => {
  const { title, codeContent, textContent, secret } = req.body

  const newPost = Post.create({  
    title,
    codeContent,
    textContent,
    secret,
    userId: req.body.authUserId
  })
  const result = await Post.save(newPost);

  res.send({ message: 'ok'});
}

const editPost = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, codeContent, textContent, secret } = req.body;

  await Post.update({ id }, { title, codeContent, textContent, secret });
  res.send('editPost');
}

const deletePost = (req: Request, res: Response) => {
  res.send('deletePost');
}

const deletePostList = (req: Request, res: Response) => {
  res.send('')
}

export {
  getPostList,
  getUserPostList,
  getPost,
  addPost,
  editPost,
  deletePost
}