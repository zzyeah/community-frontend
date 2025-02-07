import styles from "@/styles/ZyComment.module.scss";

export interface ZyCommentProps {
  actions?: Array<JSX.Element>; //	在评论内容下面呈现的操作项列表
  author?: JSX.Element; // 	要显示为注释作者的元素
  avatar?: JSX.Element; // 要显示为评论头像的元素 - 通常是 antd Avatar 或者 src
  children?: JSX.Element; // 嵌套注释应作为注释的子项提供
  content?: JSX.Element | string; // 评论的主要内容
  datetime?: JSX.Element; // 展示时间描述
}
function ZyComment(props: ZyCommentProps) {
  const { actions, author, avatar, children, content, datetime } = props;

  function Avatar() {
    if (avatar) return avatar;
    return null;
  }

  function Content() {
    if (content) return content;
    return null;
  }

  function Actions() {
    if (actions) return actions;
    return null;
  }

  function Datetime() {
    if (datetime) return datetime;
    return null;
  }

  function Author() {
    if (author) return author;
    return null;
  }

  return (
    <div className={styles.container}>
      {/* Avatar */}
      <div className={styles.left}>
        <div className={styles.avatar}>
          <Avatar />
        </div>
      </div>
      {/* Content */}
      <div className={styles.right}>
        {/* Comment Data */}
        <div
          className={(styles.info, author || datetime ? styles.action : null)}
        >
          <div className={styles.author}>
            <Author />
          </div>
          <div className={styles.datetime}>
            <Datetime />
          </div>
        </div>
        <div className={(styles.content, content ? styles.action : null)}>
          <Content />
        </div>
        <div className={(styles.actions, actions ? styles.action : null)}>
          <Actions />
        </div>
        {children}
      </div>
    </div>
  );
}

export default ZyComment;
