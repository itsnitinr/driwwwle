const PostDetailsLink = ({ Icon, detail }) => {
  return (
    <div className="flex flex-wrap items-center border-b py-1">
      <div className="w-5 mr-2">
        <Icon className="h-5 w-5 text-pink-600" />
      </div>
      <a
        href={detail + '?ref=driwwwle'}
        target="_blank"
        rel="noopener"
        className="hover:text-pink-600 flex-1 transition break-all"
      >
        {detail}
      </a>
    </div>
  );
};

export default PostDetailsLink;
