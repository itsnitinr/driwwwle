const PostDetailsItem = ({ Icon, detail }) => {
  return (
    <div className="flex flex-wrap items-center border-b py-1">
      <div className="w-5 mr-2">
        <Icon className="h-5 w-5 text-pink-600" />
      </div>
      <p className="flex-1">{detail}</p>
    </div>
  );
};

export default PostDetailsItem;
