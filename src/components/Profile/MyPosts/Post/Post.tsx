import React from 'react'
import s from './Post.module.css'

type PropsType = {
  message: string
  likesCount: number
}

const Post: React.FC<PropsType> = (props) => {
  return (
    <div className={s.item}>
      <img src='https://vokrug-tv.ru/pic/product/1/9/6/b/196b75624f01724678dad79fab82b6fa.jpeg' />
      {props.message}
      <div>
        <span>like</span> {props.likesCount}
      </div>
    </div>
  )
}

export default Post
