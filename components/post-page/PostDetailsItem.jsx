import LikesModal from '../../components/LikeModal';

const PostDetailsItem = ({ Icon, detail, isLikes, open, setOpen, postId }) => {
  return (
    <div
      className={`flex flex-wrap items-center border-b py-1 ${
        isLikes && 'cursor-pointer hover:text-pink-600 transition'
      }`}
      onClick={() => {
        if (isLikes) setOpen(true);
      }}
    >
      <div className="w-5 mr-2">
        <Icon className="h-5 w-5 text-pink-600" />
      </div>
      <p className="flex-1">{detail}</p>
      {isLikes && <LikesModal open={open} setOpen={setOpen} postId={postId} />}
    </div>
  );
};

export default PostDetailsItem;
